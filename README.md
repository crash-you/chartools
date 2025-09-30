# CharTools - 在线文字处理工具

<div align="center">

![CharTools](https://chartools.art/favicon.svg)

**免费、开源、注重隐私的在线文本处理工具集合**

[🌐 访问网站](https://chartools.art) | [📖 使用文档](https://chartools.art/help.html) | [🐛 报告问题](https://github.com/crash-you/chartools/issues) | [🇺🇸 English](https://chartools.art/en/)

</div>

---

## ✨ 项目简介

CharTools 是一个完全免费的在线文本处理工具集合，专为开发者、内容创作者和数据分析人员设计。所有工具采用纯前端技术，在浏览器本地处理数据，确保您的隐私安全。

### 🎯 核心特点

- **🔒 隐私优先** - 100%本地处理，数据永不上传服务器
- **⚡ 即时响应** - 纯前端架构，处理速度极快
- **🆓 完全免费** - 所有功能免费使用，无需注册
- **📱 响应式设计** - 完美适配桌面、平板和移动设备
- **🌍 多语言支持** - 提供中文和英文界面
- **🔓 开源透明** - 代码开源，欢迎查看和贡献

---

## 🛠️ 功能列表

### 1. 字符计数工具
- ✅ 实时统计字符、单词、句子、段落数量
- ✅ 中英文混合计数准确
- ✅ 阅读时间估算
- ✅ 字符类型分类统计

### 2. 文本转换工具
- ✅ 大小写转换（大写、小写、标题格式）
- ✅ 简繁体中文转换
- ✅ 全角半角转换
- ✅ 空白字符处理
- ✅ 行首行尾空格清理

### 3. 格式化工具
- ✅ JSON 格式化和压缩
- ✅ XML 格式化和压缩
- ✅ HTML 格式化和压缩
- ✅ CSS 格式化和压缩
- ✅ 语法高亮显示

### 4. 文本比较工具
- ✅ 智能差异对比
- ✅ 高亮显示差异部分
- ✅ 行级和字符级对比
- ✅ 忽略大小写/空白选项
- ✅ 导出对比结果

---

## 🚀 技术栈

### 前端技术
- **HTML5** - 语义化标签
- **CSS3** - 现代样式
- **JavaScript (ES6+)** - 纯原生JavaScript，无框架依赖
- **Tailwind CSS** - 响应式设计框架

### 工具和库
- **Webpack** - 模块打包
- **Babel** - JavaScript编译
- **Google Analytics** - 匿名访问统计

### 特色技术
- **纯前端架构** - 所有处理在浏览器完成
- **无服务器依赖** - 支持离线使用
- **PWA 特性** - 渐进式Web应用
- **SEO 优化** - Schema.org结构化数据

---

## 📦 项目结构

```
chartools/
├── index.html              # 主页
├── about.html              # 关于页面
├── contact.html            # 联系页面
├── help.html               # 帮助文档
├── privacy.html            # 隐私政策
├── terms.html              # 使用条款
├── css/
│   └── custom.css         # 自定义样式
├── js/
│   ├── main.js            # 主要脚本
│   ├── navigation.js      # 导航脚本
│   ├── language.js        # 语言切换
│   └── tools/             # 工具脚本
│       ├── text-counter.js
│       ├── text-conversion.js
│       ├── formatting.js
│       └── text-comparison.js
├── tools/                 # 工具页面
│   ├── text-counter.html
│   ├── text-conversion.html
│   ├── formatting.html
│   └── text-comparison.html
├── blog/                  # 博客文章
├── articles/              # 使用指南
├── en/                    # 英文版本
└── package.json           # 项目配置
```

---

## 🌐 本地运行

### 方式一：直接打开（推荐）
```bash
# 克隆仓库
git clone https://github.com/crash-you/chartools.git

# 进入目录
cd chartools

# 用浏览器打开 index.html
# 或使用简单的HTTP服务器
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 方式二：使用 Webpack
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是：

- 🐛 报告Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🌍 翻译成其他语言

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细的贡献流程。

### 快速开始贡献

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

---

## 📄 开源许可

本项目采用 **MIT License** 开源许可证。

这意味着您可以：
- ✅ 自由使用
- ✅ 自由修改
- ✅ 自由分发
- ✅ 用于商业用途

详见 [LICENSE](LICENSE) 文件。

---

## 🔗 相关链接

- **官方网站**: https://chartools.art
- **GitHub**: https://github.com/crash-you/chartools
- **问题反馈**: https://github.com/crash-you/chartools/issues
- **隐私政策**: https://chartools.art/privacy.html
- **使用条款**: https://chartools.art/terms.html

---

## 📧 联系我们

- **邮箱**: a1161230385@163.com
- **GitHub Issues**: [提交问题](https://github.com/crash-you/chartools/issues)

---

## 🌟 支持项目

如果这个项目对您有帮助，请给我们一个 ⭐️ Star！

您的支持是我们持续改进的动力！

---

## 📊 项目状态

- ✅ 正在积极维护
- ✅ 欢迎贡献
- ✅ 定期更新

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

特别感谢：
- [Tailwind CSS](https://tailwindcss.com/) - 优秀的CSS框架
- [Google Fonts](https://fonts.google.com/) - 免费字体资源
- 所有提出建议和反馈的用户

---

<div align="center">

**使用愉快！**

Made with ❤️ by CharTools Team

</div>