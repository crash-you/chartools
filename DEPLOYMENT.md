# 部署指南

**CharTools - 在线文字处理工具**

---

## 📋 部署概述

CharTools 是一个**纯静态网站**，无需服务器端处理，可以部署到任何静态文件托管服务。

---

## 🚀 快速部署

### 方式一：Vercel（推荐）⭐

#### 1. 准备工作
```bash
# 确保代码已推送到 GitHub
git push origin main
```

#### 2. 导入项目
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库 `crash-you/chartools`
4. 配置构建设置

#### 3. 构建配置
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 4. 环境变量（可选）
```
无需配置环境变量
```

#### 5. 部署
- 点击 "Deploy"
- 等待构建完成（约1-2分钟）
- 获取部署URL

#### 6. 自定义域名
1. 在 Vercel 项目设置中
2. 添加自定义域名：`chartools.art`
3. 配置 DNS 记录
4. 等待 SSL 证书自动配置

---

### 方式二：Netlify

#### 1. 连接仓库
```bash
# 推送到 GitHub
git push origin main
```

#### 2. 在 Netlify 创建站点
1. 访问 [netlify.com](https://netlify.com)
2. "New site from Git"
3. 选择 GitHub 仓库

#### 3. 构建设置
```
Build command: npm run build
Publish directory: dist
```

#### 4. 部署设置
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 方式三：GitHub Pages

#### 1. 创建 GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install and Build
        run: |
          npm install
          npm run build
      
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: dist
```

#### 2. 启用 GitHub Pages
1. 仓库 Settings
2. Pages
3. Source: gh-pages branch
4. Save

---

### 方式四：Cloudflare Pages

#### 1. 连接 Git
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pages > Create a project
3. Connect to Git

#### 2. 构建配置
```
Production branch: main
Build command: npm run build
Build output directory: /dist
```

#### 3. 环境变量
```
NODE_VERSION: 16
```

---

## 🔧 构建前准备

### 1. 检查依赖
```bash
npm install
```

### 2. 本地测试
```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npx http-server dist
```

### 3. 验证构建输出
```bash
# 检查 dist 目录
ls -la dist/

# 应该包含:
# - index.html
# - 所有工具页面
# - CSS 文件
# - JavaScript 文件
# - 静态资源
```

---

## 📁 文件结构（部署后）

```
部署目录/
├── index.html
├── about.html
├── contact.html
├── help.html
├── privacy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon.svg
├── ads.txt
├── css/
│   └── custom.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── language.js
│   └── tools/
│       ├── text-counter.js
│       ├── text-conversion.js
│       ├── formatting.js
│       └── text-comparison.js
├── dist/
│   ├── main.bundle.js
│   └── vendors-*.bundle.js
├── tools/
│   ├── text-counter.html
│   ├── text-conversion.html
│   ├── formatting.html
│   └── text-comparison.html
├── blog/
│   └── *.html
├── articles/
│   └── *.html
├── en/
│   └── (所有英文页面)
└── img/
    └── (图片资源)
```

---

## 🌐 DNS 配置

### 自定义域名设置

#### A 记录（指向服务器IP）
```
类型: A
名称: @
值: [服务器IP]
TTL: 自动
```

#### CNAME 记录（指向CDN）
```
类型: CNAME
名称: www
值: [CDN地址]
TTL: 自动
```

#### Vercel DNS 配置
```
类型: A
名称: @
值: 76.76.21.21

类型: CNAME
名称: www
值: cname.vercel-dns.com
```

---

## 🔒 HTTPS 配置

### 自动 SSL（推荐）
```
✓ Vercel - 自动配置
✓ Netlify - 自动配置
✓ Cloudflare - 自动配置
```

### Let's Encrypt（手动）
```bash
# 使用 Certbot
sudo certbot --nginx -d chartools.art -d www.chartools.art
```

---

## ⚙️ 环境配置

### package.json 脚本
```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "echo \"No tests yet\"",
    "lint": "eslint js/"
  }
}
```

### webpack.config.js（参考）
```javascript
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './js/main.js',
    // 其他入口...
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors'
    }
  }
};
```

---

## 📊 性能优化

### 1. 资源压缩
```bash
# Gzip 压缩
gzip -9 -k dist/*.js
gzip -9 -k dist/*.css

# Brotli 压缩
brotli -q 11 dist/*.js
brotli -q 11 dist/*.css
```

### 2. 缓存策略
```nginx
# Nginx 配置
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN 加速
```
推荐 CDN:
  • Cloudflare (免费)
  • Vercel Edge Network
  • Netlify CDN
```

---

## 🧪 部署前检查

### 检查清单
```
□ 所有链接正常工作
□ 所有工具功能正常
□ 移动端显示正常
□ 无 JavaScript 错误
□ 无 CSS 样式问题
□ 图片正常加载
□ 多语言切换正常
□ SEO 标签完整
□ Schema.org 数据正确
□ sitemap.xml 可访问
□ robots.txt 配置正确
□ 404 页面正常
□ HTTPS 配置成功
```

---

## 🚨 常见问题

### 1. 404 错误
```
问题: 刷新页面显示 404
解决: 配置服务器重定向到 index.html

# Netlify
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Vercel
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 2. 构建失败
```bash
# 清除缓存重新构建
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. 资源加载失败
```
问题: CSS/JS 无法加载
检查: 
  1. 路径是否正确（绝对路径 vs 相对路径）
  2. 文件是否存在于 dist 目录
  3. 构建是否成功
```

---

## 📈 监控和维护

### 1. 部署监控
```bash
# Vercel CLI
vercel --prod

# 查看部署日志
vercel logs
```

### 2. 性能监控
```
工具:
  • Google PageSpeed Insights
  • Lighthouse
  • WebPageTest
  • GTmetrix
```

### 3. 错误追踪（可选）
```javascript
// Sentry 集成
// 用于追踪生产环境错误
```

---

## 🔄 持续部署

### Git 工作流
```bash
# 1. 开发
git checkout -b feature/new-tool
# 开发新功能...
git commit -m "feat: 添加新工具"

# 2. 合并到主分支
git checkout main
git merge feature/new-tool

# 3. 推送触发自动部署
git push origin main
# → 自动部署到生产环境
```

### 部署流程
```
代码推送
  ↓
GitHub 仓库更新
  ↓
触发 Webhook
  ↓
构建服务器
  ↓
npm install
  ↓
npm run build
  ↓
部署到 CDN
  ↓
完成 ✅
```

---

## 🎯 生产环境最佳实践

### 1. 版本控制
```bash
# 使用 Git 标签标记版本
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

### 2. 环境分离
```
开发环境: dev.chartools.art
预发布环境: staging.chartools.art
生产环境: chartools.art
```

### 3. 回滚策略
```bash
# Vercel 回滚到上一个版本
vercel rollback

# Git 回滚
git revert HEAD
git push origin main
```

---

## 📝 部署记录

### 部署日志模板
```
部署日期: 2025-09-30
部署者: [你的名字]
版本: v1.0.0
变更内容:
  - 初始版本发布
  - 包含所有核心工具
构建时间: 1分32秒
部署状态: ✅ 成功
访问地址: https://chartools.art
```

---

## 🆘 获取帮助

### 文档资源
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)
- [GitHub Pages 文档](https://docs.github.com/pages)

### 联系支持
- GitHub Issues: https://github.com/crash-you/chartools/issues
- Email: a1161230385@163.com

---

**祝部署顺利！** 🚀

**文档版本**: 1.0  
**更新日期**: 2025年9月30日
