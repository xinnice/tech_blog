import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "首页",
  description: "首页",
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
        text: "node",
        collapsed: false,
        items: [
          {
            text: "MongoDB原生CRUD命令总结",
            link: "/docs/Nodejs/MongoDB原生CRUD命令总结.md",
          },
          {
            text: "mongoose的CRUD方法总结",
            link: "/docs/Nodejs/mongoose的CRUD方法总结.md",
          },
        ],
      },
      {
        text: "工程化",
        collapsed: false,
        items: [
          {
            text: "Gulp",
            link: "/docs/工程化/Gulp.md",
          },
          {
            text: "Webpack",
            link: "/docs/工程化/Webpack.md",
          },
        ],
      },
      {
        text: "移动端",
        link: "/docs/移动端/移动端.md",
      },
      {
        text: "小程序",
        link: "/docs/小程序/小程序.md",
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
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
