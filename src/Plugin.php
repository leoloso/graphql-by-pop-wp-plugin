<?php
namespace Leoloso\GraphQLByPoPWPPlugin;

use Leoloso\GraphQLByPoPWPPlugin\Admin\Menu;

class Plugin {

    public function init(): void
    {
        if (is_admin()) {
            (new Menu())->init();
            add_action(
                'admin_enqueue_scripts',
                [$this, 'enqueueAssets']
            );
        }
    }

    /**
     * Enqueue the required assets and initialize the localized scripts
     *
     * @return void
     */
    public function enqueueAssets(): void
    {
        $currentScreen = get_current_screen()->id;
		if (strpos($currentScreen, 'graphql_by_pop') !== false) {
			wp_enqueue_style(
                'graphql-by-pop-graphiql',
                GRAPHQL_BY_POP_PLUGIN_URL.'assets/css/graphiql.min.css',
                array(),
                false,
                false
            );
			wp_enqueue_style(
                'graphql-by-pop-graphiql-client',
                GRAPHQL_BY_POP_PLUGIN_URL.'assets/css/graphiql-client.css',
                array(),
                false,
                false
            );
			wp_enqueue_script(
                'graphql-by-pop-react',
                GRAPHQL_BY_POP_PLUGIN_URL.'assets/js/react.development.js',
                array(),
                false,
                false
            );
			wp_enqueue_script(
                'graphql-by-pop-react-dom',
                GRAPHQL_BY_POP_PLUGIN_URL.'assets/js/react-dom.development.js',
                array('graphql-by-pop-react'),
                false,
                false
            );
			wp_enqueue_script(
                'graphql-by-pop-graphiql',
                GRAPHQL_BY_POP_PLUGIN_URL.'assets/js/graphiql.min.js',
                array('graphql-by-pop-react-dom'),
                false,
                false
            );

			wp_localize_script(
				'graphql-by-pop-graphiql',
				'graphQLByPoPGraphiQLSettings',
				array(
					'nonce' => wp_create_nonce('wp_rest'),
					'endpoint' => trailingslashit(trailingslashit(site_url()) . 'api/graphql'),
				)
			);
		}
    }
}
