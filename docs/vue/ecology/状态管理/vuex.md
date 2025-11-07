# Vuex 面试问答汇总

> 本文档整理了 Vuex 面试中常见的高频及进阶问题，附核心代码示例，便于面试前快速复习。

---

## 目录

- [基础问题](#基础问题)
- [进阶问题](#进阶问题)
- [实战/高频问题](#实战高频问题)
- [面试频率总结](#面试频率总结)

---

## 基础问题

### Q1: Vuex 是什么？

- Vue 官方提供的状态管理模式，集中管理组件状态，保证状态的可预测性和可维护性。

### Q2: Vuex 的核心概念

- **State**: 状态存储
- **Getter**: 类似计算属性，对 state 进行派生
- **Mutation**: 同步更新 state 的唯一方法
- **Action**: 可进行异步操作，最终通过 commit 调用 mutation
- **Module**: 将 store 拆分成模块化管理

### Q3: 如何创建和使用 Store？

```ts
// store/index.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0,
  },
  getters: {
    double: (state) => state.count * 2,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
});
```

### Q4: 在组件中如何使用 Store？

```ts
<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const count = computed(() => store.state.count);
const double = computed(() => store.getters.double);
store.commit('increment');
store.dispatch('asyncIncrement');
</script>
```

---

## 进阶问题

### Q5: Mutation 与 Action 的区别

- **Mutation**: 同步修改 state
- **Action**: 可异步操作，通过 commit 调用 mutation

### Q6: Module 的使用

```ts
// store/modules/user.ts
export default {
  namespaced: true,
  state: () => ({ name: 'Tom', age: 18 }),
  getters: { nameLength: (state) => state.name.length },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
  },
  actions: {
    asyncSetName({ commit }, name) {
      commit('setName', name);
    },
  },
};
```

### Q7: Vuex 与 TypeScript 配合

- 定义 state 接口，确保类型安全
- 在组件中使用 typed store

```ts
interface State {
  count: number;
}
const store = createStore<State>({ state: { count: 0 } });
```

### Q8: Vuex 与 Pinia 的区别

- Pinia 更轻量，API 更简洁
- 无 mutations，直接在 actions 修改 state
- TypeScript 支持更好
- 支持组合式 API，模块化更灵活

---

## 实战/高频问题

### Q9: 异步操作和共享数据

- 使用 actions 处理异步请求
- 所有组件共享 state，实现响应式更新

### Q10: 大型项目拆分 Store

- 使用 Module 拆分 user、cart、product 等模块
- 各模块独立管理自己的 state、getter、mutation、action

### Q11: 性能优化

- 避免直接在组件中频繁修改 state
- 使用 getters 缓存计算结果
- 异步操作尽量在 action 中批量更新 state

---

## 面试频率总结

| 频率 | 主题 | 核心考点                                        |
| ---- | ---- | ----------------------------------------------- |
| 高   | 基础 | Store 定义、State/Getters/Mutation/Action 使用  |
| 高   | 实战 | 异步操作、Module 拆分、性能优化                 |
| 中高 | 进阶 | Mutation vs Action、TypeScript 类型、Pinia 区别 |
