<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\SchemaConfigurators;

use GraphQLAPI\GraphQLAPI\Services\Blocks\SchemaConfigCacheControlListBlock;
use GraphQLAPI\GraphQLAPI\Services\Helpers\BlockHelpers;
use GraphQLAPI\GraphQLAPI\ModuleResolvers\PerformanceFunctionalityModuleResolver;
use GraphQLAPI\GraphQLAPI\Registries\ModuleRegistryInterface;
use GraphQLAPI\GraphQLAPI\Services\SchemaConfigurators\AbstractQueryExecutionSchemaConfigurator;
use GraphQLAPI\GraphQLAPI\Services\SchemaConfigurators\AccessControlGraphQLQueryConfigurator;
use GraphQLAPI\GraphQLAPI\Services\SchemaConfigurators\CacheControlGraphQLQueryConfigurator;
use GraphQLAPI\GraphQLAPI\Services\SchemaConfigurators\FieldDeprecationGraphQLQueryConfigurator;
use PoP\ComponentModel\Facades\Instances\InstanceManagerFacade;

class PersistedQuerySchemaConfigurator extends AbstractQueryExecutionSchemaConfigurator
{
    protected CacheControlGraphQLQueryConfigurator $cacheControlGraphQLQueryConfigurator;

    function __construct(
        ModuleRegistryInterface $moduleRegistry,
        AccessControlGraphQLQueryConfigurator $accessControlGraphQLQueryConfigurator,
        FieldDeprecationGraphQLQueryConfigurator $fieldDeprecationGraphQLQueryConfigurator,
        CacheControlGraphQLQueryConfigurator $cacheControlGraphQLQueryConfigurator
    ) {
        parent::__construct($moduleRegistry, $accessControlGraphQLQueryConfigurator, $fieldDeprecationGraphQLQueryConfigurator);
        $this->cacheControlGraphQLQueryConfigurator = $cacheControlGraphQLQueryConfigurator;
    }

    /**
     * Apply all the settings defined in the Schema Configuration:
     * - Access Control Lists
     * - Cache Control Lists
     * - Field Deprecation Lists
     *
     * @param integer $schemaConfigurationID
     * @return void
     */
    protected function executeSchemaConfigurationItems(int $schemaConfigurationID): void
    {
        parent::executeSchemaConfigurationItems($schemaConfigurationID);

        // Also execute the Cache Control
        $this->executeSchemaConfigurationCacheControlLists($schemaConfigurationID);
    }

    /**
     * Apply all the settings defined in the Schema Configuration for:
     * - Cache Control Lists
     *
     * @param integer $schemaConfigurationID
     * @return void
     */
    protected function executeSchemaConfigurationCacheControlLists(int $schemaConfigurationID): void
    {
        // Do not execute Cache Control when previewing the query
        if (\is_preview()) {
            return;
        }
        // Check it is enabled by module
        if (!$this->moduleRegistry->isModuleEnabled(PerformanceFunctionalityModuleResolver::CACHE_CONTROL)) {
            return;
        }
        $instanceManager = InstanceManagerFacade::getInstance();
        /** @var BlockHelpers */
        $blockHelpers = $instanceManager->getInstance(BlockHelpers::class);
        /**
         * @var SchemaConfigCacheControlListBlock
         */
        $block = $instanceManager->getInstance(SchemaConfigCacheControlListBlock::class);
        $schemaConfigCCLBlockDataItem = $blockHelpers->getSingleBlockOfTypeFromCustomPost(
            $schemaConfigurationID,
            $block
        );
        if (!is_null($schemaConfigCCLBlockDataItem)) {
            if ($cacheControlLists = $schemaConfigCCLBlockDataItem['attrs'][SchemaConfigCacheControlListBlock::ATTRIBUTE_NAME_CACHE_CONTROL_LISTS] ?? null) {
                foreach ($cacheControlLists as $cacheControlListID) {
                    $this->cacheControlGraphQLQueryConfigurator->executeSchemaConfiguration($cacheControlListID);
                }
            }
        }
    }
}