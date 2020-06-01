<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Admin\MenuPages;

use GraphQLAPI\GraphQLAPI\General\RequestParams;
use GraphQLAPI\GraphQLAPI\Facades\ModuleRegistryFacade;
use GraphQLAPI\GraphQLAPI\Admin\MenuPages\AbstractMenuPage;
use PoP\ComponentModel\Facades\Instances\InstanceManagerFacade;

/**
 * Module Documentation menu page
 */
class ModuleDocumentationMenuPage extends AbstractMenuPage
{
    use GraphQLAPIMenuPageTrait;

    public function getMenuPageSlug(): string
    {
        $instanceManager = InstanceManagerFacade::getInstance();
        $modulesMenuPage = $instanceManager->getInstance(ModulesMenuPage::class);
        return $modulesMenuPage->getMenuPageSlug();
    }

    public function print(): void
    {
        // This is crazy: passing ?module=Foo\Bar\module,
        // and then doing $_GET['module'], returns "Foo\\Bar\\module"
        // So parse the URL to extract the "module" param
        $vars = [];
        parse_str($_SERVER['REQUEST_URI'], $vars);
        $module = urldecode($vars[RequestParams::MODULE]);
        $moduleRegistry = ModuleRegistryFacade::getInstance();
        $moduleResolver = $moduleRegistry->getModuleResolver($module);
        if (is_null($moduleResolver)) {
            _e(sprintf(
                \__('Ops, module \'%s\' does not exist', 'graphql-api'),
                $module
            ));
            return;
        }
        if (!$moduleResolver->hasDocumentation($module)) {
            _e(sprintf(
                \__('Ops, module \'%s\' has no documentation', 'graphql-api'),
                $moduleResolver->getName($module)
            ));
            return;
        }
        $title = $moduleResolver->getName($module);
        $documentation = $moduleResolver->getDocumentation($module);
        /**
         * 1. Hide the menus
         * 2. Make images fit within the iframe
         */
        ?>
        <style>
            #adminmenumain,
            #wpadminbar {
                display: none;
            }
            html.wp-toolbar {
                padding-top: 0;
            }
            #graphql-api-module-docs img {
                max-width: 100%;
                width: auto;
                height: auto;
            }
        </style>
        <div
            id="graphql-api-module-docs"
            class="wrap"
        >
            <h1><?php echo $title ?></h1>
            <?php echo $documentation ?>
        </div>
        <?php
    }
}
