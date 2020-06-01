<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\SchemaConfigurators;

use PoP\ComponentModel\Misc\GeneralUtils;
use GraphQLAPI\GraphQLAPI\General\BlockHelpers;
use GraphQLAPI\GraphQLAPI\Blocks\AccessControlBlock;
use GraphQLAPI\GraphQLAPI\Blocks\AbstractControlBlock;
use GraphQLAPI\GraphQLAPI\Facades\ModuleRegistryFacade;
use GraphQLAPI\GraphQLAPI\ModuleResolvers\ModuleResolver;
use PoP\AccessControl\Facades\AccessControlManagerFacade;
use PoP\ComponentModel\Facades\Instances\InstanceManagerFacade;
use GraphQLAPI\GraphQLAPI\Blocks\AccessControlRuleBlocks\AbstractAccessControlRuleBlock;

class AccessControlGraphQLQueryConfigurator extends AbstractIndividualControlGraphQLQueryConfigurator
{
    public const HOOK_ACL_RULE_BLOCK_CLASS_MODULES = __CLASS__ . ':acl-url-block-class:modules';

    protected $aclRuleBlockNameModules;

    // protected function doInit(): void
    // {
    //     $this->setAccessControlList();
    // }

    /**
     * Obtain the modules enabling/disabling each ACL rule block, through a hook
     *
     * @return array
     */
    protected function getACLRuleBlockNameClasses(): array
    {
        // Pairings of blockClass => module
        return \apply_filters(
            self::HOOK_ACL_RULE_BLOCK_CLASS_MODULES,
            []
        );
    }

    /**
     * Obtain the modules enabling/disabling each ACL rule block, through a hook
     *
     * @return array
     */
    protected function getACLRuleBlockNameModules(): array
    {
        // Lazy load
        if (is_null($this->aclRuleBlockNameModules)) {
            // Obtain the block names from the block classes
            $instanceManager = InstanceManagerFacade::getInstance();
            $aclRuleBlockClassModules = $this->getACLRuleBlockNameClasses();
            $this->aclRuleBlockNameModules = [];
            foreach ($aclRuleBlockClassModules as $blockClass => $module) {
                $block = $instanceManager->getInstance($blockClass);
                $this->aclRuleBlockNameModules[$block->getBlockFullName()] = $module;
            }
        }
        return $this->aclRuleBlockNameModules;
    }

    /**
     * Obtain the module enabling/disabling a certain ACL rule block
     *
     * @return array
     */
    protected function getACLRuleBlockModule(string $blockName): ?string
    {
        $aclRuleBlockNameModules = $this->getACLRuleBlockNameModules();
        return $aclRuleBlockNameModules[$blockName];
    }

    /**
     * Extract the access control items defined in the CPT,
     * and inject them into the service as to take effect in the current GraphQL query
     *
     * @return void
     */
    public function executeSchemaConfiguration(int $aclPostID): void
    {
        // Only if the module is not disabled
        $moduleRegistry = ModuleRegistryFacade::getInstance();
        if (!$moduleRegistry->isModuleEnabled(ModuleResolver::ACCESS_CONTROL)) {
            return;
        }

        $instanceManager = InstanceManagerFacade::getInstance();
        $aclBlockItems = BlockHelpers::getBlocksOfTypeFromCustomPost(
            $aclPostID,
            $instanceManager->getInstance(AccessControlBlock::class)
        );
        $accessControlManager = AccessControlManagerFacade::getInstance();
        // The "Access Control" type contains the fields/directives
        foreach ($aclBlockItems as $aclBlockItem) {
            // The rule to apply is contained inside the nested blocks
            if ($aclBlockItemNestedBlocks = $aclBlockItem['innerBlocks']) {
                // Filter out the rules not enabled by module
                if (
                    $aclBlockItemNestedBlocks = array_filter(
                        $aclBlockItemNestedBlocks,
                        function ($block) use ($moduleRegistry) {
                            // If it has a corresponding module, check if it is enabled
                            if ($module = $this->getACLRuleBlockModule($block['blockName'])) {
                                return $moduleRegistry->isModuleEnabled($module);
                            }
                            // Otherwise it's always enabled
                            return true;
                        }
                    )
                ) {
                    $aclBlockItemTypeFields = $aclBlockItem['attrs'][AbstractControlBlock::ATTRIBUTE_NAME_TYPE_FIELDS] ?? [];
                    $aclBlockItemDirectives = $aclBlockItem['attrs'][AbstractControlBlock::ATTRIBUTE_NAME_DIRECTIVES] ?? [];

                    // The value can be NULL, then it's the default mode
                    // In that case do nothing, since the default mode is already injected into GraphQL by PoP
                    $schemaMode = $aclBlockItem['attrs'][AccessControlBlock::ATTRIBUTE_NAME_SCHEMA_MODE];

                    // Iterate all the nested blocks
                    foreach ($aclBlockItemNestedBlocks as $aclBlockItemNestedBlock) {
                        if ($accessControlGroup = $aclBlockItemNestedBlock['attrs'][AbstractAccessControlRuleBlock::ATTRIBUTE_NAME_ACCESS_CONTROL_GROUP]) {
                            // The value can be NULL, it depends on the actual nestedBlock
                            // (eg: Disable access doesn't have any, while Disable by role has the list of roles)
                            $value = $aclBlockItemNestedBlock['attrs'][AbstractAccessControlRuleBlock::ATTRIBUTE_NAME_VALUE];

                            // Extract the saved fields
                            if (
                                $entriesForFields = array_filter(
                                    array_map(
                                        function ($selectedField) use ($value, $schemaMode) {
                                            return $this->getIndividualControlEntryFromField(
                                                $selectedField,
                                                $value,
                                                $schemaMode
                                            );
                                        },
                                        $aclBlockItemTypeFields
                                    )
                                )
                            ) {
                                $accessControlManager->addEntriesForFields(
                                    $accessControlGroup,
                                    $entriesForFields
                                );
                            }

                            // Extract the saved directives
                            if (
                                $entriesForDirectives = GeneralUtils::arrayFlatten(array_filter(
                                    array_map(
                                        function ($selectedDirective) use ($value, $schemaMode) {
                                            return $this->getIndividualControlEntriesFromDirective(
                                                $selectedDirective,
                                                $value,
                                                $schemaMode
                                            );
                                        },
                                        $aclBlockItemDirectives
                                    )
                                ))
                            ) {
                                $accessControlManager->addEntriesForDirectives(
                                    $accessControlGroup,
                                    $entriesForDirectives
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}
