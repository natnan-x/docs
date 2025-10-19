# ES6 数组方法全解析

本章系统梳理了 ES6 中所有常见的数组方法，按照 **是否修改原数组（破坏性 / 非破坏性）** 进行分类，并进一步细分为 **增、删、改、查、排序等** 功能模块。  
文档适用于实际项目开发与前端面试准备。

## 一、破坏性方法（Mutating Methods）

这些方法会直接 **修改原数组**，使用时要注意对响应式数据（如 Vue/React）产生的副作用。

### 1. 增删改类

#### `push()`

- **功能**：向数组末尾添加一个或多个元素。
- **返回值**：新数组的长度。
- **使用场景**：在列表数据中追加新项，例如添加评论。

```js
const comments = ["好文！", "学习了"];
comments.push("很有帮助");
// ['好文！', '学习了', '很有帮助']
```

#### `pop()`

- **功能**：删除数组最后一个元素。
- **返回值**：被删除的元素。
- **使用场景**：撤销最后一步操作（如购物车撤销最后商品）。

```js
const cart = ["鞋子", "帽子", "手表"];
cart.pop();
// ['鞋子', '帽子']
```

#### `unshift()`

- **功能**：在数组开头添加一个或多个元素。
- **返回值**：消息列表中插入最新消息。

```js
const messages = ["旧消息1", "旧消息2"];
messages.unshift("新消息");
// ['新消息', '旧消息1', '旧消息2']
```

#### `shift()`

- **功能**：删除数组第一个元素。
- **使用场景**：任务队列（先进先出）结构。

```js
const queue = ["任务1", "任务2"];
queue.shift();
// ['任务2']
```

#### `splice()`

- **功能**：在任意位置增删改。
- **语法**：`arr.splice(start, deleteCount, item1, item2, ...)`
- **使用场景**：删除或替换指定索引元素。

```js
const todos = ["吃饭", "写代码", "睡觉"];
todos.splice(1, 1); // 删除索引1
// ['吃饭', '睡觉']
todos.splice(1, 0, "打游戏"); // 插入
```

### 2. 排序类

#### `reverse()`

- **功能**：反转数组顺序。
- **使用场景**：按时间倒序显示记录。

```js
const logs = ["上午", "中午", "晚上"];
logs.reverse();
// ['晚上', '中午', '上午']
```

#### `sort()`

- **功能**：对数组排序。
- **使用场景**：对价格、积分、排名等数据排序。

```js
const users = [50, 80, 30];
users.sort((a, b) => b - a);
// [80, 50, 30]
```

### 3. 改造类

#### `fill()`

- **功能**：用指定值填充数组。
- **使用场景**：初始化默认数组。

```js
const arr = new Array(5).fill(0);
// [0, 0, 0, 0, 0]
```

#### `copyWithin()`

- **功能**：复制数组内部分内容到其他位置。
- **使用场景**：性能优化或底层算法中偶尔使用。

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);
// [4, 5, 3, 4, 5]
```

## 二、非破坏性方法（Non-Mutating Methods）

这些方法会直接 **修改原数组**，使用时要注意对响应式数据（如 Vue/React）产生的副作用。

### 1. 查询类

#### `includes()`

- **功能**：判断是否包含某个元素。
- **使用场景**：权限判断。

```js
const roles = ["admin", "editor"];
roles.includes("admin"); // true
```

#### `indexOf() / lastIndexOf()`

- **功能**：查找元素索引。
- **使用场景**：搜索数据位置。

```js
const tags = ["html", "css", "js", "css"];
tags.indexOf("css"); // 1
tags.lastIndexOf("css"); // 3
```

#### `find()`

- **功能**：查找符合条件的第一个元素。
- **使用场景**：查询匹配对象。

```js
const users = [{ id: 1 }, { id: 2 }];
users.find((u) => u.id === 2); // { id: 2 }
```

#### `findIndex()`

- **功能**：查找符合条件的索引。
- **使用场景**：结合 `splice` 删除目标项。

```js
const list = [{ id: 1 }, { id: 2 }];
const index = list.findIndex((i) => i.id === 2);
list.splice(index, 1);
```

### 2. 过滤/映射/聚合类

#### `filter()`

- **功能**：筛选符合条件的元素。
- **使用场景**：过滤出已完成任务。

```js
const todos = [
  { text: "学习", done: true },
  { text: "打游戏", done: false },
];
const doneTodos = todos.filter((t) => t.done);
```

#### `map()`

- **功能**：映射转换元素。
- **使用场景**：格式化接口数据。

```js
const users = [{ name: "Tom" }, { name: "Jerry" }];
const names = users.map((u) => u.name);
// ['Tom', 'Jerry']
```

#### `reduce()`

- **功能**：聚合计算。
- **使用场景**：计算购物车总价。

```js
const prices = [100, 200, 50];
const total = prices.reduce((sum, p) => sum + p, 0);
// 350
```

#### `flat() / flatMap()`

- **功能**：扁平化嵌套数组。
- **使用场景**：处理多层结构数据。

```js
const arr = [1, [2, [3, 4]]];
arr.flat(2);
// [1, 2, 3, 4]
```

### 3. 拼接与切片类

#### `concat()`

- **功能**：合并数组。
- **使用场景**：拼接分页数据。

```js
const page1 = [1, 2];
const page2 = [3, 4];
page1.concat(page2);
// [1, 2, 3, 4]
```

#### `slice()`

- **功能**：截取数组片段。
- **使用场景**：分页或轮播数据。

```js
const items = [1, 2, 3, 4, 5];
items.slice(0, 3);
// [1, 2, 3]
```

### 4. 遍历类

#### `forEach()`

- **功能**：遍历数组（无返回值）。
- **使用场景**：打印或执行副作用逻辑。

```js
const users = ["Tom", "Jerry"];
users.forEach((u) => console.log(u));
```

#### `every() / some()`

- **功能**：判断是否所有 / 部分满足条件。
- **使用场景**：表单校验。

```js
const inputs = [true, true, false];
inputs.every((i) => i); // false
```

### 5. 转换与字符串操作

#### `join()`

- **功能**：数组转字符串。
- **使用场景**：拼接标签、生成 CSV。

```js
const tags = ["Vue", "React", "Angular"];
tags.join(", ");
// 'Vue, React, Angular'
```

#### `toString()`

- **功能**：数组转字符串（与 `join()` 类似）。
- **使用场景**：简单输出调试。

```js
const arr = [1, 2, 3];
arr.toString();
// '1,2,3'
```

## 三、面试常见考点总结

| 分类         | 高频方法                        | 考点                 |
| ------------ | ------------------------------- | -------------------- |
| 修改原数组   | `splice`, `sort`, `push`        | 是否破坏原数组       |
| 不修改原数组 | `map`, `filter`, `slice`        | 返回新数组           |
| 聚合         | `reduce`                        | 初始值与累加逻辑     |
| 查找         | `find`, `findIndex`, `includes` | 匹配逻辑差异         |
| 遍历         | `forEach` vs `map`              | 是否返回新数组       |
| 排序         | `sort`                          | 比较函数的返回值规则 |

::: tip 💡 Tip
业务开发中优先使用非破坏性方法，便于状态管理。<br>
splice、sort、reverse 等破坏性方法需谨慎操作。<br>
map、filter、reduce 是函数式编程的核心三件套，掌握它们的组合能显著提升代码质量。
:::
