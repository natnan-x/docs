<!--
 * @Author: NanNan
 * @Date: 2025-11-08 15:05:00
 * @LastEditTime: 2025-11-08 15:30:56
 * @Description:
-->

# TypeScript 的函数类型

### 基本写法

```ts
function hello(txt: string): void {
  console.log('hello ' + txt);
}
```

- 参数类型不写，可推断，如果缺乏足够信息，会推断出 any；
- 返回值类型，通常可以不写，void 代表无返回值；

### 函数的实际参数个数，可以少于指定类型参数个数，不可多于

```ts
let myFunc: (a: number, b: number) => number;
myFunc = (a: number) => a; // 正确
myFunc = (a: number, b: number, c: number) => a + b + c; // 报错
```

### 箭头函数

```ts
const repeat = (str: string, times: number): string => str.repeat(times);
```

### 可选参数

**如果函数的某个参数可以省略，则在参数名后面加问号表示。**

```ts
function f(x?: number) {
  // ...
}

f(); // OK
f(10); // OK
```

**函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。**

```ts
let myFunc: (a?: number, b: number) => number; // 报错
```

### 参数默认值

**TypeScript 函数的参数默认值写法，与 JavaScript 一致。**<br/>
**设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。**

```ts
function createPoint(x: number = 0, y: number = 0): [number, number] {
  return [x, y];
}

createPoint(); // [0, 0]
```
