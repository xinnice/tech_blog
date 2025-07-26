---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "前端技术知识"
  # text: "个人笔记与知识总结"
  tagline: 包含css、js、nodejs、webpack、框架、移动端、代码协作
  actions:
    # - theme: brand
    #   text: Markdown Examples
    #   link: /markdown-examples
    - theme: alt
      text: 进入文档
      link: /docs/CSS/水平垂直居中.md
    - theme: brand
      text: AI问答
      link: /docs/ai.md 

features:
  - title: CSS
    details: 水平垂直居中、flex、BFC
    link: /docs/CSS/水平垂直居中.md
  - title: JavaScript
    details: ajax、es5、es6 
    link: /docs/JavaScript/Ajax.md
  - title: 网络
    details: 请求响应报文、url渲染网页基本流程、三握四挥
    link: /docs/网络/请求响应报文.md
  - title: Vue、React
    details: 使用脚手架创建项目、路由、组件化
    link: /docs/Vue/搭建环境.md
  - title: Nodejs
    details: js也能写服务端，基本使用及框架介绍
    link: /docs/Nodejs/介绍及基本使用.md
  - title: 工程化
    details: Vite、Webpack、Gulp
    link: /docs/工程化/Vite.md
  - title: 移动端
    details: 基础概念、小程序
    link: /docs/移动端/基础核心概念.md
  - title: 代码协作
    details: git、github代码管理
    link: "/docs/代码管理/git.md"
  - title: 部署
    details: nginx代理服务器
    link: "/docs/部署/nginx基本介绍.md"


