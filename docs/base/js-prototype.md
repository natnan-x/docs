# 原型链

## 一、什么是原型链（What）

在 JavaScript 里，<b>原型链是对象实现继承的机制</b>。
每个对象都有一个隐藏属性 `[[Prototype]]`（可以通过`__proto__`访问），这个属性指向它的原型对象。<br/>
当我们访问一个对象的属性或方法时，如果对象本身没有，就会沿着这条链向上查找，一直找到 `Object.prototype` 或 `null` 为止。

📘 举个例子：

```js
function Person() {}
const p = new Person();

console.log(p.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

所以原型链是这样的：

```js
p → Person.prototype → Object.prototype → null
```

## 二、为什么要有原型链（Why）

JavaScript 是基于原型的语言，它没有传统类式继承。<br/>
原型链让多个对象共享同一个方法或属性，<b>实现继承和复用</b>。

比如：

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

p1.sayHi(); // Hi, I'm Alice
p2.sayHi(); // Hi, I'm Bob
```

这里 `p1` 和 `p2` 自身没有 `sayHi` 方法，
但它们会通过原型链找到 `Person.prototype.sayHi`，从而实现方法共享。

## 三、原型链是怎么工作的（How）

当你访问 `obj.prop` 时：

1. 先查 `obj` 自身有没有这个属性；
2. 没有的话，就去 `obj.__proto__`（即构造函数的 `prototype`）里找；
3. 如果还没有，就继续往上找 `Object.prototype`；
4. 一直到 `null` 为止，如果都找不到，就返回 `undefined`。

也就是说：

```js
实例对象 → 构造函数.prototype → Object.prototype → null
```

## 四、常见延伸问题

#### 1. `__proto__` 和 `prototype` 的区别

- `prototype` 是构造函数的属性；
- `__proto__` 是实例对象的属性，指向构造函数的 `prototype`。

```js
function Foo() {}
const f = new Foo();

console.log(f.__proto__ === Foo.prototype); // ✅ true
console.log(Foo.prototype.constructor === Foo); // ✅ true
```

#### 2. 如何判断一个对象是否在某个原型链上？

```js
f instanceof Foo; // true
Foo.prototype.isPrototypeOf(f); // true
```

#### 3. 原型链的终点是什么？

```js
Object.prototype.__proto__ === null; // true
```

说明原型链的最顶层就是 `Object.prototype`，再往上就是 `null`。

## 五、总结一句话（面试高分回答）

::: tip 划重点

- 原型链是 JavaScript 实现继承的核心机制。
- 每个对象都有一个 `[[Prototype]]` 指向它的原型对象，
- 当访问属性或方法时，如果对象本身没有，就会沿着原型链向上查找，直到 `Object.prototype` 或 `null` 为止。
- 这样实现了属性和方法的共享与继承。
  :::
