# 技术栈文档

**CharTools - 在线文字处理工具**

---

## 🎯 技术架构概览

CharTools 采用**纯前端架构**，所有文本处理均在用户浏览器本地完成，确保数据隐私和处理速度。

```
┌─────────────────────────────────────────┐
│          用户浏览器（客户端）              │
│                                         │
│  ┌───────────────────────────────┐     │
│  │      HTML5 界面层              │     │
│  │  • 语义化标签                   │     │
│  │  • 响应式布局                   │     │
│  │  • 无障碍设计                   │     │
│  └───────────────────────────────┘     │
│                ↓                        │
│  ┌───────────────────────────────┐     │
│  │      Tailwind CSS 样式层       │     │
│  │  • 实用优先                     │     │
│  │  • 移动优先                     │     │
│  │  • 自定义主题                   │     │
│  └───────────────────────────────┘     │
│                ↓                        │
│  ┌───────────────────────────────┐     │
│  │   JavaScript 逻辑层 (ES6+)     │     │
│  │  • 文本处理算法                 │     │
│  │  • 实时计算                     │     │
│  │  • 事件处理                     │     │
│  └───────────────────────────────┘     │
│                                         │
│  ❌ 无服务器通信                        │
│  ✅ 完全本地处理                        │
│  ✅ 数据不上传                         │
└─────────────────────────────────────────┘
```

---

## 🛠️ 核心技术栈

### 前端框架与语言

#### HTML5
```
版本: HTML5
用途: 页面结构和语义化标签
特点:
  • 使用语义化标签（<section>, <article>, <nav>）
  • Schema.org 结构化数据
  • Open Graph 社交媒体优化
  • 符合 W3C 标准
```

#### CSS3
```
版本: CSS3
框架: Tailwind CSS v3.x
用途: 样式和布局
特点:
  • 实用优先的CSS框架
  • 响应式设计
  • 移动优先策略
  • 自定义配置（tailwind.config.js）
```

#### JavaScript
```
版本: ES6+ (ECMAScript 2015+)
运行环境: 浏览器原生
用途: 交互逻辑和文本处理
特点:
  • 无外部框架依赖（React/Vue等）
  • 模块化代码组织
  • 现代 ES6+ 语法
  • 事件驱动架构
```

---

## 📦 构建工具

### Webpack
```yaml
版本: Webpack 5.x
配置文件: webpack.config.js
主要功能:
  - JavaScript 模块打包
  - 代码分割（code splitting）
  - 资源优化
  - 开发服务器
  
输出文件:
  - main.bundle.js
  - vendors-*.bundle.js
  - 其他动态导入的 chunk
```

### Babel
```yaml
用途: JavaScript 转译
功能:
  - ES6+ 转换为 ES5
  - 确保浏览器兼容性
  - 支持最新 JavaScript 特性
```

### NPM
```yaml
包管理器: npm
配置文件: package.json
主要依赖:
  - webpack
  - webpack-cli
  - @babel/core
  - tailwindcss
  - 其他开发工具
```

---

## 🎨 UI/UX 技术

### Tailwind CSS
```css
优势:
  ✓ 快速开发
  ✓ 一致的设计系统
  ✓ 响应式设计简化
  ✓ 文件大小优化（PurgeCSS）

主要使用的工具类:
  • 布局: flex, grid, container
  • 间距: p-*, m-*, space-*
  • 颜色: bg-*, text-*
  • 响应式: sm:, md:, lg:, xl:
```

### 自定义 CSS
```css
文件: css/custom.css
用途: 
  • Tailwind 无法覆盖的样式
  • 特殊动画效果
  • 自定义组件样式
  • 全局样式调整
```

### 图标
```
来源: 
  • SVG 内联图标
  • Heroicons（Tailwind 官方图标库）
  
优势:
  • 可缩放不失真
  • 易于自定义颜色
  • 文件体积小
  • 无需额外请求
```

---

## 🔧 核心功能实现

### 1. 字符计数工具

```javascript
技术实现:
  • 正则表达式匹配
  • Unicode 字符处理
  • 中英文分词算法
  • 实时事件监听

关键算法:
  - 字符统计: text.length
  - 单词统计: text.split(/\s+/)
  - 中文字符: /[\u4e00-\u9fa5]/g
  - 英文单词: /[a-zA-Z]+/g
  - 句子分割: /[。！？.!?]+/g

性能优化:
  • 防抖处理（debounce）
  • 避免频繁DOM操作
  • 增量计算
```

