# 常用的 HTML Meta 标签

**定义：**
HTML Meta 标签是放在 `<head>` 中的标签，用于提供页面元信息（metadata），包括页面描述、关键词、编码方式、视口设置等。

## 一、常用 Meta 标签分类

### 1. 编码与兼容性

- **charset**: 设置文档字符编码，确保页面文字正确显示。

  ```html
  <meta charset="UTF-8" />
  ```

- **http-equiv="X-UA-Compatible"**: 指定 IE 浏览器兼容模式。

  ```html
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  ```

### 2. 页面信息与 SEO

- **name="description"**: 页面描述，搜索引擎摘要显示内容。

  ```html
  <meta
    name="description"
    content="前端开发学习笔记，涵盖HTML、CSS、JS等知识点。"
  />
  ```

- **name="keywords"**: 页面关键词，用于 SEO（可选，权重低）。

  ```html
  <meta name="keywords" content="HTML, CSS, JavaScript, 前端" />
  ```

- **name="author"**: 页面作者信息。

  ```html
  <meta name="author" content="natnan" />
  ```

- **name="robots"**: 搜索引擎抓取规则。

  ```html
  <meta name="robots" content="index, follow" />
  ```

### 3. 响应式与刷新

- **name="viewport"**: 用于移动端响应式布局。

  - content 常用属性说明：

    - `width=device-width`：宽度等于设备屏幕宽度。
    - `initial-scale=1.0`：初始缩放比例。
    - `maximum-scale=1.0`：最大缩放比例。
    - `user-scalable=no`：禁止用户缩放。

  ```html
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  ```

- **http-equiv="refresh"**: 页面自动刷新或跳转。

  ```html
  <meta http-equiv="refresh" content="5;url=https://example.com" />
  ```

## 二、完整示例

```html
<head>
  <!-- 编码与兼容性 -->
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <!-- 页面信息与 SEO -->
  <meta
    name="description"
    content="前端开发学习笔记，涵盖HTML、CSS、JS等知识点。"
  />
  <meta name="keywords" content="HTML, CSS, JavaScript, 前端" />
  <meta name="author" content="natnan" />
  <meta name="robots" content="index, follow" />

  <!-- 响应式与刷新 -->
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <meta http-equiv="refresh" content="5;url=https://example.com" />
</head>
```

## 三、总结（面试高频一句话）

> HTML Meta 标签用于提供页面编码、SEO 信息、响应式布局和刷新控制等元信息，是网页开发和优化的重要工具。
