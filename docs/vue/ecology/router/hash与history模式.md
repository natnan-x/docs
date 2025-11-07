<!--
 * @Author: NanNan
 * @Date: 2025-11-07 20:55:32
 * @LastEditTime: 2025-11-07 20:58:24
 * @Description:
-->

# Vue-Router Hash 模式与 History 模式区别

在 Vue-Router 中，常用的路由模式有 **Hash 模式** 和 **History 模式**，它们在地址栏表现和服务端配置上有所不同。下面详细说明。

## 1. Hash 模式（`createWebHashHistory`）

- URL 中会带 `#`，例如：

  ```
  http://example.com/#/about
  ```

- `#` 后面的部分不会被浏览器发送给服务器，因此不需要服务端额外配置。
- 页面刷新不会导致 404，因为服务器只看到 `http://example.com/`。
- 优点：无需服务端支持，简单易用。
- 缺点：URL 不美观，SEO 不友好。

## 2. History 模式（`createWebHistory`）

- URL 看起来像正常路径，不带 `#`，例如：

  ```
  http://example.com/about
  ```

- 使用 HTML5 History API（`pushState` / `replaceState`）进行导航。
- 页面刷新或直接访问子路径时，浏览器会向服务器发送请求，如果服务器没有配置重定向到 `index.html`，会返回 404。
- 优点：URL 美观，SEO 友好。
- 缺点：需要服务端配置支持，刷新页面需返回 `index.html`。

## 3. 开发建议

- **开发环境**：Hash 模式最简单，无需配置服务器，适合快速开发和小型项目。
- **生产环境**：History 模式更符合现代 Web 应用需求，但必须保证服务器能正确处理所有路由请求，通常配置将所有 404 请求重定向到 `index.html`。
- **SEO 和美观要求高**：优先选择 History 模式。
- **简单 SPA 或内部管理系统**：可以选择 Hash 模式，减少服务器配置成本。

## 4. 示例代码

### Hash 模式

```js
import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    /* 路由配置 */
  ],
});
```

### History 模式

```js
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* 路由配置 */
  ],
});
```
