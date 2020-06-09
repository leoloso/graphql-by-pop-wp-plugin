<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Admin\MenuPages;

use GraphQLAPI\GraphQLAPI\Settings\Options;
use GraphQLAPI\GraphQLAPI\Facades\ModuleRegistryFacade;
use GraphQLAPI\GraphQLAPI\Admin\MenuPages\AbstractMenuPage;
use GraphQLAPI\GraphQLAPI\Facades\UserSettingsManagerFacade;
use GraphQLAPI\GraphQLAPI\General\RequestParams;
use GraphQLAPI\GraphQLAPI\ModuleSettings\Properties;

/**
 * Settings menu page
 */
class SettingsMenuPage extends AbstractMenuPage
{
    use GraphQLAPIMenuPageTrait;

    public const SETTINGS_FIELD = 'graphql-api-settings';

    public function getMenuPageSlug(): string
    {
        return 'settings';
    }

    /**
     * Initialize the class instance
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        /**
         * Before saving the settings in the DB,
         * transform the values:
         *
         * - from string to bool/int
         * - default value if input is empty
         */
        $option = self::SETTINGS_FIELD;
        \add_filter(
            "pre_update_option_{$option}",
            [$this, 'normalizeSettings']
        );

        /**
         * After saving the settings in the DB,
         * Flush the rewrite rules, so different URL slugs take effect
         */
        \add_action(
            "update_option_{$option}",
            'flush_rewrite_rules'
        );

