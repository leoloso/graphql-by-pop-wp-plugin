<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\BlockCategories;

use GraphQLAPI\GraphQLAPI\Services\CustomPostTypes\GraphQLPersistedQueryEndpointCustomPostType;
use PoP\ComponentModel\Instances\InstanceManagerInterface;

class PersistedQueryEndpointBlockCategory extends AbstractBlockCategory
{
    public const PERSISTED_QUERY_ENDPOINT_BLOCK_CATEGORY = 'graphql-api-persisted-query';

    public function __construct(
        InstanceManagerInterface $instanceManager,
        protected GraphQLPersistedQueryEndpointCustomPostType $graphQLPersistedQueryEndpointCustomPostType,
    ) {
        parent::__construct(
            $instanceManager,
        );
    }

    /**
     * Custom Post Type for which to enable the block category
     *
     * @return string[]
     */
    public function getCustomPostTypes(): array
    {
        return [
            $this->graphQLPersistedQueryEndpointCustomPostType->getCustomPostType(),
        ];
    }

    /**
     * Block category's slug
     */
    protected function getBlockCategorySlug(): string
    {
        return self::PERSISTED_QUERY_ENDPOINT_BLOCK_CATEGORY;
    }

    /**
     * Block category's title
     */
    protected function getBlockCategoryTitle(): string
    {
        return __('GraphQL persisted query endpoint', 'graphql-api');
    }
}
