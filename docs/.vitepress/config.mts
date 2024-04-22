import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base : '/visionOS/',
  title: "visionOS",
  description: "visionOS From Scratch",
  markdown: {
    math: true
  },
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      {
        text: 'Swift',
        items: [
          { text: '导航', link: '/swift/index.md' },
          { text: '基础部分', link: '/swift/basic.md' },
          { text: '基本运算符', link: '/swift/basic_operators.md' },
          { text: '字符串和字符', link: '/swift/string.md' },
          { text: '集合类型', link: '/swift/collection.md' },
        ]
      },
      {
        text: 'SwiftUI',
        items: [
          { text: 'SwiftUI Index', link: '/swiftui/index.md' }
        ]
      },
      {
        text: 'RealityKit',
        items: [
          { text: 'RealityKit Index', link: '/realitykit/index.md' }
        ]
      },
      {
        text: 'ARKit',
        items: [
          { text: 'ARKit Index', link: '/arkit/index.md' }
        ]
      },
      {
        text: 'Accessibility',
        items: [
          { text: 'Accessibility Index', link: '/accessibility/index.md' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GepengCn/visionOS' }
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
