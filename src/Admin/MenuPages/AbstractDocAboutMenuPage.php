<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Admin\MenuPages;

use InvalidArgumentException;
use GraphQLAPI\GraphQLAPI\General\RequestParams;
use GraphQLAPI\GraphQLAPI\Facades\ContentProcessors\MarkdownContentParserFacade;

/**
 * Open documentation within the About page
 */
abstract class AbstractDocAboutMenuPage extends AbstractDocsMenuPage
{
    protected function openInModalWindow(): bool
    {
        return true;
    }

    /**
     * Enable "/" in the filename
     *
     * @param string[] $specialChars
     * @return string[]
     */
    public function enableSpecialCharsForSanitization(array $specialChars): array
    {
        return array_diff(
            $specialChars,
            [
                '/',
            ]
        );
    }

    protected function getContentToPrint(): string
    {
        // Enable "/" in the filename
        add_filter(
            'sanitize_file_name_chars',
            [$this, 'enableSpecialCharsForSanitization']
        );
        $doc = \sanitize_file_name($_REQUEST[RequestParams::DOC] . '.md');
        remove_filter(
            'sanitize_file_name_chars',
            [$this, 'enableSpecialCharsForSanitization']
        );
        $markdownContentParser = MarkdownContentParserFacade::getInstance();
        try {
            return $markdownContentParser->getContent($doc);
        } catch (InvalidArgumentException $e) {
            return sprintf(
                '<p>%s</p>',
                sprintf(
                    \__('Page \'%s\' does not exist', 'graphql-api'),
                    $doc
                )
            );
        }
    }
}
