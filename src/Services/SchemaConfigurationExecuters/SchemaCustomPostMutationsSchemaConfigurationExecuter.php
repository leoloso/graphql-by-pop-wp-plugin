<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\SchemaConfigurationExecuters;

class SchemaCustomPostMutationsSchemaConfigurationExecuter extends AbstractSchemaMutationsSchemaConfigurationExecuter
{
    public function getHookModuleClass(): string
    {
        return \PoPCMSSchema\CustomPostMutations\Module::class;
    }

    public function getHookEnvironmentClass(): string
    {
        return \PoPCMSSchema\CustomPostMutations\Environment::USE_PAYLOADABLE_CUSTOMPOST_MUTATIONS;
    }
}
