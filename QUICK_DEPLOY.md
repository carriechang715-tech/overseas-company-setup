# 境外公司设立服务平台 - 快速部署指南

## 🚀 Vercel 一键部署（推荐，最简单！）

### 方式 1：通过 Vercel 网站部署

1. **访问 Vercel**: https://vercel.com
2. **登录**（建议使用 GitHub 账号登录）
3. **导入项目**：
   - 点击右上角 "Add New" → "Project"
   - 如果没有 GitHub 仓库，选择 "Deploy from CLI" 或直接拖拽文件夹
4. **等待部署**（约 10-30 秒）
5. **访问您的网站**！

### 方式 2：通过命令行部署（需要安装 Vercel CLI）

```bash
# 1. 安装 Vercel CLI（只需一次）
npm install -g vercel

# 2. 在项目目录执行部署
cd /Users/moxin/Qcoder/overseas-company-setup
vercel

# 3. 按提示操作：
#    - 首次使用会要求登录
#    - 选择项目设置（默认即可）
#    - 等待部署完成

# 4. 生产环境部署
vercel --prod
```

**优点**：
- ⚡️ 超快速度（10-30 秒部署完成）
- 🔄 自动 HTTPS
- 🌍 全球 CDN 加速
- 📊 自带分析和日志
- 🔧 支持 Serverless Functions（未来可扩展 API）

---

## 🐙 GitHub Pages 部署（传统方式）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写：
   - Repository name: `overseas-company-setup`
   - Description: `境外公司设立服务平台 - 智能供应商匹配与流程管理`
   - 选择 Public（公开）
3. 点击 "Create repository"

### 步骤 2：使用自动化脚本部署

```bash
cd /Users/moxin/Qcoder/overseas-company-setup
./deploy.sh
```

然后按照脚本提示：
1. 输入提交信息（或按回车使用默认）
2. 输入您的 GitHub 仓库地址（格式：`https://github.com/用户名/overseas-company-setup.git`）
3. 等待推送完成

### 步骤 3：启用 GitHub Pages

1. 进入您的 GitHub 仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. 在 "Source" 部分：
   - Branch: 选择 `master`
   - Folder: 选择 `/ (root)`
5. 点击 "Save"
6. 等待 1-2 分钟

### 步骤 4：访问网站

```
https://您的GitHub用户名.github.io/overseas-company-setup/
```

---

## 🔗 快递工具集成说明

当前应用依赖快递评估工具（[express-tool](file:///Users/moxin/Qcoder/express-tool)）。部署后需要更新引用路径：

### 如果快递工具也部署在 Vercel/GitHub Pages：

修改 [`index.html`](file:///Users/moxin/Qcoder/overseas-company-setup/index.html) 底部的脚本引用：

```html
<!-- 替换为已部署的快递工具地址 -->
<script src="https://your-express-tool.vercel.app/data.js"></script>
<script src="https://your-express-tool.vercel.app/calculator.js"></script>
```

### 如果快递工具未部署：

有两个选择：
1. **同时部署快递工具**（推荐）
2. **将快递工具文件复制到本项目**

---

## ✅ 部署后测试清单

- [ ] 页面正常加载
- [ ] CSS 样式显示正确
- [ ] 表单填写功能正常
- [ ] 注册地区联动正常
- [ ] 公司类型动态更新
- [ ] 供应商推荐功能正常
- [ ] 时间线显示完整
- [ ] 快递时效计算正常
- [ ] 移动端响应式正常

---

## 🎯 推荐部署流程

**最简单的方式**：

1. **Vercel 部署快递工具**（如果还没部署）
   ```bash
   cd /Users/moxin/Qcoder/express-tool
   vercel --prod
   ```

2. **更新公司设立平台的快递工具引用**
   修改 index.html 中的脚本路径为已部署的快递工具地址

3. **Vercel 部署公司设立平台**
   ```bash
   cd /Users/moxin/Qcoder/overseas-company-setup
   vercel --prod
   ```

4. **完成！** 🎉

---

## 📞 遇到问题？

查看详细部署文档：[`DEPLOYMENT.md`](file:///Users/moxin/Qcoder/overseas-company-setup/DEPLOYMENT.md)
