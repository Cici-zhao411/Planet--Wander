# 行星旅人 | Planet Wander

一个记录旅行足迹的个人网站项目，展示旅行路线、照片和故事。

## 项目简介

这是一个静态网站项目，用于记录和展示个人旅行经历。网站包含以下页面：

- **首页** (`index.html`) - 展示最新足迹和照片流
- **个人简介** (`about.html`) - 个人介绍和旅行时间轴
- **累计旅行路线** (`routes.html`) - 按主题分类的旅行路线

## 功能特性

- 📸 照片画廊展示
- 🗺️ 旅行路线记录
- 📝 可编辑的个人简介和时间轴
- 💾 本地存储功能（使用 localStorage）
- 🎨 现代化的深色主题设计

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 本地存储 (localStorage)

## 使用方法

1. 克隆或下载此项目
2. 直接在浏览器中打开 `index.html` 文件
3. 或者使用本地服务器（推荐）：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js (需要安装 http-server)
   npx http-server
   ```

## GitHub Pages 部署

### 快速部署步骤

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[你的用户名]/[仓库名].git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库的 Settings（设置）
   - 找到 Pages 选项
   - Source（源）选择 `Deploy from a branch`
   - Branch（分支）选择 `main` 或 `master`，文件夹选择 `/ (root)`
   - 点击 Save（保存）

3. **访问网站**
   - 部署完成后，访问 `https://[你的用户名].github.io/[仓库名]`
   - 首次部署可能需要几分钟时间

### 项目已包含的 GitHub Pages 配置

- ✅ `.nojekyll` - 禁用 Jekyll 处理
- ✅ `_config.yml` - GitHub Pages 配置文件
- ✅ 所有路径使用相对路径，兼容 GitHub Pages
- ✅ 静态资源路径正确配置

### 注意事项

- 确保所有文件都已推送到 GitHub
- 如果使用自定义域名，需要在仓库根目录添加 `CNAME` 文件
- GitHub Pages 支持 HTTPS，建议使用 HTTPS 访问

## 项目结构

```
.
├── index.html          # 首页
├── about.html          # 个人简介页
├── routes.html         # 旅行路线页
├── assets/
│   ├── css/
│   │   └── style.css   # 样式文件
│   ├── js/
│   │   ├── index.js    # 首页脚本
│   │   ├── about.js    # 个人简介页脚本
│   │   └── routes.js   # 旅行路线页脚本
│   └── images/         # 图片资源
└── README.md           # 项目说明
```

## 注意事项

- 上传的照片和编辑的内容会存储在浏览器的 localStorage 中
- 清除浏览器数据会删除所有本地存储的内容
- 建议定期备份重要数据

## 许可证

本项目仅供个人使用。

