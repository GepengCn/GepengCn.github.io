import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/visionOS/',
    title: "visionOS",
    description: "visionOS From Scratch",
    markdown: {
        math: true
    },
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
                    collapsed: true,
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
                    ]
                },
            ],

            '/swiftui/': [
                {
                    text: 'SwiftUI',
                    items: [
                        {text: 'SwiftUI Index', link: '/swiftui/index.md'}
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
