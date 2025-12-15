# GitHub Pages 部署指南

## 快速部署步骤

### 方法一：使用部署脚本（推荐）

1. **打开终端，进入项目目录**
   ```bash
   cd /Users/cici/Desktop/GitHub
   ```

2. **给脚本添加执行权限**
   ```bash
   chmod +x deploy.sh
   ```

3. **运行部署脚本**
   ```bash
   ./deploy.sh
   ```

### 方法二：手动部署

1. **初始化 Git 仓库（如果还没有）**
   ```bash
   cd /Users/cici/Desktop/GitHub
   git init
   git branch -M main
   ```

2. **添加远程仓库（如果还没有）**
   ```bash
   git remote add origin https://github.com/cici-zhao411/Planet--Wander.git
   ```

3. **添加所有文件**
   ```bash
   git add .
   ```

4. **提交更改**
   ```bash
   git commit -m "更新网站: 修复地图加载问题，优化 GitHub Pages 配置"
   ```

5. **推送到 GitHub**
   ```bash
   git push -u origin main
   ```

## 启用 GitHub Pages

1. 访问 https://github.com/cici-zhao411/Planet--Wander/settings/pages
2. 在 "Source" 部分选择 `Deploy from a branch`
3. 选择分支 `main`，文件夹选择 `/ (root)`
4. 点击 "Save" 保存

## 验证部署

部署完成后，访问：https://cici-zhao411.github.io/Planet--Wander/

首次部署可能需要几分钟时间，请耐心等待。

## 常见问题

### 1. 如果遇到认证问题

GitHub 现在要求使用 Personal Access Token 而不是密码：

1. 访问 https://github.com/settings/tokens
2. 生成新的 token（选择 `repo` 权限）
3. 使用 token 作为密码进行推送

### 2. 如果地图仍然无法加载

- 检查浏览器控制台是否有错误信息
- 确认 ECharts 库是否正确加载
- 检查网络连接是否正常

### 3. 更新网站内容

每次修改后，只需运行：
```bash
git add .
git commit -m "更新内容描述"
git push
```

## 本次更新内容

✅ 修复地图加载问题
- 添加 ECharts 库检查
- 添加错误处理和备用数据源
- 优化加载时机

✅ 优化 GitHub Pages 配置
- 创建 `.nojekyll` 文件
- 创建 `_config.yml` 配置文件
- 优化导航路径

✅ 修复背景图片本地存储
- 确保上传的背景图片在刷新后保留

