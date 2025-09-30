# 贡献指南

感谢您对 CharTools 项目的关注！我们欢迎并感谢所有形式的贡献。

---

## 🌟 如何贡献

### 贡献方式

您可以通过以下方式为项目做出贡献：

1. **🐛 报告 Bug**
   - 发现问题？请告诉我们！
   - 在 [Issues](https://github.com/crash-you/chartools/issues) 中详细描述问题

2. **💡 提出新功能**
   - 有好的想法？我们很乐意听！
   - 在 Issues 中描述您的建议

3. **📝 改进文档**
   - 发现文档错误或不清楚的地方？
   - 提交 PR 帮助改进

4. **🔧 提交代码**
   - 修复 Bug
   - 实现新功能
   - 优化性能

5. **🌍 翻译**
   - 帮助我们支持更多语言
   - 改进现有翻译

---

## 🚀 快速开始

### 1. Fork 项目

点击页面右上角的 "Fork" 按钮，将项目 Fork 到您的账号下。

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/chartools.git
cd chartools
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

分支命名建议：
- 新功能：`feature/功能名称`
- Bug修复：`fix/问题描述`
- 文档更新：`docs/更新内容`
- 性能优化：`perf/优化内容`

### 4. 进行修改

- 编写清晰、可维护的代码
- 遵循项目的代码风格
- 添加必要的注释

### 5. 测试您的修改

确保：
- ✅ 所有工具正常运行
- ✅ 没有JavaScript错误
- ✅ 在不同浏览器中测试
- ✅ 移动端显示正常

### 6. 提交修改

```bash
git add .
git commit -m "简洁明了的提交信息"
```

提交信息格式建议：
```
类型: 简短描述

详细描述（可选）

相关 Issue: #123
```

类型可以是：
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

### 7. 推送到 GitHub

```bash
git push origin feature/your-feature-name
```

### 8. 创建 Pull Request

1. 访问您 Fork 的仓库
2. 点击 "New Pull Request"
3. 填写 PR 标题和描述
4. 等待审核

---

## 📋 Pull Request 指南

### PR 标题

清晰描述您的改动，例如：
- `feat: 添加文本加密功能`
- `fix: 修复字符计数在特殊字符时的错误`
- `docs: 更新 README 中的安装说明`

### PR 描述

请包含：

```markdown
## 改动描述
简要描述您做了什么改动

## 改动类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 相关 Issue
关闭 #123

## 测试
描述您如何测试这些改动

## 截图（如适用）
添加相关截图

## 检查清单
- [ ] 代码遵循项目风格
- [ ] 已进行自我审查
- [ ] 添加了必要的注释
- [ ] 更新了相关文档
- [ ] 没有产生新的警告
- [ ] 已测试改动
```

---

## 💻 代码规范

### JavaScript 规范

```javascript
// ✅ 好的示例
function calculateWordCount(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  
  const words = text.trim().split(/\s+/);
  return words.filter(word => word.length > 0).length;
}

// ❌ 避免
function calc(t) {
  return t.split(' ').length;
}
```

**要点**：
- 使用有意义的变量名
- 添加必要的错误处理
- 保持函数简洁（一个函数做一件事）
- 添加注释说明复杂逻辑

### HTML 规范

```html
<!-- ✅ 好的示例 -->
<div class="container mx-auto max-w-7xl px-4">
  <h1 class="text-2xl font-bold mb-4">标题</h1>
  <p class="text-gray-700">内容</p>
</div>

<!-- ❌ 避免 -->
<div class="container mx-auto max-w-7xl px-4"><h1 class="text-2xl font-bold mb-4">标题</h1><p class="text-gray-700">内容</p></div>
```

**要点**：
- 使用语义化标签
- 保持适当缩进
- 使用 Tailwind CSS 类名
- 确保无障碍访问（添加 alt、aria 属性）

### CSS 规范

```css
/* ✅ 好的示例 */
.custom-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: #2563eb;
}

/* ❌ 避免 */
.btn{padding:8px 16px;border-radius:6px;}
```

**要点**：
- 优先使用 Tailwind CSS
- 自定义样式放在 `css/custom.css`
- 使用清晰的类名
- 添加必要的注释

---

## 🐛 报告 Bug

### 好的 Bug 报告应该包含：

1. **清晰的标题**
   - 例如：`[Bug] 字符计数工具在处理emoji时结果不准确`

2. **问题描述**
   - 发生了什么？
   - 预期应该是什么？

3. **复现步骤**
   ```
   1. 打开字符计数工具
   2. 输入包含 emoji 的文本
   3. 查看计数结果
   ```

4. **环境信息**
   - 浏览器：Chrome 120
   - 操作系统：Windows 11
   - 设备：桌面

5. **截图或录屏**（如果可能）

6. **相关代码或错误信息**

---

## 💡 提出新功能

### 好的功能建议应该包含：

1. **功能描述**
   - 清晰描述这个功能是什么

2. **使用场景**
   - 谁会用到这个功能？
   - 解决什么问题？

3. **实现建议**（可选）
   - 您认为应该如何实现？

4. **相关示例**（可选）
   - 其他网站的类似功能

---

## ✅ 审核流程

1. **提交 PR**
   - 您提交 Pull Request

2. **自动检查**
   - 代码格式检查
   - 构建测试

3. **人工审核**
   - 维护者审查代码
   - 可能提出修改建议

4. **修改和讨论**
   - 根据反馈进行调整
   - 与维护者讨论

5. **合并**
   - 审核通过后合并到主分支

---

## 🎯 优先级

我们特别欢迎以下类型的贡献：

### 高优先级
- 🐛 Bug 修复
- 🔒 安全问题修复
- 📝 文档改进
- ♿ 无障碍性改进

### 中优先级
- ✨ 新工具功能
- 🎨 UI/UX 改进
- ⚡ 性能优化
- 🌍 国际化/翻译

### 低优先级
- 🎁 新的附加功能
- 🔧 代码重构
- 📊 分析和统计

---

## 📜 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- ✅ 尊重不同观点和经验
- ✅ 接受建设性批评
- ✅ 关注对社区最有利的事
- ✅ 对其他社区成员保持同理心

### 不可接受的行为

- ❌ 使用性别化语言或图像
- ❌ 人身攻击或侮辱性评论
- ❌ 骚扰行为
- ❌ 发布他人的私人信息
- ❌ 其他不道德或不专业的行为

---

## 💬 交流渠道

- **GitHub Issues**: 用于 Bug 报告和功能建议
- **Pull Requests**: 用于代码贡献
- **Email**: a1161230385@163.com

---

## 🙏 感谢

感谢您花时间为 CharTools 做出贡献！

每一个贡献，无论大小，都让这个项目变得更好。

---

## 📚 更多资源

- [README](README.md) - 项目概述
- [LICENSE](LICENSE) - 开源许可
- [Issues](https://github.com/crash-you/chartools/issues) - 问题列表
- [Pull Requests](https://github.com/crash-you/chartools/pulls) - PR列表

---

<div align="center">

**期待您的贡献！** 🎉

</div>
