import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Solon ｜ 官网",
  description: "Java “生态型”应用开发框架：更快、更小、更简单。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '特点', items: [
          {text: '概述', link: '/about'},
          {text: '示例速览', link: '/preview'},
          {text: '更快、更小、更简单', link: '/community'},
          {text: '想法与架构笔记', link: '/download'},
          {text: '技术支持', link: '/doc'},
          {text: '与 Spring Boot 的区别', link: '/doc'},
          {text: '与 Spring Cloud 的区别', link: '/doc'},
          {text: '与 Dubbo 的区别', link: '/doc'},
          {text: '与 RSocket 的区别', link: '/doc'},
          {text: '与 Servlet 的区别', link: '/doc'},
        ]
      },
      {
        text: '学习', items: [
          {text: '开始', link: '/quickstart'},
        ]
      }
    ],

    sidebar: [
      {
        text: '特点',
        items: [
          {text: '概述', link: '/about'},
          {text: '示例速览', link: '/preview'}
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/noear/solon'}
    ],

    logo: '/favicon.png',
    siteTitle: "Solon",

    outline: {
      level: [2,3],
      label: "目录"
    },

    search: {
      provider: 'local'
    }
  }
})
