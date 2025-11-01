<!--
 * @Author: NanNan
 * @Date: 2025-11-02 01:15:19
 * @LastEditTime: 2025-11-02 02:54:58
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

## Q5: template 标签有什么作用？

## Q6: 什么是 Vue 中的 slot？作用是什么？
