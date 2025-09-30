# Git 提交指南

**CharTools 项目 Git 操作完整指南**

---

## 🎯 立即执行：首次提交

### 第一步：检查 Git 状态

```bash
# 进入项目目录
cd F:\xm\AI\outsea\toolsWords

# 查看当前状态
git status
```

你应该看到以下新文件：
```
Untracked files:
  README.md
  LICENSE
  CONTRIBUTING.md
  .gitignore
  TECH_STACK.md
  DEPLOYMENT.md
  GIT_COMMIT_GUIDE.md
  FINAL_CHECKLIST.md
  ... (其他审查文档)
```

---

### 第二步：添加文件

```bash
# 方式一：添加核心文档（推荐）
git add README.md
git add LICENSE
git add CONTRIBUTING.md
git add .gitignore

# 方式二：添加所有新文件
git add .

# 查看暂存区
git status
```

---

### 第三步：提交变更

```bash
# 提交核心文档
git commit -m "docs: 添加完整的项目文档

- 添加 README.md（项目介绍、功能列表、技术栈）
- 添加 LICENSE（MIT 许可证）
- 添加 CONTRIBUTING.md（贡献指南）
- 添加 .gitignore（Git 忽略配置）
- 添加 TECH_STACK.md（技术栈详细文档）
- 添加 DEPLOYMENT.md（部署指南）

完善 GitHub 仓库规范，提升项目专业性，为 Google Ads 审核做准备。"
```

---

### 第四步：推送到 GitHub

```bash
# 推送到远程仓库
git push origin main

# 如果遇到错误，可能需要先拉取
git pull origin main --rebase
git push origin main
```

---

## 📚 Commit Message 规范

### 格式
```
<类型>: <简短描述>

<详细描述>（可选）

<相关 Issue>（可选）
```

### 类型（Type）

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加文本加密工具` |
| `fix` | Bug修复 | `fix: 修复字符计数emoji问题` |
| `docs` | 文档更新 | `docs: 更新 README 使用说明` |
| `style` | 代码格式 | `style: 调整按钮样式` |
| `refactor` | 重构 | `refactor: 优化文本处理逻辑` |
| `perf` | 性能优化 | `perf: 优化大文本处理速度` |
| `test` | 测试 | `test: 添加字符计数单元测试` |
| `chore` | 构建/工具 | `chore: 更新 webpack 配置` |
| `ci` | CI/CD | `ci: 添加自动部署流程` |
| `build` | 构建系统 | `build: 升级依赖版本` |

---

## ✅ 好的 Commit 示例

### 示例 1: 新功能
```bash
git commit -m "feat: 添加 Markdown 编辑器工具

实现功能:
- 实时预览
- 语法高亮
- 导出功能
- 支持常用 Markdown 语法

相关 Issue: #12"
```

### 示例 2: Bug 修复
```bash
git commit -m "fix: 修复 JSON 格式化缩进问题

问题: 4 空格缩进时显示不正确
原因: 正则表达式匹配错误
解决: 更新缩进算法

Fixes #15"
```

### 示例 3: 文档更新
```bash
git commit -m "docs: 完善 API 使用文档

- 添加代码示例
- 补充参数说明
- 更新常见问题"
```

### 示例 4: 性能优化
```bash
git commit -m "perf: 优化大文本处理性能

- 使用 Web Worker 处理大文本
- 添加进度提示
- 减少 DOM 操作

性能提升: 处理 1MB 文本从 5s 降至 1s"
```

---

## ❌ 避免的 Commit

```bash
# ❌ 不好的示例
git commit -m "更新"
git commit -m "修改了一些东西"
git commit -m "fix bug"
git commit -m "123"
git commit -m "临时保存"

# ✅ 应该改为
git commit -m "fix: 修复文本比较工具空白字符处理问题"
git commit -m "feat: 添加繁简转换功能"
git commit -m "docs: 更新安装文档"
```

---

## 🔄 常用 Git 操作

### 查看状态
```bash
# 查看当前状态
git status

# 查看简短状态
git status -s

# 查看分支
git branch
```

### 查看历史
```bash
# 查看提交历史
git log

# 查看简洁历史
git log --oneline

# 查看最近 5 条
git log -5

# 查看图形化历史
git log --graph --oneline
```

### 查看差异
```bash
# 查看未暂存的修改
git diff

# 查看已暂存的修改
git diff --staged

# 查看特定文件的修改
git diff README.md
```

### 撤销操作
```bash
# 撤销工作区的修改
git checkout -- <file>

# 撤销暂存区的文件
git reset HEAD <file>

# 修改最后一次提交
git commit --amend

# 回退到上一个提交（保留修改）
git reset --soft HEAD^

# 回退到上一个提交（丢弃修改）
git reset --hard HEAD^
```

---

## 🌿 分支管理

### 创建和切换分支
```bash
# 创建新分支
git branch feature/new-tool