        /**
         * Register the settings
         */
        \add_action(
            'admin_init',
            function () {
                $items = $this->getAllItems();
                foreach ($items as $item) {
                    $settingsFieldForModule = $this->getSettingsFieldForModule($item['id']);
                    $module = $item['module'];
                    \add_settings_section(
                        $settingsFieldForModule,
                        // The empty string ensures the render function won't output a h2.
                        '',
                        null,
                        self::SETTINGS_FIELD
                    );
                    foreach ($item['settings'] as $itemSetting) {
                        \add_settings_field(
                            $itemSetting[Properties::NAME],
                            $itemSetting[Properties::TITLE],
                            function () use ($module, $itemSetting) {
                                $type = $itemSetting[Properties::TYPE];
                                $possibleValues = $itemSetting[Properties::POSSIBLE_VALUES];
                                if (!empty($possibleValues)) {
                                    $this->printSelectField($module, $itemSetting);
                                } elseif ($type == Properties::TYPE_BOOL) {
                                    $this->printCheckboxField($module, $itemSetting);
                                } else {
                                    $this->printInputField($module, $itemSetting);
                                }
                            },
                            self::SETTINGS_FIELD,
                            $settingsFieldForModule,
                            [
                                'label' => $itemSetting[Properties::DESCRIPTION],
                                'id' => $itemSetting[Properties::NAME],
                            ]
                        );
                    }
                }

                /**
                 * Finally register all the settings
                 */
                \register_setting(
                    self::SETTINGS_FIELD,
                    Options::SETTINGS
                );
            }
        );
    }

    /**
     * Normalize the form values:
     *
     * - If the input is empty, replace with the default
     * - Convert from string to int/bool
     *
     * @param array $value
     * @return array
     */
    public function normalizeSettings(array $value): array
    {
        $moduleRegistry = ModuleRegistryFacade::getInstance();
        $items = $this->getAllItems();
        foreach ($items as $item) {
            $module = $item['module'];
            $moduleResolver = $moduleRegistry->getModuleResolver($module);
            foreach ($item['settings'] as $itemSetting) {
                $type = $itemSetting[Properties::TYPE];
                $name = $itemSetting[Properties::NAME];
                /**
                 * If the input is empty, replace with the default
                 * It can't be empty, because that could be equivalent to disabling the module,
                 * which is done from the Modules page, not from Settings
                 * Ignore for bool since empty means `false` (tackled below)
                 */
                if (empty($value[$name]) && $type != Properties::TYPE_BOOL) {
                    $option = $itemSetting[Properties::INPUT];
                    $value[$name] = $moduleResolver->getSettingsDefaultValue($module, $option);
                } elseif ($type == Properties::TYPE_BOOL) {
                    $value[$name] = !empty($value[$name]);
                } elseif ($type == Properties::TYPE_INT) {
                    $value[$name] = (int) $value[$name];
                }
            }
        }
        return $value;
    }

    /**
     * Return all the modules with settings
     *
     * @return array
     */
    protected function getAllItems(): array
    {
        $items = [];
        $moduleRegistry = ModuleRegistryFacade::getInstance();
        $modules = $moduleRegistry->getAllModules(true, true, false);
        foreach ($modules as $module) {
            $moduleResolver = $moduleRegistry->getModuleResolver($module);
            $items[] = [
                'module' => $module,
                'id' => $moduleResolver->getID($module),
                'name' => $moduleResolver->getName($module),
                'settings' => $moduleResolver->getSettings($module),
            ];
        }
        return $items;
    }

    protected function getSettingsFieldForModule(string $moduleID): string
    {
        return self::SETTINGS_FIELD . '-' . $moduleID;
    }

    /**
     * If `true`, print the sections using tabs
     * If `false`, print the sections one below the other
     *
     * @return boolean
     */
    protected function printWithTabs(): bool
    {
        return true;
    }

    /**
     * Print the settings form
     *
     * @return void
     */
    public function print(): void
    {
        $items = $this->getAllItems();
        if (!$items) {
            _e('There are no items to be configured', 'graphql-api');
            return;
        }

        $printWithTabs = $this->printWithTabs();
        // By default, focus on the first module
        $activeModuleID = $items[0]['id'];
        // If passing a tab, focus on that one, if the module exists
        if ($tab = $_GET[RequestParams::TAB]) {
            $moduleIDs = array_map(
                function ($item) {
                    return $item['id'];
                },
                $items
            );
            if (in_array($tab, $moduleIDs)) {
                $activeModuleID = $tab;
            }
        }
        $class = 'wrap';
        if ($printWithTabs) {
            $class .= ' graphql-api-tabpanel';
        }
        ?>
        <div
            id="graphql-api-settings"
            class="<?php echo $class ?>"
        >
            <h1><?php \_e('GraphQL API — Settings', 'graphql-api'); ?></h1>
            <?php \settings_errors(); ?>

            <?php if ($printWithTabs) : ?>
                <!-- Tabs -->
                <h2 class="nav-tab-wrapper">
                    <?php
                    foreach ($items as $item) {
                        printf(
                            '<a href="#%s" class="nav-tab %s">%s</a>',
                            $item['id'],
                            $item['id'] == $activeModuleID ? 'nav-tab-active' : '',
                            $item['name']
                        );
                    }
                    ?>
                </h2>
            <?php endif; ?>

            <form method="post" action="options.php">
                <!-- Panels -->
                <?php
                $sectionClass = $printWithTabs ? 'tab-content' : '';
                \settings_fields(self::SETTINGS_FIELD);
                foreach ($items as $item) {
                    $sectionStyle = '';
                    $maybeTitle = $printWithTabs ? '' : sprintf(
                        '<hr/><h3>%s</h3>',
                        $item['name']
                    );
                    if ($printWithTabs) {
                        $sectionStyle = sprintf(
                            'display: %s;',
                            $item['id'] == $activeModuleID ? 'block' : 'none'
                        );
                    }
                    ?>
                    <div id="<?php echo $item['id'] ?>" class="<?php echo $sectionClass ?>" style="<?php echo $sectionStyle ?>">
                        <?php echo $maybeTitle ?>
                        <table class="form-table">
                            <?php \do_settings_fields(self::SETTINGS_FIELD, $this->getSettingsFieldForModule($item['id'])) ?>
                        </table>
                    </div>
                    <?php
                }
                \submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Enqueue the required assets and initialize the localized scripts
     *
     * @return void
     */
    protected function enqueueAssets(): void
    {
        parent::enqueueAssets();

        if ($this->printWithTabs()) {
            \wp_enqueue_style(
                'graphql-api-settings-tabpanel',
                \GRAPHQL_API_URL . 'assets/css/tabpanel.css',
                array(),
                \GRAPHQL_BY_POP_VERSION
            );

            \wp_enqueue_script(
                'graphql-api-settings-tabpanel',
                \GRAPHQL_API_URL . 'assets/js/tabpanel.js',
                array('jquery'),
                \GRAPHQL_BY_POP_VERSION
            );
        }
    }

    /**
     * Get the option value
     *
     * @param string $name
     * @return boolean
     */
    protected function getOptionValue(string $module, string $option)
    {
        $userSettingsManager = UserSettingsManagerFacade::getInstance();
        return $userSettingsManager->getSetting($module, $option);
    }

    /**
     * Display a checkbox field.
     *
     * @param array $itemSetting
     * @return void
     */
    protected function printCheckboxField(string $module, array $itemSetting): void
    {
        $name = $itemSetting[Properties::NAME];
        $input = $itemSetting[Properties::INPUT];
        $value = $this->getOptionValue($module, $input);
        ?>
            <label for="<?php echo $name; ?>">
                <input type="checkbox" name="<?php echo self::SETTINGS_FIELD . '[' . $name . ']'; ?>" id="<?php echo $name; ?>" value="1" <?php checked(1, $value); ?> />
                <?php echo $itemSetting[Properties::DESCRIPTION]; ?>
            </label>
        <?php
    }

    /**
     * Display an input field.
     *
     * @param array $itemSetting
     * @return void
     */
    protected function printInputField(string $module, array $itemSetting): void
    {
        $name = $itemSetting[Properties::NAME];
        $input = $itemSetting[Properties::INPUT];
        $value = $this->getOptionValue($module, $input);
        $label = $itemSetting[Properties::DESCRIPTION] ? '<br/>' . $itemSetting[Properties::DESCRIPTION] : '';
        ?>
            <label for="<?php echo $name; ?>">
                <input type="text" name="<?php echo self::SETTINGS_FIELD . '[' . $name . ']'; ?>" id="<?php echo $name; ?>" value="<?php echo $value; ?>" />
                <?php echo $label; ?>
            </label>
        <?php
    }

    /**
     * Display a select field.
     *
     * @param array $itemSetting
     * @return void
     */
    protected function printSelectField(string $module, array $itemSetting): void
    {
        $name = $itemSetting[Properties::NAME];
        $input = $itemSetting[Properties::INPUT];
        $value = $this->getOptionValue($module, $input);
        $label = $itemSetting[Properties::DESCRIPTION] ? '<br/>' . $itemSetting[Properties::DESCRIPTION] : '';
        // $maybeMultiple = $itemSetting[Properties::IS_MULTIPLE] ? 'multiple' : '';
        $possibleValues = $itemSetting[Properties::POSSIBLE_VALUES];
        ?>
            <label for="<?php echo $name; ?>">
                <select name="<?php echo self::SETTINGS_FIELD . '[' . $name . ']'; ?>" id="<?php echo $name; ?>" <?php /*echo $maybeMultiple;*/ ?>>
                <?php foreach ($possibleValues as $optionValue => $optionLabel) : ?>
                    <?php $maybeSelected = $optionValue == $value ? 'selected="selected"' : ''; ?>
                    <option value="<?php echo $optionValue ?>" <?php echo $maybeSelected ?>>
                        <?php echo $optionLabel ?>
                    </option>
                <?php endforeach ?>
                </select>
                <?php echo $label; ?>
            </label>
        <?php
    }
}
