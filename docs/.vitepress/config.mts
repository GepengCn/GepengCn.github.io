import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "visionOS",
  description: "visionOS From Scratch",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Swift',
        items: [
          { text: 'Swift Index', link: '/swift/index.md' }
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
    search: {
      provider: 'local'
    }
  }
})
