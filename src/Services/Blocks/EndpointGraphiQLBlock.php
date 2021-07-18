<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\Blocks;

use GraphQLAPI\GraphQLAPI\Constants\BlockAttributeNames;
use GraphQLAPI\GraphQLAPI\ModuleResolvers\ClientFunctionalityModuleResolver;
use GraphQLAPI\GraphQLAPI\Services\BlockCategories\CustomEndpointBlockCategory;
use GraphQLAPI\GraphQLAPI\Services\Blocks\MainPluginBlockTrait;

class EndpointGraphiQLBlock extends AbstractBlock implements EndpointEditorBlockServiceTagInterface
{
    use MainPluginBlockTrait;
    use OptionsBlockTrait;

    protected function getBlockName(): string
    {
        return 'endpoint-graphiql';
    }

    public function getEnablingModule(): ?string
    {
        return ClientFunctionalityModuleResolver::GRAPHIQL_FOR_CUSTOM_ENDPOINTS;
    }

    public function getBlockPriority(): int
    {
        return 140;
    }

    protected function getBlockCategoryClass(): ?string
    {
        return CustomEndpointBlockCategory::class;
    }

    protected function isDynamicBlock(): bool
    {
        return true;
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function renderBlock(array $attributes, string $content): string
    {
        // Append "-front" because this style must be used only on the client, not on the admin
        $className = $this->getBlockClassName() . '-front';

        $blockContentPlaceholder = '<p><strong>%s</strong></p><p>%s</p>';
        $blockContent = sprintf(
            $blockContentPlaceholder,
            \__('Expose GraphiQL client?', 'graphql-api'),
            $this->getBooleanLabel($attributes[BlockAttributeNames::IS_ENABLED] ?? true)
        );

        $blockContentPlaceholder = <<<EOT
            <div class="%s">
                <h3 class="%s">%s</h3>
                %s
            </div>
        EOT;
        return sprintf(
            $blockContentPlaceholder,
            $className . ' ' . $this->getAlignClass(),
            $className . '__title',
            \__('GraphiQL', 'graphql-api'),
            $blockContent
        );
    }
}
