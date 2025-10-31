# CSS 工程化

## 一、什么是 CSS 工程化？

**CSS 工程化 = 让样式像 JS 一样模块化、可维护、自动化。**
**CSS 工程化的核心目标就是：让 CSS 可维护、可复用、可扩展、可自动化构建。**

随着项目体量增大（如中后台系统、多端项目、多人协作），传统 CSS 容易出现以下问题：

- 样式命名混乱，容易冲突
- 全局污染严重，难以维护
- 样式文件庞大，加载慢
- 缺少自动化构建流程
- 无法实现按需加载与优化

## 二、拓展知识

### 1. CSS Modules 和 Scoped CSS

- CSS Modules: 通过模块化的方式，让每个 JavaScript 文件都有独立的 CSS，避免了全局命名冲突
- Scoped CSS: 如 Vue 和 Svelte 等框架，允许在组件内部写样式并让样式制作用于当前组件

### 2. PostCSS 和 Autoprefixer

- PostCSS 是一个强大的工具，可以使用各种各样的插件实现不同的功能，例如自动添加浏览器前缀、压缩 CSS 代码等。
- Autoprefixer 可以根据目标浏览器的不同，自动为 CSS 属性添加前缀，保持兼容性。

### CSS-in-JS

- 这种方法将 CSS 样式写在 JavaScript 里，通过 JavaScript 动态生成样式。常见的库有 Styled-components、Emotion 等。他们提供了更强的动态和条件样式能力。

### 静态分析和代码检查

- 使用工具如 Stylelint 来进行静态分析和代码质量检查，这些工具可以不活钱在问题并确保代码风格的一致性。

### 构建和优化

- 使用 Webpack、Gulp 等工具进行构建和打包。通过 Tree Shaking、代码压缩等手段，减少 CSS 文件的体积，提高加载速度。

### 探索新标准

- 当前已有一些 CSS 新标准和提案，如 CSS Variables、Grid Layout 等，这些新特性可以是 CSS 写法更加灵活和强大。
