#!/bin/bash

# GitHub Pages 部署脚本
# 使用方法: ./deploy.sh

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否已初始化 git 仓库
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "更新网站: 修复地图加载问题，优化 GitHub Pages 配置"

# 检查远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "⚠️  未找到远程仓库，请先添加远程仓库："
    echo "   git remote add origin https://github.com/cici-zhao411/Planet--Wander.git"
    echo ""
    read -p "是否现在添加远程仓库? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote add origin https://github.com/cici-zhao411/Planet--Wander.git
    else
        echo "❌ 请手动添加远程仓库后重新运行此脚本"
        exit 1
    fi
fi

# 推送到 GitHub
echo "⬆️  推送到 GitHub..."
git push -u origin main

echo "✅ 部署完成！"
echo "🌐 网站地址: https://cici-zhao411.github.io/Planet--Wander/"
echo ""
echo "💡 提示: 如果这是首次部署，请在 GitHub 仓库设置中启用 GitHub Pages"

