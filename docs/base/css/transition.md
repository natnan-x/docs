# CSS 中 transition 和 animation 的区别

## 一、核心区别对比表

| 对比项             | `transition`（过渡）                           | `animation`（动画）                                      |
| ------------------ | ---------------------------------------------- | -------------------------------------------------------- |
| **触发方式**       | 需要触发事件（如 `:hover`、类名变化等）        | 可自动播放，不需要触发                                   |
| **是否自动执行**   | ❌ 否，需要状态变化触发                        | ✅ 是，可自动循环播放                                    |
| **定义关键帧**     | 只能定义起点和终点                             | 可定义多个中间关键帧（`@keyframes`）                     |
| **控制粒度**       | 简单过渡（两个状态之间）                       | 可精确控制动画每个阶段                                   |
| **循环播放**       | ❌ 不支持                                      | ✅ 可通过 `animation-iteration-count` 设置循环           |
| **延迟与时长控制** | 有 `transition-delay` 和 `transition-duration` | 有 `animation-delay` 和 `animation-duration`，更灵活     |
| **动画方向控制**   | 无                                             | 可用 `animation-direction`（如 `alternate`）控制往返播放 |
| **性能**           | 较轻量，性能好                                 | 稍重，但功能更强                                         |
| **典型使用场景**   | 按钮 hover、菜单展开、淡入淡出等简单效果       | Banner 动画、loading 动效、复杂序列动画等                |

## 二、代码示例对比

### 1. transition 示例

```css
.box {
  width: 100px;
  height: 100px;
  background: skyblue;
  transition: all 0.5s ease;
}

.box:hover {
  width: 200px;
  background: tomato;
}
```

::: tip 特点

- 需要用户操作（hover）触发
- 只能从初始状态过渡到结束状态
  :::

### 2. animation 示例

```css
.box {
  width: 100px;
  height: 100px;
  background: skyblue;
  animation: moveBox 2s ease-in-out infinite alternate;
}

@keyframes moveBox {
  0% {
    transform: translateX(0);
  }
  50% {
    background: orange;
  }
  100% {
    transform: translateX(200px);
    background: tomato;
  }
}
```

::: tip 特点

- 自动执行，无需触发
- 支持多阶段关键帧
- 可循环往返播放
  :::

### 三、总结记忆口诀

**“transition 看动作，animation 编剧本”**
| 关键点 | 记忆提示 |
| ---------- | -------------- |
| transition | 简单动作，从 A 到 B，靠触发 |
| animation | 完整剧本，多帧控制，自动播放 |
