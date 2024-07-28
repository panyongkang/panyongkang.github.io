title: Web网页优化笔记
author: PanXiaoKang
tags:

  - 网页加载
  - 性能优化
  - 兼容适配
categories:
  - 前端技术
date: 2024-07-26 23:07:25

---

记录给前端网页美化、性能加载优化等一系列整理内容，分享给对生活有追求的伙伴们~~~

渠道推荐：

[Codepen在线案例](https://codepen.io/ "大量案例参考")

---

## 优化JS加载性能

在HTML页面中引入一些JavaScript代码时，可以采取以下几个步骤提高加载的性能：

### **将JavaScript代码放在页面底部**

* 最简单直接的方法，只需移动脚本标签的位置。
* 优点：非常简单，立即见效。
* 实现方法：将 `<script>`标签放在 `</body>`标签之前。

```html
<body>
    <h1>Click anywhere to see the effect!</h1>
    <!-- 在这里放置页面内容 -->
    <!-- 在页面底部引入JavaScript代码 -->
    <script>
        // 你的JavaScript代码
    </script>
</body>

```

### **使用外部JavaScript文件**

* 将JavaScript代码放在外部文件中，并使用 `<script src="path/to/your/script.js"></script>`引入。
* 优点：利用浏览器缓存机制，减少重复加载，提高性能。
* 实现方法：创建一个 `script.js`文件，并在HTML中引入。

```html
<body>
    <h1>Click anywhere to see the effect!</h1>
    <!-- 在这里放置页面内容 -->
    <!-- 在页面底部引入外部JavaScript文件 -->
    <script src="path/to/your/script.js"></script>
</body>

```

### **异步和延迟加载**

* 使用 `async`或 `defer`属性来加载JavaScript文件。
* 优点：允许HTML继续解析，提高页面加载速度。
* 实现方法：在引入外部JavaScript文件时添加 `async`或 `defer`属性。

```html
<body>
    <h1>Click anywhere to see the effect!</h1>
    <!-- 在这里放置页面内容 -->
    <!-- 使用defer属性引入外部JavaScript文件 -->
    <script src="path/to/your/script.js" defer></script>
</body>

```

### **压缩和混淆代码**

* 使用工具（如UglifyJS、Terser）将JavaScript代码压缩和混淆。
* 优点：减少文件大小，加快加载速度。
* 实现方法：使用工具压缩代码并生成新的JavaScript文件。

```html
<body>
    <h1>Click anywhere to see the effect!</h1>
    <!-- 在这里放置页面内容 -->
    <!-- 使用压缩后的外部JavaScript文件 -->
    <script src="path/to/your/script.min.js" defer></script>
</body>

```

### **合并和优化资源**

* 将多个JavaScript文件合并为一个文件，减少HTTP请求数。
* 优点：减少请求数量，进一步提高性能。
* 实现方法：使用工具（如Webpack、Gulp）合并和优化资源。

```html
<body>
    <h1>Click anywhere to see the effect!</h1>
    <!-- 在这里放置页面内容 -->
    <!-- 使用合并后的外部JavaScript文件 -->
    <script src="path/to/your/bundle.js" defer></script>
</body>

```

### 排序总结

1. **将JavaScript代码放在页面底部** ：简单直接，立即见效。
2. **使用外部JavaScript文件** ：稍微复杂一点，但效果明显。
3. **异步和延迟加载** ：需要一点点额外的HTML修改，效果很好。
4. **压缩和混淆代码** ：需要使用工具处理代码，适合进一步优化。
5. **合并和优化资源** ：最复杂，但也是效果最好的优化方法之一，适合大型项目。

可以根据实际情况和项目需求，从最简单的方法开始逐步优化。

## 性能优化策略

前端性能优化是指通过各种技术和策略来提升Web应用的加载速度、响应时间和用户体验。前端性能优化涉及多个方面，以下是其中一些主要的方向：

### 1. **资源优化**

* **压缩与最小化** ：压缩HTML、CSS、JavaScript文件以减小文件大小。
* **图片优化** ：使用适当的图片格式（如WebP）、压缩图片文件、懒加载图片。
* **字体优化** ：使用系统字体或者Web字体时考虑加载策略。

### 2. **缓存策略**

* **HTTP缓存** ：设置合适的缓存头（如 `Cache-Control`），利用浏览器缓存减少请求。
* **Service Worker** ：使用Service Worker实现离线缓存和背景同步等功能。

### 3. **减少HTTP请求数**

* **合并文件** ：将多个CSS或JavaScript文件合并成一个文件。
* **雪碧图** ：将多个小图标合并到一张图片上，减少图片请求次数。

### 4. **异步加载**

* **按需加载** ：使用懒加载（Lazy Loading）技术，仅在需要时加载资源。
* **动态导入** ：使用ES6的 `import()`函数动态加载模块。

### 5. **代码拆分**

* **代码分割** ：通过Webpack等打包工具将代码分割成多个较小的包，按需加载。
* **路由级代码分割** ：在单页应用中，根据路由动态加载对应的组件。

### 6. **预加载和预获取**

* **`<link rel="preload">`** ：提前加载关键资源，如CSS文件。
* **`<link rel="prefetch">`** ：预先获取可能需要的资源，如后续页面的内容。

### 7. **DOM操作优化**

* **减少DOM访问** ：减少直接对DOM的操作，可以使用变量存储DOM元素引用。
* **批量更新** ：使用 `requestAnimationFrame`或 `MutationObserver`来减少页面重绘和回流。

### 8. **减少重绘和回流**

* **使用CSS动画代替JS动画** ：CSS动画比JavaScript动画更加高效。
* **避免昂贵的样式计算** ：例如，避免在循环中使用 `offsetWidth`或 `offsetHeight`。

### 9. **服务器端优化**

* **CDN使用** ：利用内容分发网络加速静态资源的加载。
* **服务器性能优化** ：优化服务器配置，如使用HTTP/2协议。

### 10. **首屏加载优化**

* **Critical CSS** ：提取关键CSS，内联至HTML头部，确保首屏快速渲染。
* **预渲染** ：使用SSR（Server-Side Rendering）或预渲染技术来提高首屏加载速度。

### 11. **性能监控**

* **性能分析工具** ：使用Chrome DevTools等工具来分析性能瓶颈。
* **持续性能监控** ：部署性能监控工具来持续跟踪应用的性能表现。

### 12. **用户体验优化**

* **交互延迟** ：优化JavaScript执行，减少CPU负担，提高用户交互体验。
* **视觉优先** ：确保重要的视觉元素先加载，给用户即时的反馈。

### 实施步骤

* **评估** ：使用工具如Lighthouse来评估网站的性能。
* **优先级排序** ：根据性能报告确定优化的优先级。
* **逐步优化** ：针对问题逐一解决。
* **持续监测** ：定期检查性能指标，确保优化效果。

通过上述方法和技术，可以显著改善前端应用的性能，提高用户体验。需要注意的是，每种优化措施都有其适用场景，应该根据具体项目的需求和限制来选择最适合的方案。
