import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/visionOS/',
    title: "visionOS",
    description: "visionOS From Scratch",
    markdown: {
        math: true
    },
    lastUpdated: true,
    head: [['link', {rel: 'icon', href: '/visionOS/favicon.ico'}]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.png',
        nav: [
            {text: '首页', link: '/index.md'},
            {
                text: '导航',
                items: [
                    {text: 'Swift', link: '/swift/index.md'},
                    {text: 'SwiftUI', link: '/swiftui/index.md'},
                    {text: 'RealityKit', link: '/realitykit/index.md'},
                    {text: 'ARKit', link: '/arkit/index.md'},
                    {text: 'Accessibility', link: '/accessibility/index.md'},
                ]
            },

        ],
        sidebar: {

            '/swift/': [
                {
                    text: 'Swift',
                    items: [
                        {text: '导航', link: '/swift/index.md'},
                        {text: '基础部分', link: '/swift/basic.md'},
                        {text: '基本运算符', link: '/swift/basic_operators.md'},
                        {text: '字符串和字符', link: '/swift/string.md'},
                        {text: '集合类型', link: '/swift/collection.md'},
                        {text: '控制流', link: '/swift/flow.md'},
                        {text: '函数', link: '/swift/function.md'},
                        {text: '闭包', link: '/swift/closure.md'},
                        {text: '枚举', link: '/swift/enum.md'},
                        {text: '类和结构体', link: '/swift/classandstruct.md'},
                        {text: '属性', link: '/swift/property.md'},
                        {text: '方法', link: '/swift/method.md'},
                        {text: '下标', link: '/swift/subscript.md'},
                        {text: '继承', link: '/swift/extend.md'},
                        {text: '构造过程', link: '/swift/init.md'},
                        {text: '析构过程', link: '/swift/deinit.md'},
                        {text: '可选链', link: '/swift/optional.md'},
                        {text: '错误处理', link: '/swift/error.md'},
                        {text: '并发', link: '/swift/concurrency.md'},
                        {text: '类型转换', link: '/swift/type_casting.md'},
                        {text: '嵌套类型', link: '/swift/nested_type.md'},
                        {text: '扩展', link: '/swift/extension.md'},
                        {text: '协议', link: '/swift/protocol.md'},
                        {text: '泛型', link: '/swift/generic.md'},
                        {text: '不透明类型', link: '/swift/opaque_type.md'},
                        {text: '自动引用计数', link: '/swift/arc.md'},
                        {text: '内存安全', link: '/swift/memory_safety.md'},
                        {text: '访问控制', link: '/swift/access_control.md'},
                        {text: '高级运算符', link: '/swift/advanced_operators.md'},
                    ]
                },
            ],

            '/swiftui/': [
                {
                    text: 'SwiftUI',
                    items: [
                        {text: '导航', link: '/swiftui/index.md'},
                        {
                            text: 'App structure', collapsed: true, items: [
                                {text: 'App organization', link: '/swiftui/app_organization.md'},
                                {text: 'Scenes', link: '/swiftui/scenes.md'},
                                {
                                    text: 'Windows', collapsed: true, items: [

                                        {
                                            text: 'Creating windows', items: [

                                                {text: 'WindowGroup', link: '/swiftui/windows/windowgroup.md'},
                                                {text: 'Window', link: '/swiftui/windows/window.md'},

                                                {text: 'WindowStyle', link: '/swiftui/windows/window_style.md'},
                                            ]
                                        },

                                        {
                                            text: 'Styling the associated toolbar',
                                            link: '/swiftui/windows/styling_the_associated_toolbar.md'
                                        },
                                        {text: 'Opening windows', link: '/swiftui/windows/opening_windows.md'},
                                        {text: 'Closing windows', link: '/swiftui/windows/closing_windows.md'},
                                        {
                                            text: 'Positioning and sizing a window',
                                            link: '/swiftui/windows/pos_sizing_window.md'
                                        },
                                    ]
                                },

                                {
                                    text: 'Immersive spaces', collapsed: true, items: [

                                        {
                                            text: 'Creating an immersive space',
                                            link: '/swiftui/immersive_spaces/creating_an_immersive_space.md'
                                        },
                                        {
                                            text: 'Opening an immersive space',
                                            link: '/swiftui/immersive_spaces/opening_an_immersive_space.md'
                                        },
                                        {
                                            text: 'Closing the immersive space',
                                            link: '/swiftui/immersive_spaces/closing_the_immersive_space.md'
                                        },
                                        {
                                            text: 'Hiding upper limbs during immersion',
                                            link: '/swiftui/immersive_spaces/hiding_upper_limbs_during_immersion.md'
                                        },
                                        {
                                            text: 'Adjusting content brightness',
                                            link: '/swiftui/immersive_spaces/adjusting_content_brightness.md'
                                        },
                                    ]
                                },
                                {text: 'Documents', link: '/swiftui/documents.md'},
                                {
                                    text: 'Navigation', collapsed: true, items: [

                                        {
                                            text: 'Presenting views in columns',
                                            link: '/swiftui/navigation/presenting_views_in_columns.md'
                                        },
                                        {
                                            text: 'Stacking views in one column',
                                            link: '/swiftui/navigation/stacking_views_in_one_column.md'
                                        },
                                        {
                                            text: 'Managing column collapse',
                                            link: '/swiftui/navigation/managing_column_collapse.md'
                                        },
                                        {
                                            text: 'Setting titles for navigation content',
                                            link: '/swiftui/navigation/setting_titles_for_navigation_content.md'
                                        },
                                        {
                                            text: 'Configuring the navigation bar',
                                            link: '/swiftui/navigation/configuring_the_navigation_bar.md'
                                        },
                                        {
                                            text: 'Presenting views in tabs',
                                            link: '/swiftui/navigation/presenting_views_in_tabs.md'
                                        },
                                        {
                                            text: 'Displaying views in multiple panes',
                                            link: '/swiftui/navigation/displaying_views_in_multiple_panes.md'
                                        },
                                    ]
                                },

                                {
                                    text: 'Modal presentations', collapsed: true, items: [

                                        {
                                            text: 'Showing a sheet, cover, or popover',
                                            link: '/swiftui/modal_presentations/showing_a_sheet_cover_or_popover.md'
                                        },
                                        {
                                            text: 'Adapting a presentation to size classes',
                                            link: '/swiftui/modal_presentations/adapting_a_presentation_to_size_classes.md'
                                        },
                                        {
                                            text: 'Configuring a sheet’s height',
                                            link: '/swiftui/modal_presentations/configuring_a_sheets_height.md'
                                        },
                                        {
                                            text: 'Styling a sheet and its background',
                                            link: '/swiftui/modal_presentations/styling_a_sheet_and_its_background.md'
                                        },
                                        {
                                            text: 'Presenting an alert',
                                            link: '/swiftui/modal_presentations/presenting_an_alert.md'
                                        },
                                        {
                                            text: 'Presenting an alert with a message',
                                            link: '/swiftui/modal_presentations/presenting_an_alert_with_a_message.md'
                                        },
                                        {
                                            text: 'Getting confirmation for an action',
                                            link: '/swiftui/modal_presentations/getting_confirmation_for_an_action.md'
                                        },
                                        {
                                            text: 'Showing a confirmation dialog with a message',
                                            link: '/swiftui/modal_presentations/showing_a_confirmation_dialog_with_a_message.md'
                                        },
                                        {
                                            text: 'Configuring a dialog',
                                            link: '/swiftui/modal_presentations/configuring_a_dialog.md'
                                        },
                                        {
                                            text: 'Exporting to file',
                                            link: '/swiftui/modal_presentations/exporting_to_file.md'
                                        },
                                        {
                                            text: 'Importing from file',
                                            link: '/swiftui/modal_presentations/importing_from_file.md'
                                        },
                                        {
                                            text: 'Moving a file',
                                            link: '/swiftui/modal_presentations/moving_a_file.md'
                                        },
                                        {
                                            text: 'Configuring a file dialog',
                                            link: '/swiftui/modal_presentations/configuring_a_file_dialog.md'
                                        },
                                        {
                                            text: 'Presenting an inspector',
                                            link: '/swiftui/modal_presentations/presenting_an_inspector.md'
                                        },
                                        {
                                            text: 'Dismissing a presentation',
                                            link: '/swiftui/modal_presentations/dismissing_a_presentation.md'
                                        },
                                    ]
                                },
                                {
                                    text: 'Toolbars', collapsed: true, items: [

                                        {
                                            text: 'Populating a toolbar',
                                            link: '/swiftui/toolbars/populating_a_toolbar.md'
                                        },
                                        {
                                            text: 'Populating a customizable toolbar',
                                            link: '/swiftui/toolbars/populating_a_customizable_toolbar.md'
                                        },
                                        {
                                            text: 'Removing default items',
                                            link: '/swiftui/toolbars/removing_default_items.md'
                                        },
                                        {
                                            text: 'Setting toolbar visibility',
                                            link: '/swiftui/toolbars/setting_toolbar_visibility.md'
                                        },
                                        {
                                            text: 'Specifying the role of toolbar content',
                                            link: '/swiftui/toolbars/specifying_the_role_of_toolbar_content.md'
                                        },
                                        {text: 'Styling a toolbar', link: '/swiftui/toolbars/styling_a_toolbar.md'},
                                        {
                                            text: 'Configuring the toolbar title display mode',
                                            link: '/swiftui/toolbars/configuring_the_toolbar_title_display_mode.md'
                                        },
                                        {
                                            text: 'Setting the toolbar title menu',
                                            link: '/swiftui/toolbars/setting_the_toolbar_title_menu.md'
                                        },
                                        {
                                            text: 'Creating an ornament',
                                            link: '/swiftui/toolbars/creating_an_ornament.md'
                                        },
                                    ]
                                },
                                {text: 'Search', link: '/swiftui/search.md'},
                                {
                                    text: 'App extensions', collapsed: true, items: [
                                        {text: 'App extensions', link: '/swiftui/app_extensions/app_extensions.md'},
                                        {
                                            text: 'Creating a widget extension',
                                            link: '/swiftui/app_extensions/creating_a_widget_extension.md'
                                        },
                                        {
                                            text: 'Supporting additional widget sizes',
                                            link: '/swiftui/app_extensions/supporting_additional_widget_sizes.md'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            text: 'Data and storage', collapsed: true, items: [

                                {
                                    text: 'Model data', link: '/swiftui/model_data.md'
                                },
                                {
                                    text: 'Environment values', link: '/swiftui/environment_values.md'
                                },
                                {
                                    text: 'Preferences', link: '/swiftui/preferences.md'
                                },
                                {
                                    text: 'Persistent storage', link: '/swiftui/persistent_storage.md'
                                },

                            ]

                        },
                        {text: 'View fundamentals', link: '/swiftui/view_fundamentals'},
                        {text: 'View configuration', link: '/swiftui/view_configuration'},
                        {
                            text: 'View styles', collapsed: true, items: [
                                {text: 'Styling buttons', link: '/swiftui/view_styles/styling_buttons'},
                                {text: 'Styling pickers', link: '/swiftui/view_styles/styling_pickers'},
                                {text: 'Styling menus', link: '/swiftui/view_styles/styling_menus'},
                                {text: 'Styling toggles', link: '/swiftui/view_styles/styling_toggles'},
                                {text: 'Styling indicators', link: '/swiftui/view_styles/styling_indicators'},
                                {
                                    text: 'Styling views that display text',
                                    link: '/swiftui/view_styles/styling_views_that_display_text'
                                },
                                {
                                    text: 'Styling collection views',
                                    link: '/swiftui/view_styles/styling_collection_views'
                                },
                                {
                                    text: 'Styling navigation views',
                                    link: '/swiftui/view_styles/styling_navigation_views'
                                },
                                {text: 'Styling groups', link: '/swiftui/view_styles/styling_groups'},

                            ]
                        },
                        {
                            text: 'Animations',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Index',
                                    link: '/swiftui/animations/index'
                                },
                                {
                                    text: 'Adding state-based animation to an action',
                                    link: '/swiftui/animations/adding_state_based_animation_to_an_action'
                                },
                                {
                                    text: 'Adding state-based animation to a view',
                                    link: '/swiftui/animations/adding_state_based_animation_to_a_view'
                                },
                                {
                                    text: 'Creating phase-based animation',
                                    link: '/swiftui/animations/creating_phase_based_animation'
                                },
                                {
                                    text: 'Creating custom animations',
                                    link: '/swiftui/animations/creating_custom_animations'
                                },
                                {
                                    text: 'Making data animatable',
                                    link: '/swiftui/animations/making_data_animatable'
                                },
                                {
                                    text: 'Updating a view on a schedule',
                                    link: '/swiftui/animations/updating_a_view_on_a_schedule'
                                },
                                {
                                    text: 'Synchronizing geometries',
                                    link: '/swiftui/animations/synchronizing_geometries'
                                },
                                {
                                    text: 'Defining transitions',
                                    link: '/swiftui/animations/defining_transitions'
                                },
                                {
                                    text: 'Moving an animation to another view',
                                    link: '/swiftui/animations/moving_an_animation_to_another_view'
                                }

                            ]

                        },
                        {
                            text: 'Text input and output',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Displaying text',
                                    link: '/swiftui/text_input_and_output/displaying_text'
                                },
                                {
                                    text: 'Getting text input',
                                    link: '/swiftui/text_input_and_output/getting_text_input'
                                },
                                {
                                    text: 'Selecting text',
                                    link: '/swiftui/text_input_and_output/selecting_text'
                                },
                                {
                                    text: 'Setting a font',
                                    link: '/swiftui/text_input_and_output/setting_a_font'
                                },
                                {
                                    text: 'Adjusting text size',
                                    link: '/swiftui/text_input_and_output/adjusting_text_size'
                                },
                                {
                                    text: 'Managing text layout',
                                    link: '/swiftui/text_input_and_output/managing_text_layout'
                                },
                            ]

                        }

                    ]
                },
            ],

            '/realitykit/': [
                {
                    text: 'RealityKit',
                    items: [
                        {text: 'RealityKit Index', link: '/realitykit/index.md'}
                    ]
                },
            ],

            '/arkit/': [
                {
                    text: 'ARKit',
                    items: [
                        {text: 'ARKit Index', link: '/arkit/index.md'}
                    ]
                },
            ],

            '/accessibility/': [
                {
                    text: 'Accessibility',
                    items: [
                        {text: 'Accessibility Index', link: '/accessibility/index.md'}
                    ]
                },
            ],

        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/GepengCn/visionOS'}
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Gepeng'
        },
        search: {
            provider: 'local'
        }
    }
})
