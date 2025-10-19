# ES6 Object 方法全解析

本章系统梳理了 ES6 及以后常用的 `Object` 对象方法。  
按照「是否修改原对象（破坏性 / 非破坏性）」进行分类，并细分为「增、删、改、查、遍历、合并、冻结」等功能模块。

适用于实际项目开发与前端面试准备。

---

## 一、破坏性方法（Mutating Methods）

这些方法会 **直接修改原对象**，在 Vue、React 等响应式框架中使用时要谨慎。

---

### 1. 增改类

#### `Object.assign(target, source)`

- **功能**：将一个或多个源对象的属性复制到目标对象。
- **返回值**：被修改后的目标对象。
- **使用场景**：对象合并、配置覆盖。

```js
const defaultConfig = { theme: "light", lang: "zh" };
const userConfig = { theme: "dark" };

Object.assign(defaultConfig, userConfig);
console.log(defaultConfig);
// { theme: 'dark', lang: 'zh' }
```

### 2. 删除类

#### `delete`

- **功能**：删除对象中的某个属性。
- **使用场景**：删除敏感字段或临时属性。

```js
const user = { name: "Tom", password: "123456" };
delete user.password;
console.log(user); // { name: 'Tom' }
```

::: danger ⚠️ 注意
此操作会修改 defaultConfig。
:::

### 3. 定义属性类

#### `Object.defineProperty(obj, key, descriptor)`

- **功能**：定义或修改对象的属性（可控制可写性、可枚举性等）。
- **使用场景**：底层框架设计、响应式系统（如 Vue2 的依赖追踪）。

```js
const user = {};
Object.defineProperty(user, "name", {
  value: "Tom",
  writable: false,
  enumerable: true,
});
console.log(user.name); // 'Tom'
user.name = "Jerry"; // 无效
```

#### `Object.defineProperties(obj, descriptors)`

- **功能**：批量定义多个属性。
- **使用场景**：初始化带有描述符的大对象。

```js
const user = {};
Object.defineProperties(user, {
  name: { value: "Tom", writable: true },
  age: { value: 25, writable: false },
});
```

---

## 二、非破坏性方法（Non-Mutating Methods）

这些方法会 **不会修改原对象**，而是返回新的对象或信息。推荐在项目中优先使用。

---

### 1. 查阅类

#### `Object.entries(obj)、Object.keys(obj)、Object.values(obj)`

- **功能**：分别返回键值对的二维数组、键数组、值数组
- **使用场景**：遍历对象时配合 for...of；统计字段数量、遍历表单数据；汇总数据值，如计算总分

```js
const user = { name: "Tom", age: 25 };
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
// name Tom
// age 25
Object.keys(user); // ['name', 'age']
const scores = { math: 90, english: 80 };
Object.values(scores); // [90, 80]
```

#### `Object.getOwnPropertyNames(obj)`

- **功能**：返回对象所有属性名（包括不可枚举的）。
- **使用场景**：调试或底层库开发。

```js
const obj = Object.create(
  {},
  {
    hidden: { value: 1, enumerable: false },
    visible: { value: 2, enumerable: true },
  }
);
Object.getOwnPropertyNames(obj); // ['hidden', 'visible']
```

### 2. 原型与继承类

#### `Object.getPrototypeOf(obj)`

- **功能**：获取对象的原型。
- **使用场景**：判断继承关系。

```js
const arr = [];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
```

#### `Object.setPrototypeOf(obj, prototype)`

- **功能**：设置对象原型。
- **使用场景**：手动继承（不推荐频繁使用）。

```js
const a = {};
const b = {
  sayHi() {
    console.log("hi");
  },
};
Object.setPrototypeOf(a, b);
a.sayHi(); // 'hi'
```

### 3. 克隆与合并类

#### `Object.assign()`

- **功能**：对象浅拷贝（非破坏性用法）。
- **使用场景**：生成新配置对象。

```js
const defaultConfig = { theme: "light" };
const userConfig = { theme: "dark" };
const finalConfig = Object.assign({}, defaultConfig, userConfig);
```

#### `structuredClone(obj) `(ES2021+)

- **功能**：深拷贝对象（支持嵌套结构）。
- **使用场景**：克隆复杂状态对象。

```js
const obj = { a: { b: 1 } };
const copy = structuredClone(obj);
obj.a.b = 2;
console.log(copy.a.b); // 1
```

### 4. 遍历类

#### `Object.entries()` + `for...of`

- **功能**：优雅地遍历对象键值。
- **使用场景**：替代传统 `for...in`。

```js
const settings = { theme: "dark", lang: "zh" };
for (const [k, v] of Object.entries(settings)) {
  console.log(k, v);
}
```

#### `Object.fromEntries()`

- **功能**：将键值对数组转换为对象。
- **使用场景**：数据转换、反序列化。

```js
const arr = [
  ["name", "Tom"],
  ["age", 25],
];
Object.fromEntries(arr);
// { name: 'Tom', age: 25 }
```

### 5. 冻结与保护类

#### `Object.freeze(obj)`

- **功能**：冻结对象（不可添加、修改、删除属性）。
- **使用场景**：保护配置对象或常量。

```js
const config = Object.freeze({ apiUrl: "/api" });
config.apiUrl = "/new"; // 无效
```

#### `Object.seal(obj)`

- **功能**：禁止添加或删除属性，但可修改已有属性值。
- **使用场景**：防止结构被改动，但保留值修改能力。

```js
const user = Object.seal({ name: "Tom" });
user.name = "Jerry"; // ✅
delete user.name; // ❌ 无效
```

#### `Object.preventExtensions(obj)`

- **功能**：禁止新增属性。
- **使用场景**：限制动态扩展对象。

```js
const data = Object.preventExtensions({ a: 1 });
data.b = 2; // 无效
```

### 6. 属性描述符相关

#### `Object.getOwnPropertyDescriptor(obj, prop)`

- **功能**：获取单个属性的描述符。
- **使用场景**：调试或控制属性行为。

```js
const user = { name: "Tom" };
Object.getOwnPropertyDescriptor(user, "name");
```

#### `Object.getOwnPropertyDescriptors(obj)`

- **功能**：获取所有属性的描述符。
- **使用场景**：实现完整拷贝（包括属性配置）。

```js
const obj = { name: "Tom" };
Object.getOwnPropertyDescriptors(obj);
```

## 三、面试常见考点总结

| 分类 | 高频方法                            | 考点                    |
| ---- | ----------------------------------- | ----------------------- |
| 遍历 | `Object.keys / values / entries`    | 区别与使用场景          |
| 合并 | `Object.assign` vs 展开运算符       | 浅拷贝、覆盖顺序        |
| 转换 | `Object.fromEntries`                | 与 `entries` 互为逆操作 |
| 原型 | `getPrototypeOf / setPrototypeOf`   | 原型链考点              |
| 冻结 | `freeze / seal / preventExtensions` | 不同限制级别            |
| 克隆 | `structuredClone`                   | 深拷贝与浅拷贝区别      |

::: tip 💡 Tip
非响应式场景下（如工具函数）可安全使用破坏性方法。<br>
推荐优先使用非破坏性方法，保证数据安全性。<br>
面试中高频组合考题：

- Object.keys + map
- Object.entries + fromEntries
- Object.assign vs 扩展运算符 { ...obj }
  :::
