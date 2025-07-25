import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端技术知识",
  description: "前端技术知识",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  // 添加Vite配置
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    nav: [
      // { text: "Home", link: "/markdown-examples" },
      { text: "文档", link: "/docs/JavaScript/ES6.md" },
      { text: "AI助手", link: "/docs/ai.md" },
    ],
    outline: {
      label: "导航",
    },
    sidebar: [
      {
        text: "CSS",
        collapsed: false,
        items: [
          { text: "水平垂直居中", link: "/docs/CSS/水平垂直居中.md" },
          { text: "BFC模型", link: "/docs/CSS/BFC模型.md" },
          { text: "Flex布局", link: "/docs/CSS/Flex布局.md" },
        ],
      },
      {
        text: "JavaScript",
        collapsed: false,
        items: [
          { text: "执行上下文", link: "/docs/JavaScript/执行上下文.md" },
          { text: "Ajax", link: "/docs/JavaScript/Ajax.md" },
          { text: "ES5", link: "/docs/JavaScript/ES5.md" },
          { text: "ES6", link: "/docs/JavaScript/ES6.md" },
        ],
      },
      {
        text: "网络",
        collapsed: false,
        items: [
          { text: "请求响应报文", link: "/docs/网络/请求响应报文.md" },
          {
            text: "在浏览器地址栏输入url然后敲击回车之后都做了什么",
            link: "/docs/网络/在浏览器地址栏输入url然后敲击回车之后都做了什么.md",
          },
          {
            text: "http协议三次握手和四次挥手",
            link: "/docs/网络/http协议三次握手和四次挥手.md",
          },
        ],
      },
      {
        text: "Vue",
        collapsed: false,
        items: [
          { text: "搭建环境", link: "/docs/Vue/搭建环境.md" },
          {
            text: "简介",
            link: "/docs/Vue/简介.md",
          },
          {
            text: "脚手架",
            link: "/docs/Vue/脚手架.md",
          },
          {
            text: "源码分析",
            link: "/docs/Vue/源码分析.md",
          },
          {
            text: "组件化",
            link: "/docs/Vue/组件化.md",
          },
          {
            text: "vue-router",
            link: "/docs/Vue/vue-router.md",
          },
          {
            text: "vuex",
            link: "/docs/Vue/vuex.md",
          },
        ],
      },
      {
        text: "React",
        collapsed: false,
        items: [
          { text: "基础", link: "/docs/React/基础.md" },
          {
            text: "脚手架使用",
            link: "/docs/React/脚手架使用.md",
          },
          {
            text: "路由",
            link: "/docs/React/路由.md",
          },
          {
            text: "其他hooks",
            link: "/docs/React/其他hooks.md",
          },
          {
            text: "虚拟dom和diff算法",
            link: "/docs/React/虚拟dom和diff算法.md",
          },
        ],
      },
      {
        text: "Nodejs",
        collapsed: false,
        items: [
          {
            text: "介绍及基本使用",
            link: "/docs/Nodejs/介绍及基本使用.md",
          },
          {
            text: "框架",
            link: "/docs/Nodejs/框架.md",
          },
          {
            text: "数据库通信",
            link: "/docs/Nodejs/数据库通信.md",
          },
        ],
      },
      {
        text: "工程化",
        collapsed: false,
        items: [
          {
            text: "Vite",
            link: "/docs/工程化/Vite.md",
          },
          {
            text: "Webpack",
            link: "/docs/工程化/Webpack.md",
          },
          {
            text: "Gulp",
            link: "/docs/工程化/Gulp.md",
          },
        ],
      },
      {
        text: "移动端",
        collapsed: false,
        items: [
          {
            text: "基础",
            link: "/docs/移动端/基础核心概念.md",
          },
          {
            text: "小程序",
            link: "/docs/移动端/小程序.md",
          },
        ],
      },
      {
        text: "代码管理",
        collapsed: false,
        items: [
          {
            text: "git",
            link: "/docs/代码管理/git.md",
          },
          {
            text: "github",
            link: "/docs/代码管理/github.md",
          },
        ],
      },
      {
        text: "部署",
        collapsed: false,
        items: [
          {
            text: "nginx基本介绍",
            link: "/docs/部署/nginx基本介绍.md",
          },
          {
            text: "nginx配置",
            link: "/docs/部署/nginx配置.md",
          },
        ],
      },
    ],

    // 移除GitHub链接
    socialLinks: [],
  },
});
