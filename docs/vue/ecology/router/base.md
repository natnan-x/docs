# Vue-Router 基础配置

Vue-Router 是 Vue 官方的路由管理器，用于在 Vue 应用中实现页面导航与组件切换。本文介绍 Vue3 基础配置和常用用法。

## 1. 安装

```bash
npm install vue-router@4
```

> Vue3 使用 vue-router 4.x。

## 2. 基础配置

### 2.1 创建路由配置文件

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 2.2 在 Vue 应用中挂载路由

```js
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

## 3. 路由跳转

### 3.1 模板跳转

```vue
<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </nav>
</template>
```

### 3.2 编程式跳转

```js
<script setup>
  import {useRouter} from 'vue-router' const router = useRouter() function
  goAbout() {router.push('/about')}
</script>
```

## 4. 路由视图显示

```vue
<template>
  <router-view></router-view>
</template>
```

> `<router-view>` 是路由出口，用于显示匹配的组件。

## 5. 路由模式

| 模式                   | 描述                                   |
| ---------------------- | -------------------------------------- |
| `createWebHistory`     | HTML5 History 模式，地址栏干净，无 `#` |
| `createWebHashHistory` | Hash 模式，地址带 `#`，无需服务端配置  |
| `createMemoryHistory`  | 内存模式，多用于服务端渲染或测试       |

## 6. 嵌套路由

```js
const routes = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },
      { path: 'profile', component: UserProfile },
      { path: 'settings', component: UserSettings },
    ],
  },
];
```

> `children` 路径不带 `/` 开头，会被自动拼接父路径。

## 7. 动态路由

```js
const routes = [
  { path: '/product/:id', name: 'Product', component: ProductDetail },
];
```

### 获取路由参数

```vue
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id);
</script>
```

## 8. 路由守卫

### 8.1 全局守卫

```js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});
```

### 8.2 路由独享守卫

```js
const routes = [
  {
    path: '/about',
    component: About,
    beforeEnter: (to, from, next) => {
      next();
    },
  },
];
```

## 9. 总结

- `createRouter` + `createWebHistory` 是 Vue3 基础路由配置方式。
- 使用 `<router-link>` 和 `<router-view>` 完成路由跳转和组件渲染。
- 支持嵌套、动态路由和路由守卫。
- 路由模式根据需求选择 `History` 或 `Hash`。
- 编程式跳转和模板跳转结合使用，可灵活控制页面导航。
