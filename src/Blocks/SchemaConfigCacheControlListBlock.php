<?php

declare(strict_types=1);

namespace Leoloso\GraphQLByPoPWPPlugin\Blocks;

use Leoloso\GraphQLByPoPWPPlugin\PostTypes\GraphQLCacheControlListPostType;

/**
 * Cache Control block
 */
class SchemaConfigCacheControlListBlock extends AbstractSchemaConfigPostListBlock
{
    protected function getBlockName(): string
    {
        return 'schema-config-cache-control-lists';
    }

    protected function getAttributeName(): string
    {
        return 'cacheControlLists';
    }

    protected function getPostType(): string
    {
        return GraphQLCacheControlListPostType::POST_TYPE;
    }

    protected function getHeader(): string
    {
        return \__('Cache Control Lists:');
    }
}
