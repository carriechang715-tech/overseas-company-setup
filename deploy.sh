#!/bin/bash

# 境外公司设立服务平台 - GitHub Pages 发布脚本

echo "🚀 开始发布境外公司设立服务平台到 GitHub Pages..."
echo ""

# 检查是否已经初始化 Git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交
echo "💾 提交更改..."
read -p "请输入提交信息 (默认: Deploy to GitHub Pages): " commit_message
commit_message=${commit_message:-"Deploy to GitHub Pages"}
git commit -m "$commit_message"

# 检查是否已经添加远程仓库
if ! git remote | grep -q origin; then
    echo ""
    echo "🔗 请输入您的 GitHub 仓库地址："
    echo "格式示例: https://github.com/username/overseas-company-setup.git"
    read -p "仓库地址: " repo_url
    git remote add origin "$repo_url"
fi

# 推送到 GitHub
echo ""
echo "⬆️  推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 发布完成！"
echo ""
echo "📌 下一步操作："
echo "1. 访问您的 GitHub 仓库"
echo "2. 点击 Settings（设置）"
echo "3. 左侧菜单找到 Pages"
echo "4. 在 Source 部分："
echo "   - Branch: 选择 'main'"
echo "   - Folder: 选择 '/ (root)'"
echo "5. 点击 Save（保存）"
echo "6. 等待 1-2 分钟后访问您的网站"
echo ""
echo "🌐 您的网站地址将是："
echo "https://您的用户名.github.io/overseas-company-setup/"
echo ""
echo "💡 提示："
echo "- 如果同时部署了快递评估工具，确保两个项目都已部署"
echo "- 快递工具地址: https://您的用户名.github.io/express-tool/"
echo "- 可以在 index.html 中更新快递工具的引用路径"
echo ""