### 2. 文本转换工具

```javascript
技术实现:
  • 字符串方法（toUpperCase, toLowerCase）
  • 字符映射表（简繁转换）
  • 正则替换
  • Unicode 码点转换

支持的转换:
  - 大写转换: toUpperCase()
  - 小写转换: toLowerCase()
  - 标题格式: 首字母大写算法
  - 简繁转换: 字符映射表
  - 全角半角: Unicode 编码转换
```

### 3. 格式化工具

```javascript
技术实现:
  • JSON.parse() / JSON.stringify()
  • 递归缩进算法
  • 语法高亮（正则着色）
  • 错误处理和验证

支持的格式:
  - JSON: 原生 JSON API
  - XML: DOM Parser
  - HTML: 自定义解析器
  - CSS: 正则表达式处理

缩进选项:
  • 2空格 / 4空格 / Tab
  • 压缩（移除所有空白）
  • 美化（添加适当缩进）
```

### 4. 文本比较工具

```javascript
技术实现:
  • Diff 算法（简化版）
  • 逐行比较
  • 字符级差异检测
  • 高亮渲染

算法流程:
  1. 文本分割成行
  2. 逐行比较
  3. 标记差异类型（添加/删除/修改）
  4. 渲染差异高亮

差异类型:
  • 新增行（绿色）
  • 删除行（红色）
  • 修改行（黄色）
  • 相同行（灰色）
```

---

## 🔒 隐私和安全

### 数据处理原则

```
✅ 完全本地处理
  • 所有计算在浏览器完成
  • JavaScript 在客户端运行
  • 无服务器端处理

✅ 零数据传输
  • 无 AJAX 请求
  • 无表单提交
  • 无第三方API调用
  • 无数据上传

✅ 无数据存储
  • 不使用 Cookie（除必要的同意）
  • 不使用 localStorage（可选功能）
  • 不使用 sessionStorage
  • 页面刷新即清空

✅ 匿名统计
  • Google Analytics（匿名IP）
  • 仅统计访问量
  • 不收集个人信息
```

### 安全措施

```javascript
// XSS 防护
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// 输入验证
function validateInput(input) {
  // 检查输入长度
  if (input.length > MAX_LENGTH) {
    throw new Error('Input too long');
  }
  // 其他验证...
}
```

---

## 📱 响应式设计

### 断点系统

```css
/* Tailwind 默认断点 */
sm:   640px   /* 小屏幕（手机横屏）*/
md:   768px   /* 中等屏幕（平板）*/
lg:   1024px  /* 大屏幕（小桌面）*/
xl:   1280px  /* 超大屏幕（大桌面）*/
2xl:  1536px  /* 超超大屏幕 */

/* 使用示例 */
<div class="
  w-full           /* 移动端全宽 */
  md:w-1/2         /* 平板 50% 宽 */
  lg:w-1/3         /* 桌面 33% 宽 */
">
```

### 移动优先策略

```html
<!-- 从小屏幕开始设计 -->
<div class="
  text-sm          <!-- 移动端小字体 -->
  md:text-base     <!-- 平板正常字体 -->
  lg:text-lg       <!-- 桌面大字体 -->
  p-4              <!-- 移动端小内边距 -->
  md:p-6           <!-- 平板中内边距 -->
  lg:p-8           <!-- 桌面大内边距 -->
">
```

---

## 🌍 多语言支持

### 实现方式

```javascript
// 语言检测
function detectLanguage() {
  // 1. 检查 URL 路径（/en/）
  if (window.location.pathname.startsWith('/en/')) {
    return 'en';
  }
  
  // 2. 检查 localStorage
  const saved = localStorage.getItem('language');
  if (saved) return saved;
  
  // 3. 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? 'zh' : 'en';
}

// 语言切换
function switchLanguage(lang) {
  if (lang === 'en') {
    window.location.href = '/en/';
  } else {
    window.location.href = '/';
  }
}
```

### 文件组织

```
/ (中文版本)
├── index.html
├── about.html
└── tools/
    └── text-counter.html

/en/ (英文版本)
├── index.html
├── about.html
└── tools/
    └── text-counter.html
```

---

## 📊 性能优化

### 加载性能