# 切换到分支
git checkout feature/new-tool

# 创建并切换（推荐）
git checkout -b feature/new-tool
```

### 合并分支
```bash
# 切换到主分支
git checkout main

# 合并功能分支
git merge feature/new-tool

# 删除已合并的分支
git branch -d feature/new-tool
```

### 分支命名规范
```
feature/功能名     - 新功能
fix/问题描述       - Bug修复
docs/文档名        - 文档更新
refactor/模块名    - 重构
perf/优化内容      - 性能优化

示例:
feature/markdown-editor
fix/json-formatter-indent
docs/api-reference
refactor/text-counter
perf/large-file-processing
```

---

## 📦 工作流程

### 开发新功能
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发功能
# ... 编码 ...

# 3. 提交变更
git add .
git commit -m "feat: 添加新功能"

# 4. 推送分支
git push origin feature/new-feature

# 5. 创建 Pull Request（在 GitHub）

# 6. 合并后删除分支
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### 修复 Bug
```bash
# 1. 创建修复分支
git checkout -b fix/bug-description

# 2. 修复 Bug
# ... 修改代码 ...

# 3. 提交修复
git add .
git commit -m "fix: 修复XXX问题"

# 4. 合并到主分支
git checkout main
git merge fix/bug-description
git push origin main
```

---

## 🚀 持续开发建议

### 每周任务
```bash
# 周一-周五：小改进
git commit -m "fix: 优化XX功能的用户体验"
git commit -m "style: 调整移动端布局"
git commit -m "docs: 更新帮助文档"

# 周末：可选的功能更新
git commit -m "feat: 添加新工具功能"
```

### 保持活跃
```
目标: 每周 1-2 次提交
内容建议:
  - 修复小bug
  - 优化样式
  - 更新文档
  - 性能改进
  - 代码重构
```

---

## 📋 提交前检查清单

```
□ 代码没有语法错误
□ 功能已测试
□ 文档已更新
□ Commit message 清晰
□ 没有包含不必要的文件
□ 敏感信息已移除
□ 代码风格一致
```

---

## 🔍 提交后验证

### 本地验证
```bash
# 查看最后一次提交
git log -1

# 查看提交内容
git show

# 确认远程状态
git remote -v
```

### GitHub 验证
1. 访问 https://github.com/crash-you/chartools
2. 检查提交是否显示
3. 验证文件是否正确
4. 查看 README 渲染效果

---

## 🆘 常见问题

### 1. 忘记添加文件
```bash
# 添加遗漏的文件
git add forgotten-file.txt
git commit --amend --no-edit
```

### 2. Commit message 写错
```bash
# 修改最后一次提交信息
git commit --amend -m "正确的提交信息"
```

### 3. 提交了不该提交的文件
```bash
# 从暂存区移除
git reset HEAD unwanted-file.txt

# 从最后一次提交中移除
git reset --soft HEAD^
git reset HEAD unwanted-file.txt
git commit -m "原提交信息"
```

### 4. 推送被拒绝
```bash
# 先拉取再推送
git pull origin main --rebase
git push origin main
```

### 5. 合并冲突
```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit -m "merge: 解决合并冲突"
```

---

## 📊 Git 最佳实践

### ✅ 推荐做法
```
✓ 频繁提交（小而精）
✓ 清晰的 commit message
✓ 每个提交只做一件事
✓ 提交前测试代码
✓ 使用分支开发
✓ 定期推送到远程
✓ 保持提交历史整洁
```

### ❌ 避免做法
```
✗ 一次提交大量修改
✗ 模糊的 commit message
✗ 提交未测试的代码
✗ 直接在 main 分支开发
✗ 提交敏感信息
✗ 使用 git add .（盲目添加）
✗ 频繁的 force push
```

---

## 🎓 学习资源

### Git 文档
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 帮助文档](https://docs.github.com)
- [Pro Git 书籍](https://git-scm.com/book/zh/v2)

### 可视化工具
- GitHub Desktop
- GitKraken
- SourceTree

---

## 📝 快速参考

### 常用命令速查
```bash
# 状态查看
git status              # 查看状态
git log --oneline       # 查看历史

# 添加和提交
git add <file>          # 添加文件
git commit -m "msg"     # 提交

# 分支操作
git branch              # 查看分支
git checkout -b <name>  # 创建并切换分支
git merge <branch>      # 合并分支

# 远程操作
git push origin main    # 推送
git pull origin main    # 拉取
git remote -v           # 查看远程

# 撤销操作
git reset HEAD <file>   # 取消暂存
git checkout -- <file>  # 撤销修改
git revert HEAD         # 回退提交
```

---

**准备好了吗？现在就开始你的第一次提交吧！** 🚀

**文档版本**: 1.0  
**更新日期**: 2025年9月30日
