# 数据类型

## 一、JavaScript 的数据类型

JavaScript 的数据类型分为两大类：

- 基础数据类型
- 引用数据类型

### 1. 基本数据类型（Primitive Types）

共有 7 种：
| 类型 | 示例 | 说明 |
| ----------- | ------------------------ | ---------------------------- |
| `string` | `'hello'` | 字符串 |
| `number` | `123`, `NaN`, `Infinity` | 数字（整数、浮点数、特殊值） |
| `boolean` | `true / false` | 布尔值 |
| `undefined` | `undefined` | 未定义变量的默认值 |
| `null` | `null` | 表示空对象 |
| `symbol` | `Symbol('id')` | 唯一值（ES6） |
| `bigint` | `10n` | 超大整数（ES2020） |

### 2. 引用数据类型（Reference Types）

对象类型：
| 类型 | 示例 |
| -------------------------------- | --------------- |
| `Object` | `{a: 1}` |
| `Array` | `[1,2,3]` |
| `Function` | `function() {}` |
| `Date`, `RegExp`, `Map`, `Set` 等 | |

## 二、如何判断数据类型

这是面试高频点。判断方式不同，适用场景也不同。

### 1. `typeof` 运算符

**适用于判断基本类型。**

```js
typeof 123; // 'number'
typeof "hi"; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
typeof 10n; // 'bigint'

// ⚠️ 特殊情况：
typeof null; // 'object'（历史遗留 bug）
typeof []; // 'object'
typeof {}; // 'object'
typeof function () {}; // 'function'
```

> ✅ 优点：简单、常用。<br>
> ❌ 缺点：对对象类类型区分不出（例如数组、null、正则等）

### 2. `instanceof` 运算符

**用于判断对象的构造函数链。**

```js
[] instanceof Array       // true
{} instanceof Object      // true
new Date() instanceof Date // true
```

> ✅ 优点：适合判断复杂对象<br>
> ❌ 缺点：无法判断基本类型；跨 iframe 会失效（不同全局作用域）

### 3. `Object.prototype.toString.call()`

**最精准、最推荐的方法（尤其在框架源码中常见）。**

```js
Object.prototype.toString.call("hi"); // "[object String]"
Object.prototype.toString.call(123); // "[object Number]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(() => {}); // "[object Function]"
```

**可以封装一个通用函数：**

```js
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
getType([]); // 'array'
getType(null); // 'null'
```

## 三、前端面试常见延伸问题

#### 💬 Q1: `null` 和 `undefined` 的区别？

| 对比项 | `undefined`        | `null`               |
| ------ | ------------------ | -------------------- |
| 含义   | 变量声明了但未赋值 | 有意表示“空”         |
| 类型   | `undefined`        | `object`（历史 bug） |
| 场景   | 系统级空值         | 程序员主动赋值为空   |

::: details **👉 面试官追问：typeof null === 'object' 为什么？**
因为早期 JS 使用 32 位系统存储类型标签，低三位为 000 表示对象，而 null 被误判为对象地址的零值。
:::

#### 💬 Q2: `==` 和 `===` 的区别？

- `==`：会进行类型转换
- `===`：严格比较类型和值

```js
0 == false; // true
0 === false; // false
null == undefined; // true
null === undefined; // false
```

::: details **👉 面试官追问：JS 的类型转换规则？**

- `Boolean` 转数字 → `true` 转 `1`，`false` 转 `0`
- 字符串转数字 → `"123"` → `123`
- `null` 转数字 → `0`
- `undefined` 转数字 → `NaN`
  :::

#### 💬 Q3: `typeof NaN`是什么？为什么？

```js
typeof NaN; // "number"
```

**因为 `NaN` 本质上是一个特殊的数值类型，代表 “Not-a-Number”。**

#### 💬 Q4: 如何判断一个变量是数组？

```js
Array.isArray([])           // ✅ 推荐
[] instanceof Array          // ✅ 可用
Object.prototype.toString.call([]) // ✅ 精准
typeof []                    // ❌ 'object'
```

