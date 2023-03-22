<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\SchemaConfigurationExecuters;

class SchemaCustomPostCategoryMutationsSchemaConfigurationExecuter extends AbstractSchemaMutationsSchemaConfigurationExecuter
{
    public function getHookModuleClass(): string
    {
        return \PoPCMSSchema\CustomPostCategoryMutations\Module::class;
    }

    public function getHookEnvironmentClass(): string
    {
        return \PoPCMSSchema\CustomPostCategoryMutations\Environment::USE_PAYLOADABLE_CUSTOMPOSTCATEGORY_MUTATIONS;
    }
}
