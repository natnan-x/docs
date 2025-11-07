<!--
 * @Author: NanNan
 * @Date: 2025-11-02 01:15:19
 * @LastEditTime: 2025-11-07 20:34:15
 * @Description:
-->

# 汇总 Vue 基础题

## Q1: 计算属性与 data 属性可以同名么？

<b>答：不能</b><br/>

- 计算属性会覆盖同名的 data 属性，Vue 会在运行时报错或表现出意料外的行为。
- data 属性和计算属性（computed）最终都会作为 Vue 实例的一个属性存在
- Vue 在初始化的时会按照一定的顺序（props、methods、data、computed、watch）挂载在实例上，后挂载的会覆盖先挂载的。
- data 的优先级高于 computed，先使用 data 再计算 computed

## Q2: v-show 和 v-if 区别和使用场景？

<b>答：两者都是条件性显示元素的指令</b>

- v-if 是真正的条件渲染，设置为 false，元素会被完全移出 DOM。
- v-show 不管出事条件如何，元素都会被渲染，保存在 DOM 中。起本事相当于 display:none;
- v-if 主要用来条件很少改变的情况，比如全县判断，平台区分；v-show 适用于频繁切换显示隐藏的状态元素，如标签页、手风琴

## Q3: Vue 组件中写 name 选项的作用？

<b>答：最适用于搭配`<keep-alive>`，其 `inclue` 和 `exclude` 属性可以根据组件 `name` 来决定需要被缓存货排除的缓存，这是 `name` 选项必不可少的一个场景。</b><br/>

- Vue3 中自动将文件名字推导出组件名称，比如 `MyComponent.vue` 会自动获取“`MyComponent`”名称。

## Q4: 为什么不建议在 Vue 中同时使用 v-if 和 v-for

**答：在 Vue 中同时使用 `v-if` 与 `v-for` 会导致性能浪费与逻辑混乱，应通过计算属性过滤或外层条件控制来避免。Vue 官方文档明确指出，应避免这种写法。**

1. **执行优先级问题**

- Vue2 中 `v-for` 的优先级高于 `v-if`。这意味着 `v-if` 在循环内部的每次迭代中都被执行，可能会导致性能问题；
- Vue3 中 `v-if` 的优先级高于 `v-for`。这会导致 `v-if` 无法访问 `v-for` 作用域内定义的变量，从而引发错误。

2. **渲染性能问题**

- 每次渲染都会完整遍历 `list`，即使大部分元素不满足条件，也会执行 `v-if` 判断。这种“**先遍历、再过滤**”的逻辑浪费渲染资源。

3. **可读性与维护性差**

同时使用会让逻辑分散在模版中，不易理解

```vue
<li v-for="item in list" v-if="item.active">{{ item.name }}</li>
```

- 上述代码难以判断是：
  - “只渲染活跃的项”，还是
  - “遍历所有项，但仅显示活跃项”

::: info 推荐写法

1. 在计算属性(`computed`)中先过滤数据

```vue
const activeList = computed(() => list.value.filter(item => item.active))
```

2. 将 `v-if` 移到父级容器，这样可以在整个循环前进行判断，减少无意义的遍历。
   :::

## Q5: template 标签有什么作用？

**答：`template` 是 Vue 中的抽象容器标签，主要作为占位符使用。用于组织结构、条件控制、循环渲染与插槽定义**

- Vue2 中，作为一个占位符使用，或者是在组件中传递一个插槽内容。无论什么情况，template 在 compiler 后会被去除。
- Vue3 中，用法同 Vue2，但是在不使用 v-if、v-else-if、v-else、v-slot、v-for 的时候，Vue 不会进行处理，会直接渲染成一个 HTML 原生的 template 标签。

## Q6: 什么是 Vue 中的 slot？作用是什么？

**答：`slot`是 Vue 中用于组件内容分发（内容插槽）的机制。它允许服组件向子组件指定位置传递内容，从而提高组件的复用性与灵活性。如果想让父组件能在子组件中自定义部分内容（如标题、按钮文字等），就需要使用`slot`来占位——告诉 Vue 未来这部分内容由父组件来提供。**

1. 默认插槽（最常用）

- 用于分发未命名的内容。

```vue
<!-- 子组件 Child.vue -->
<template>
  <div class="card">
    <slot>默认内容（当父组件未传内容时显示）</slot>
  </div>
</template>

<!-- 父组件 -->
<Child>
  <p>这里是父组件传递的内容</p>
</Child>
```

作用：替换 `slot` 内默认内容，实现灵活布局。

2. 具名插槽（命名插槽）

- 用于同一个组件中分发多处内容。

```vue
<!-- 子组件 Child.vue -->
<template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  <footer><slot name="footer"></slot></footer>
</template>

<!-- 父组件 -->
<Child>
  <template #header><h1>头部区域</h1></template>
  <p>主体内容</p>
  <template #footer><p>底部信息</p></template>
</Child>
```

3. 作用与插槽（动态插槽）

- 当子组件需要将数据传递给父组件使用时。

```vue
<!-- 子组件 Child.vue -->
<template>
  <ul>
    <slot :items="list"></slot>
  </ul>
</template>

<script setup lang="ts">
const list = ['Vue', 'React', 'Angular'];
</script>

<!-- 父组件 -->
<Child v-slot="{ items }">
  <li v-for="item in items" :key="item">{{ item }}</li>
</Child>
```

**作用：**父组件可接收子组件数据并自定义渲染逻辑。

:::tip 总结

| 类型       | 用途            | 父组件写法          | 特点     |
| ---------- | --------------- | ------------------- | -------- |
| 默认插槽   | 基本内容分发    | `<slot></slot>`     | 最简单   |
| 具名插槽   | 多区域内容分发  | `<template #name>`  | 结构清晰 |
| 作用域插槽 | 子 → 父数据传递 | `v-slot="{ data }"` | 动态渲染 |

:::