```
优化措施:
  ✓ Webpack 代码分割
  ✓ 按需加载（动态 import）
  ✓ 资源压缩（minify）
  ✓ 图片优化（SVG 优先）
  ✓ CSS PurgeCSS（移除未使用）
  ✓ Gzip 压缩

结果:
  • 首次加载: < 2秒
  • LCP: < 2.5秒
  • FID: < 100ms
  • CLS: < 0.1
```

### 运行时性能

```javascript
// 防抖优化
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 使用
textarea.addEventListener('input', debounce(function() {
  updateCount(this.value);
}, 300));

// 虚拟滚动（大数据场景）
// 仅渲染可见区域
```

---

## 🔍 SEO 优化

### 技术实现

```html
<!-- 1. 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CharTools",
  "applicationCategory": "UtilitiesApplication",
  ...
}
</script>

<!-- 2. Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- 3. 语言标记 -->
<html lang="zh-CN">
<link rel="alternate" hreflang="en" href="/en/">

<!-- 4. Canonical -->
<link rel="canonical" href="https://chartools.art/">

<!-- 5. Sitemap -->
sitemap.xml - 包含所有页面
robots.txt - 允许索引
```

---

## 🚀 部署架构

### 静态托管

```
托管方式: 静态文件服务器
推荐平台:
  • Vercel
  • Netlify
  • GitHub Pages
  • Cloudflare Pages

优势:
  ✓ 全球 CDN 加速
  ✓ HTTPS 自动配置
  ✓ 零运维成本
  ✓ 高可用性
```

### 构建流程

```bash
# 开发环境
npm run dev
  → Webpack Dev Server
  → 热重载
  → Source Maps

# 生产构建
npm run build
  → Webpack Production Mode
  → 代码压缩
  → 资源优化
  → 输出到 dist/
```

---

## 📈 监控和分析

### Google Analytics

```javascript
// 匿名化配置
gtag('config', 'GA_MEASUREMENT_ID', {
  'anonymize_ip': true,
  'allow_google_signals': false,
  'allow_ad_personalization_signals': false
});

// 事件追踪
gtag('event', 'tool_used', {
  'tool_name': 'text-counter',
  'non_interaction': true
});
```

---

## 🧪 浏览器兼容性

### 支持的浏览器

```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

📱 移动端:
✅ iOS Safari 14+
✅ Chrome Mobile
✅ Firefox Mobile
✅ Samsung Internet
```

### Polyfills

```javascript
// 按需加载 Polyfills
if (!Array.prototype.includes) {
  // Polyfill for older browsers
}
```

---

## 📚 第三方库

### 当前使用

```json
{
  "开发依赖": {
    "webpack": "代码打包",
    "webpack-cli": "命令行工具",
    "@babel/core": "JavaScript 编译",
    "tailwindcss": "CSS 框架"
  },
  "运行时依赖": {
    "无": "纯原生 JavaScript，无运行时依赖"
  }
}
```

---

## 🔮 技术规划

### 短期（1-3个月）
- [ ] Service Worker（PWA支持）
- [ ] 离线功能
- [ ] 更多工具（Markdown编辑器等）

### 中期（3-6个月）
- [ ] TypeScript 重构
- [ ] 自动化测试（Jest）
- [ ] CI/CD 流程

### 长期（6-12个月）
- [ ] 浏览器扩展
- [ ] API 服务（可选）
- [ ] 移动应用（PWA）

---

## 📖 技术文档

### 代码文档
```javascript
/**
 * 计算文本中的字符数量
 * @param {string} text - 要计算的文本
 * @param {Object} options - 选项
 * @param {boolean} options.includeSpaces - 是否包含空格
 * @returns {number} 字符数量
 */
function countCharacters(text, options = {}) {
  // 实现...
}
```

---

## 💡 最佳实践

### 代码组织
```
✓ 模块化设计
✓ 单一职责原则
✓ DRY（Don't Repeat Yourself）
✓ 清晰的命名
✓ 适当的注释
```

### 性能
```
✓ 避免不必要的DOM操作
✓ 使用事件委托
✓ 防抖和节流
✓ 懒加载
✓ 代码分割
```

### 可维护性
```
✓ 一致的代码风格
✓ 完整的文档
✓ 版本控制
✓ 变更日志
✓ 代码审查
```

---

**文档版本**: 1.0  
**更新日期**: 2025年9月30日  
**维护者**: CharTools Team
