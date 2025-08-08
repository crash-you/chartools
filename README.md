# 文字处理工具网站

一个多功能的在线文字处理工具集合，提供字符计数、文本转换、格式化等功能，帮助用户高效处理各种文本需求。

## 项目简介

本项目是一个轻量级的文字处理工具网站，专注于提供简单易用且实用的文本处理功能。网站采用现代化的设计风格，支持中英文双语界面，并具备响应式布局，可在各种设备上流畅使用。

## 功能特性

### 已实现功能
- **字符计数**：实时统计字符、单词、句子数量，分类计数与阅读时间估算
- **文本比较**：对比两段文本，高亮显示差异，支持多种对比选项和文本合并功能

### 计划实现功能
- **文本转换**：大小写转换、简繁体转换、行排序等功能
- **格式化工具**：JSON、XML、HTML、CSS格式化
- **更多工具**将陆续开发中...

## 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **样式框架**：TailwindCSS
- **响应式设计**：适配各种设备屏幕
- **多语言支持**：中英文界面切换
- **无后端依赖**：纯前端实现，所有处理在浏览器端完成
- **Google Analytics**：访问数据统计

## 项目结构

```
/
├── index.html                 # 首页
├── help.html                  # 帮助中心页面
├── en/                        # 英文版网站
│   ├── index.html             # 英文首页
│   ├── help.html              # 英文帮助中心
│   └── tools/                 # 英文工具页面
├── tools/                     # 工具页面
│   ├── text-counter.html      # 字符计数工具
│   └── text-comparison.html   # 文本比较工具
├── css/
│   └── custom.css             # 自定义样式
├── js/
│   ├── main.js                # 主要JavaScript文件
│   ├── navigation.js          # 导航组件功能
│   ├── language.js            # 语言切换功能
│   └── tools/                 # 工具相关功能
├── design.md                  # 设计文档
├── idea.md                    # 功能构想文档
└── README.md                  # 项目说明文档
```

## 使用说明

### 本地运行

1. 克隆本仓库到本地
   ```
   git clone https://github.com/yourusername/text-tools.git
   ```

2. 直接在浏览器中打开 `index.html` 文件，或使用本地服务器运行
   ```
   # 使用Python创建简单的HTTP服务器
   python -m http.server
   
   # 或使用Node.js的http-server
   npx http-server
   ```

3. 访问网站

### 在线使用

访问网站: [文字处理工具网站](https://chartools.art)

## 合规说明

- 已配置 `ads.txt`：`google.com, pub-4770465793767896, DIRECT, f08c47fec0942fa0`
- 新增页面：`about.html`、`privacy.html`、`terms.html`、`contact.html`，并在所有页面页脚提供可访问链接
- 新增 `robots.txt` 与 `sitemap.xml`
- 站点仅使用必要 Cookie，提供简易 Cookie 同意条（`js/cookie-consent.js`）

## SEO 说明（关键点）

- 全站 canonical、hreflang（中/英）
- OG/Twitter 元信息与结构化数据（首页 Website、文章 Article）
- `robots.txt` 与 `sitemap.xml` 已覆盖文章与工具页
- 新增“指南/Guides”原创内容板块以提升内容价值

## 贡献指南

欢迎贡献代码、提出问题或建议。请通过以下方式参与项目：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 开源协议

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 联系方式

- 项目维护者: [crash-liu](1161230385abc@example.com)
- 项目网站: [https://chartools.art](https://chartools.art)

---

© 2025 文字处理工具网站

文字处理工具网站已创建成功
README.md文件已创建完成，包含了项目简介、功能特性、技术栈、目录结构、使用说明和贡献指南等内容。您可以根据实际情况修改以下内容：
GitHub仓库地址
在线网站域名
项目维护者信息
开源协议详情
文件结构清晰，为项目提供了完整的文档支持，有助于其他开发者理解和使用您的文字处理工具网站

## 开发环境设置

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## Stagewise 工具栏集成

本项目已集成 Stagewise 工具栏，可以帮助开发人员更高效地编辑前端代码。

### 安装和使用

1. 首先确保你已安装 Stagewise VSCode 扩展：
   - 通过 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=stagewise.stagewise-vscode-extension) 安装

2. 在 Cursor 编辑器中启用 MCP 支持：
   - Cursor 会提示你启用 Stagewise MCP 服务器
   - 点击"启用"以允许你的 AI 代理调用 Stagewise 提供的 MCP 工具

3. 运行开发服务器：
   ```bash
   npm run dev
   ```

4. 自动设置工具栏（使用 AI 指导）：
   - 在 Cursor 中，按下 CMD + Shift + P
   - 输入 `setupToolbar`
   - 执行命令，工具栏将自动初始化

### 工具栏特点

- 选择任何网页元素并添加注释
- 使用 AI 代理智能编辑前端代码
- 自动将浏览器上下文发送到你的 AI 代理
- 在浏览器中直接对实时元素进行评论

### 自定义配置

Stagewise 工具栏配置位于 `js/stagewise-setup.js` 文件中。你可以根据需要修改以下内容：

- 插件名称和描述
- 为 AI 提示提供的上下文信息
- 自定义工具栏操作

## 技术栈

- HTML5 + CSS3
- JavaScript (ES6+)
- TailwindCSS
- Webpack
- Stagewise 工具栏

## 贡献指南

欢迎贡献代码和功能建议！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 ISC 许可证。