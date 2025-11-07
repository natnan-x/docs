# Vue3 + Pinia 面试问答汇总

> 本文档整理了 Vue3 + Pinia 面试常见的高频及进阶问题，附核心代码示例，便于面试前快速复习。

## 目录

- [基础问题](#基础问题)
- [进阶问题](#进阶问题)
- [实战/高频问题](#实战高频问题)
- [面试频率总结](#面试频率总结)

## 基础问题

### Q1: Pinia 是什么？和 Vuex 有什么区别？

- Pinia 是 Vue3 官方推荐的状态管理库，轻量、TypeScript 友好、支持组合式 API
- 相比 Vuex：

  - API 更简洁
  - 无 mutations，直接在 actions 修改 state
  - 模块化管理更灵活
  - 内置 TypeScript 支持

### Q2: 如何安装与使用 Pinia？

```ts
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

### Q3: 如何定义一个 Store？

```ts
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### Q4: 在组件中如何使用 Store？

```ts
<script setup lang='ts'>
  import {useCounterStore} from '@/stores/counter'; const counter =
  useCounterStore(); counter.increment(); console.log(counter.double);
</script>
```

### Q5: 如何处理异步操作？

```ts
actions: {
  async fetchData() {
    try {
      const res = await fetch('/api/data');
      this.count = await res.json();
    } catch (error) {
      console.error('获取数据失败', error);
    }
  }
}
```

## 进阶问题

### Q6: 如何做状态持久化？

- 使用 `pinia-plugin-persistedstate` 插件

```ts
persist: {
  key: 'user-store',
  storage: localStorage,
  paths: ['token', 'info']
}
```

### Q7: Store 之间如何通信？

```ts
import { useOtherStore } from './otherStore';

actions: {
  updateOther() {
    const otherStore = useOtherStore();
    otherStore.someAction();
  }
}
```

### Q8: TypeScript 下如何保证类型安全？

```ts
interface UserState {
  token: string;
  info: { name: string; age: number };
}

export const useUserStore = defineStore<'user', UserState>({
  state: () => ({ token: '', info: { name: '', age: 0 } }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});
```

### Q9: 如何在组件外使用 Store？

```ts
import { useUserStore } from './stores/user';
const userStore = useUserStore();
userStore.setToken('token123');
```

## 实战/高频问题

### Q10: 大型项目拆分 Store

- 按功能拆分：`userStore`、`cartStore`、`productStore`
- 保持每个 store 小而清晰，通过 actions/getters 通信，不直接修改其他 Store 的 state

### Q11: Pinia 的响应式原理是什么？

- 基于 Vue3 `reactive` + `ref`
- getters 是 computed，state 更新自动触发组件更新

### Q12: 路由权限控制示例

```ts
const userStore = useUserStore();
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !userStore.token) return '/login';
});
```

### Q13: 性能优化技巧

- getter 缓存计算结果
- 模块化 Store 减少无关组件渲染
- 批量更新 state，避免频繁触发响应式

### Q14: 多组件共享异步数据

- Store 管理异步请求状态
- 所有组件引用同一 Store，状态响应式自动更新

## 面试频率总结

| 频率 | 主题 | 核心考点                            |
| ---- | ---- | ----------------------------------- |
| 高   | 基础 | Store 定义/使用、组件调用、异步操作 |
| 高   | 实战 | Store 拆分、SSR/路由权限、性能优化  |
| 中高 | 进阶 | 持久化、TS 类型、Store 通信         |