#### 💬 Q5: 判断对象是否为空对象？

```js
Object.keys(obj).length === 0;
// 或
JSON.stringify(obj) === "{}";
```

#### 💬 Q6: 判断值是否为 NaN？

```js
Number.isNaN(value); // ✅ 推荐
isNaN(value); // ⚠️ 会先做类型转换
```

```js
isNaN("abc"); // true (因为 'abc' 转 NaN)
Number.isNaN("abc"); // false
```

#### 💬 Q7: 判断引用类型的深拷贝 / 浅拷贝问题

- **浅拷贝**：复制第一层引用，内部对象仍指向同一引用。

```js
const a = { x: 1, y: { z: 2 } };
const b = { ...a };
a.y.z = 100;
console.log(b.y.z); // 100
```

- **深拷贝**：每一层都复制。

```js
const deep = structuredClone(obj);
// 或 JSON.parse(JSON.stringify(obj))（有缺陷）
```

## 四、总结如下

| 题号 | 面试题                                                 | 考察点          | 高分答案思路                                                                                                                                                                  |
| ---- | ------------------------------------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | JS 有哪些数据类型？                                    | 基础概念        | 1. 基本类型：`string`、`number`、`boolean`、`undefined`、`null`、`symbol`、`bigint` <br> 2. 引用类型：`Object`、`Array`、`Function`、`Date`、`RegExp`、`Map`、`Set` 等        |
| 2    | `typeof` 的返回值有哪些？有何特殊情况？                | 类型判断        | - 基本类型返回对应字符串 <br> - 特殊情况：`typeof null === 'object'`、`typeof [] === 'object'`、`typeof function(){} === 'function'`                                          |
| 3    | `null` 和 `undefined` 的区别？                         | 类型理解        | - `undefined`：声明未赋值 <br> - `null`：有意赋为空 <br> - `typeof null === 'object'` 是历史遗留 bug                                                                          |
| 4    | `==` 与 `===` 的区别？                                 | 类型转换        | - `==` 会进行类型转换 <br> - `===` 严格比较类型和值 <br> - 举例说明 `0 == false`、`null == undefined`                                                                         |
| 5    | 如何判断一个变量是数组？                               | 引用类型判断    | - `Array.isArray(arr)` ✅ 推荐 <br> - `arr instanceof Array` ✅ 可用 <br> - `Object.prototype.toString.call(arr)` 精准                                                        |
| 6    | 如何判断对象是否为空对象？                             | 对象操作        | - `Object.keys(obj).length === 0` <br> - `JSON.stringify(obj) === '{}'`                                                                                                       |
| 7    | 判断 NaN 有哪些方法？                                  | 特殊值          | - `Number.isNaN(value)` ✅ 推荐 <br> - `isNaN(value)` ⚠️ 会先做类型转换 <br> - 举例区分两者差异                                                                               |
| 8    | 如何判断一个变量的类型？                               | 综合判断        | - 基本类型：`typeof` <br> - 引用类型：`instanceof` 或 `Object.prototype.toString.call()`                                                                                      |
| 9    | 数组与对象拷贝方式有哪些？                             | 浅拷贝 / 深拷贝 | - 浅拷贝：`Object.assign()` / `{...obj}` <br> - 深拷贝：`structuredClone(obj)` 或 `JSON.parse(JSON.stringify(obj))` <br> - 注意 JSON 方法对函数、`undefined`、`Symbol` 不适用 |
| 10   | `Symbol` 和 `BigInt` 是什么？                          | ES6+ 新特性     | - `Symbol`：唯一值，常用作对象 key <br> - `BigInt`：超大整数，用 `n` 结尾，如 `10n`                                                                                           |
| 11   | `typeof NaN` 为什么是 `'number'`？                     | 特殊值理解      | - `NaN` 是一种特殊的数字类型，表示“不是有效数值”，属于 number 类型                                                                                                            |
| 12   | `null == undefined` 和 `null === undefined` 分别结果？ | 类型比较        | - `null == undefined` → `true` <br> - `null === undefined` → `false`                                                                                                          |
