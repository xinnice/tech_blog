# Vite 学习指南

## 目录

- [什么是 Vite](#什么是-vite)
- [为什么选择 Vite](#为什么选择-vite)
- [核心特性](#核心特性)
- [快速开始](#快速开始)
- [项目配置](#项目配置)
- [开发服务器](#开发服务器)
- [构建生产版本](#构建生产版本)
- [插件系统](#插件系统)
- [高级特性](#高级特性)
- [最佳实践](#最佳实践)

## 什么是 Vite

Vite（法语意为"快速"，发音 /vit/）是一个现代前端构建工具，它显著提升了开发服务器的启动时间，并提供了丰富的功能和优化。它由 Vue.js 的创建者尤雨溪开发，但它是与框架无关的工具，可以与任何前端框架配合使用。

## 为什么选择 Vite

### 1. 极速的服务器启动

- 使用原生 ESM 文件服务器
- 只需要在浏览器请求源码时进行转换
- 无需打包，按需编译

### 2. 快速的热更新

- 基于原生 ESM 的 HMR（模块热替换）
- 精确的更新，只更新变更的模块
- 无需等待打包操作

### 3. 优化的构建

- 使用 Rollup 打包
- 内置对 TypeScript、JSX、CSS 等的支持
- 自动分割代码块
- 高度可配置

## 核心特性

### 1. 开箱即用

- TypeScript 支持
- JSX 支持
- CSS 预处理器支持
- 静态资源处理
- JSON 导入
- WebAssembly 支持

### 2. CSS 功能

- CSS 模块化
- PostCSS 集成
- CSS 预处理器支持（Sass、Less、Stylus）
- CSS 代码分割

### 3. 资源处理

- 静态资源导入
- URL 导入
- JSON 导入
- Worker 脚本
- WebAssembly

## 快速开始

### 创建项目

使用 NPM：

```bash
npm create vite@latest my-vite-app -- --template react
cd my-vite-app
npm install
npm run dev
```

使用 Yarn：

```bash
yarn create vite my-vite-app --template react
cd my-vite-app
yarn
yarn dev
```

### 项目模板

Vite 提供多种官方模板：

- vanilla
- vanilla-ts
- vue
- vue-ts
- react
- react-ts
- preact
- preact-ts
- lit
- lit-ts
- svelte
- svelte-ts

## 项目配置

### vite.config.js 基本配置

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 插件
  plugins: [react()],

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  // 构建配置
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },

  // 解析配置
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

## 开发服务器

### 基本特性

- 快速冷启动
- 即时模块热更新（HMR）
- 真正的按需编译

### 常用配置

```javascript
{
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    https: false,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    },
    cors: true
  }
}
```

## 构建生产版本

### 基本命令

```bash
npm run build
```

### 构建配置

```javascript
{
  build: {
    target: 'modules', // 浏览器兼容性
    outDir: 'dist',    // 输出目录
    assetsDir: 'assets', // 静态资源目录
    cssCodeSplit: true,  // CSS 代码分割
    sourcemap: false,    // 是否生成 sourcemap
    minify: 'terser',    // 压缩方式
    terserOptions: {     // 压缩配置
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

## 插件系统

### 官方插件

- @vitejs/plugin-react - React 支持
- @vitejs/plugin-vue - Vue 支持
- @vitejs/plugin-legacy - 旧浏览器兼容性支持

### 常用社区插件

- vite-plugin-compression - Gzip/Brotli 压缩
- vite-plugin-pwa - PWA 支持
- vite-plugin-html - HTML 处理
- vite-plugin-mock - 数据 mock

### 插件配置示例

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    compression(),
  ],
});
```

## 高级特性

### 1. 环境变量

- 默认支持 .env 文件
- 可以使用 .env.development 和 .env.production
- 使用 VITE\_ 前缀暴露给客户端

```plaintext
.env 文件示例：
VITE_API_URL=http://api.example.com
VITE_APP_TITLE=My App
```

### 2. 静态资源处理

```javascript
// 图片导入
import img from "./img.png";

// URL 导入
import url from "./file.txt?url";

// 原始内容导入
import text from "./file.txt?raw";

// 动态导入
const module = await import("./module.js");
```

### 3. WebAssembly 支持

```javascript
import init from "./example.wasm";

init().then((exports) => {
  exports.doSomething();
});
```

## 最佳实践

### 1. 项目结构

```
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 2. 性能优化

- 使用动态导入进行代码分割
- 预加载关键依赖
- 合理配置构建选项
- 使用适当的缓存策略

### 3. 开发建议

- 使用 TypeScript 获得更好的类型支持
- 配置别名简化导入路径
- 合理使用环境变量
- 遵循模块化开发原则

### 4. 调试技巧

- 使用 sourcemap
- 利用 Vite 的开发工具
- 合理配置代理服务器
- 使用浏览器开发者工具

## 常见问题解决

### 1. 热更新不生效

- 检查文件是否正确导出
- 确认模块是否支持 HMR
- 检查配置文件是否正确

### 2. 构建错误

- 检查依赖版本兼容性
- 确认构建配置是否正确
- 查看详细错误日志

### 3. 路径解析问题

- 使用别名配置
- 检查文件路径是否正确
- 确认模块导入方式

## 参考资源

- [Vite 官方文档](https://vitejs.dev/)
- [Vite GitHub 仓库](https://github.com/vitejs/vite)
- [Awesome Vite](https://github.com/vitejs/awesome-vite)

## Vite vs Webpack 深度对比

### 构建原理对比

#### Webpack 构建原理

1. **打包过程**

   - 从入口文件开始，递归解析所有依赖
   - 将所有模块打包到一个或多个 bundle 中
   - 开发环境下需要先打包才能启动开发服务器
   - 每次文件修改都需要重新打包相关依赖

2. **开发服务器**
   - 基于打包后的文件提供服务
   - 热更新需要重新打包模块
   - 项目越大，启动和热更新越慢

#### Vite 构建原理

1. **开发环境**

   - 利用浏览器原生 ES 模块支持
   - 按需编译，不需要打包
   - 即时服务器启动
   - 精确的热更新，只编译修改的文件

2. **生产环境**
   - 使用 Rollup 进行打包
   - 预构建依赖
   - 高度优化的构建过程

### 性能对比

#### 开发环境性能

| 特性       | Vite             | Webpack              |
| ---------- | ---------------- | -------------------- |
| 冷启动时间 | 极快（无需打包） | 较慢（需要打包）     |
| 热更新速度 | 极快（精确更新） | 较慢（需要重新打包） |
| 内存占用   | 低               | 较高                 |
| CPU 使用率 | 低               | 较高                 |

#### 生产环境性能

| 特性     | Vite | Webpack |
| -------- | ---- | ------- |
| 构建时间 | 较快 | 相似    |
| 代码分割 | 支持 | 支持    |
| 树摇优化 | 支持 | 支持    |
| 缓存策略 | 优秀 | 优秀    |

### 功能特性对比

#### Webpack 优势

1. **生态系统**

   - 更成熟的生态
   - 更多的 loader 和插件
   - 更多的最佳实践和社区支持
   - 更好的向后兼容性

2. **配置灵活性**

   - 高度可配置
   - 支持复杂的构建场景
   - 自定义加载器和插件系统
   - 强大的代码分割能力

3. **浏览器兼容性**
   - 更好的旧版浏览器支持
   - 无需考虑 ES 模块兼容性
   - 可配置的 polyfill 策略

#### Vite 优势

1. **开发体验**

   - 更快的服务器启动
   - 更快的热更新
   - 更简单的配置
   - 更好的开箱即用体验

2. **现代化特性**

   - 原生 ESM 支持
   - 内置优化功能
   - TypeScript 支持
   - CSS 预处理器支持

3. **构建优化**
   - 智能的代码分割
   - 优化的资源处理
   - 高效的缓存策略
   - 更小的构建产物

### 使用场景对比

#### 适合使用 Webpack 的场景

1. **大型复杂项目**

   - 需要高度自定义构建流程
   - 有特殊的模块处理需求
   - 需要支持旧版浏览器
   - 依赖大量社区插件

2. **特殊构建需求**
   - 需要自定义模块解析
   - 需要复杂的代码转换
   - 需要特殊的打包策略
   - 需要支持非标准模块格式

#### 适合使用 Vite 的场景

1. **现代化项目**

   - 面向现代浏览器
   - 使用 ES 模块
   - 需要快速的开发体验
   - 项目规模中等或较小

2. **快速原型开发**
   - 需要快速启动项目
   - 需要即时的开发反馈
   - 使用现代前端技术栈
   - 团队熟悉 ESM

### 迁移考虑

#### 从 Webpack 迁移到 Vite

1. **评估项目兼容性**

   - 检查浏览器支持要求
   - 评估依赖包的 ESM 兼容性
   - 检查自定义 loader 和插件的替代方案
   - 评估构建脚本的兼容性

2. **迁移步骤**

   - 更新项目依赖
   - 调整配置文件
   - 修改构建脚本
   - 更新开发工具配置

3. **潜在问题**
   - ESM 兼容性问题
   - 插件替代方案
   - 构建配置差异
   - 开发工具适配

### 配置对比示例

#### Webpack 配置示例

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

#### Vite 配置示例

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
```

### 性能优化对比

#### Webpack 性能优化

1. **构建优化**

   - DllPlugin 预编译
   - 缓存优化
   - 多进程构建
   - Tree Shaking

2. **加载优化**
   - 代码分割
   - 懒加载
   - 预加载
   - 压缩优化

#### Vite 性能优化

1. **开发环境优化**

   - 按需编译
   - 预构建优化
   - 智能缓存
   - 并行处理

2. **生产环境优化**
   - Rollup 优化
   - CSS 代码分割
   - 动态导入
   - 资源优化

### 总结

#### 选择建议

1. **选择 Webpack 如果**

   - 需要支持旧版浏览器
   - 项目有复杂的构建需求
   - 依赖特定的 Webpack 插件
   - 团队更熟悉 Webpack

2. **选择 Vite 如果**
   - 开发现代化应用
   - 重视开发体验
   - 项目规模适中
   - 使用 ES 模块
