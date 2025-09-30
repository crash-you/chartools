@echo off
chcp 65001 >nul
echo ========================================
echo CharTools - GitHub 提交脚本
echo ========================================
echo.

echo [1/4] 进入项目目录...
cd /d "%~dp0"
echo ✓ 当前目录: %CD%
echo.

echo [2/4] 添加文件到暂存区...
git add README.md
git add LICENSE
git add CONTRIBUTING.md
git add .gitignore
git add TECH_STACK.md
git add DEPLOYMENT.md
git add GIT_COMMIT_GUIDE.md
git add QUICK_START.md
git add FINAL_CHECKLIST.md
git add CHANGELOG.md
echo ✓ 文件已添加
echo.

echo [3/4] 查看暂存状态...
git status
echo.

echo [4/4] 提交变更...
git commit -m "docs: 添加完整的项目文档和指南

核心文档:
- README.md: 项目介绍、功能列表、技术栈说明
- LICENSE: MIT 开源许可证
- CONTRIBUTING.md: 详细的贡献指南
- .gitignore: Git 忽略配置

技术文档:
- TECH_STACK.md: 完整的技术栈文档
- DEPLOYMENT.md: 部署指南
- GIT_COMMIT_GUIDE.md: Git 提交规范
- QUICK_START.md: 快速开始指南

项目文档:
- FINAL_CHECKLIST.md: Google Ads 申请检查清单
- CHANGELOG.md: 版本历史

这些文档完善了项目的专业规范，展示了技术实力，
为 Google Ads 审核提供了完整的项目背景。
统一 GitHub URL 为 crash-you/chartools。"

if %errorlevel% equ 0 (
    echo.
    echo ✓ 提交成功！
    echo.
    echo ========================================
    echo 下一步：推送到 GitHub
    echo ========================================
    echo.
    echo 请执行以下命令：
    echo git push origin main
    echo.
    echo 如果需要先拉取：
    echo git pull origin main --rebase
    echo git push origin main
    echo.
) else (
    echo.
    echo ✗ 提交失败！
    echo 请检查错误信息。
    echo.
)

pause
