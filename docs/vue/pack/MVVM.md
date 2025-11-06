# MVC、MVP、MVVM 区别与前端应用场景

## 一、MVC 模式（Model-View-Controller）

### 1. 概念

MVC 是最早的前后端分层思想，分为：

- **Model（模型）**：负责数据与业务逻辑（如请求接口、数据处理）
- **View（视图）**：负责展示 UI
- **Controller（控制器）**：负责接收用户输入，协调 Model 和 View

### 2. 流程图

用户操作 → Controller → Model（更新数据） → View（刷新显示）

### 3. 特点

- 数据流是**单向的**
- View 与 Model 通过 Controller 间接通信
- 职责清晰，但 Controller 容易过重（逻辑集中）

### 4. 示例（早期前端）

```js
// Controller
button.onclick = () => {
  const data = model.getData();
  view.render(data);
};
```

---

## 二、MVP 模式（Model-View-Presenter）

### 1. 概念

MVP 是对 MVC 的改进：

- **Model**：同 MVC，负责数据逻辑
- **View**：负责展示和用户交互接口（不直接操作数据）
- **Presenter**：作为中间层，负责数据绑定和逻辑处理

### 2. 流程图

View → Presenter → Model
Model → Presenter → View

### 3. 特点

- **双向通信**（Presenter 同时持有 Model 和 View）
- 减轻了 View 的逻辑负担
- Presenter 可单元测试，不依赖 UI

### 4. 示例（前端框架中体现）

```js
// Presenter
class Presenter {
  constructor(view) {
    this.view = view;
  }

  async loadData() {
    const data = await fetch('/api/data').then((r) => r.json());
    this.view.update(data);
  }
}

// View
const view = {
  update(data) {
    document.body.innerHTML = JSON.stringify(data);
  },
};

new Presenter(view).loadData();
```

---

## 三、MVVM 模式（Model-View-ViewModel）

### 1. 概念

MVVM 是前端框架（如 Vue、React）普遍采用的架构：

- **Model**：负责数据（通常为响应式状态）
- **View**：UI 视图层
- **ViewModel**：连接 View 与 Model，通过**数据绑定（Data Binding）**实现同步更新

### 2. 流程图

View ⇄ ViewModel ⇄ Model

### 3. 特点

- 数据与视图**双向绑定**
- 大幅减少 DOM 操作
- 适合复杂交互和组件化开发

### 4. Vue 实际示例

```vue
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const message = ref('Hello MVVM');
</script>
```

> 输入框内容（View）改变会自动更新 `message`（Model），反之亦然。

---

## 四、区别总结表

| 架构模式 | 组成部分                | 数据流向                               | 特点               | 常见场景                            |
| -------- | ----------------------- | -------------------------------------- | ------------------ | ----------------------------------- |
| **MVC**  | Model、View、Controller | 单向（Controller 控制 Model→View）     | 简单、逻辑集中     | 早期前端、后端框架（如 Spring MVC） |
| **MVP**  | Model、View、Presenter  | 双向（Presenter 管理 View 与 Model）   | 分层更清晰，易测试 | Android、桌面应用                   |
| **MVVM** | Model、View、ViewModel  | 双向绑定（View 与 ViewModel 自动同步） | 最符合现代前端开发 | Vue、React、Angular                 |

---

## 五、结语

MVVM 是现代前端框架的主流架构，结合响应式数据流，使开发者能更专注于业务逻辑而非 DOM 操作。  
MVC、MVP 则更适用于理解架构演变与分层思想。
