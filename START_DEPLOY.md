# 🚀 立即部署 - 完整指南

## 📊 当前状态

- ✅ 境外公司设立平台：已准备好部署
- ✅ 快递评估工具：已有 GitHub 仓库 (`carriechang715-tech/express_search_tool`)
- ⚠️ 需要处理：快递工具的引用路径（部署后需要更新）

---

## 🎯 最佳部署方案：Vercel（推荐）

### 为什么选择 Vercel？

- ⚡️ **超快速度**：10-30 秒完成部署
- 🌍 **全球 CDN**：自动全球加速
- 🔒 **自动 HTTPS**：无需配置
- 📊 **实时分析**：访问统计和日志
- 🔄 **自动部署**：推送代码自动更新

---

## 📝 三步完成部署

### 步骤 1：部署快递评估工具

1. **访问 Vercel**: https://vercel.com
2. **登录**（使用 GitHub 账号）
3. **导入项目**：
   - 点击 "Add New" → "Project"
   - 找到 `carriechang715-tech/express_search_tool` 仓库
   - 点击 "Import"
4. **配置项目**：
   - Project Name: `express-tool`（或保持默认）
   - Framework: Other
   - 点击 "Deploy"
5. **记录 URL**（示例）：
   ```
   https://express-tool-xxx.vercel.app
   ```

---

### 步骤 2：更新公司设立平台的快递工具引用

在部署公司设立平台之前，需要先更新快递工具的引用路径。

#### 选项 A：使用已部署的快递工具 URL（推荐）

修改 `index.html` 底部（第 356-357 行）：

```html
<!-- 之前（本地引用） -->
<script src="../express-tool/data.js"></script>
<script src="../express-tool/calculator.js"></script>

<!-- 改为（部署后的 URL，替换为实际地址） -->
<script src="https://express-tool-xxx.vercel.app/data.js"></script>
<script src="https://express-tool-xxx.vercel.app/calculator.js"></script>
```

#### 选项 B：复制快递工具文件到本项目

如果不想分开部署，可以将快递工具的文件复制到本项目：

```bash
# 在项目根目录执行
mkdir -p express-tool
cp /Users/moxin/Qcoder/express-tool/data.js express-tool/
cp /Users/moxin/Qcoder/express-tool/calculator.js express-tool/
```

然后修改 `index.html` 底部：

```html
<script src="express-tool/data.js"></script>
<script src="express-tool/calculator.js"></script>
```

---

### 步骤 3：部署公司设立平台

#### 方式 1：通过 GitHub 仓库部署（推荐）

**3.1 创建 GitHub 仓库**

1. 访问 https://github.com/new
2. 填写信息：
   - Repository name: `overseas-company-setup`
   - Description: `境外公司设立服务平台 - 智能供应商匹配与流程管理`
   - Public
3. 点击 "Create repository"

**3.2 推送代码到 GitHub**

```bash
cd /Users/moxin/Qcoder/overseas-company-setup

# 添加远程仓库（替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/overseas-company-setup.git

# 切换到 main 分支
git branch -M main

# 推送代码
git push -u origin main
```

**3.3 在 Vercel 导入仓库**

1. 回到 Vercel
2. 点击 "Add New" → "Project"
3. 找到 `overseas-company-setup` 仓库
4. 点击 "Import"
5. 配置：
   - Project Name: `overseas-company-setup`
   - Framework: Other
6. 点击 "Deploy"

#### 方式 2：直接使用 Vercel CLI（更快）

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel

# 在项目目录部署
cd /Users/moxin/Qcoder/overseas-company-setup
vercel

# 首次使用会要求登录，按提示操作
# 选择项目配置，默认即可

# 生产环境部署
vercel --prod
```

---

## ✅ 部署完成！

您将获得两个可访问的 URL：

```
🚀 快递评估工具:
https://express-tool-xxx.vercel.app

🏢 公司设立平台:
https://overseas-company-setup-xxx.vercel.app
```

---

## 🔧 部署后优化

### 1. 自定义域名（可选）

在 Vercel 项目设置中：
- Settings → Domains
- 添加您的域名
- 按提示配置 DNS

### 2. 环境变量（如需）

如果未来需要配置 API 密钥等：
- Settings → Environment Variables
- 添加变量

### 3. 启用分析

- Analytics 标签
- 查看访问数据和性能指标

---

## 🐛 常见问题

### Q1: 快递功能不工作？

**检查**：
1. 浏览器控制台（F12）查看错误
2. 确认快递工具 URL 是否正确
3. 确认快递工具已成功部署

**解决**：更新 `index.html` 中的快递工具引用路径

### Q2: 页面样式丢失？

**原因**：CSS 文件路径错误  
**解决**：确认 `style.css` 在项目根目录

### Q3: Vercel 部署失败？

**检查**：
1. 项目是否有 `index.html`
2. 文件是否都已提交到 Git
3. Vercel 控制台的错误日志

---

## 📊 部署后测试清单

访问您的网站并测试：

- [ ] 页面正常加载
- [ ] CSS 样式显示正确
- [ ] 表单填写功能正常
- [ ] 注册地区选择和联动
- [ ] 公司类型动态更新
- [ ] 股东/董事多国籍支持（人数≥2时）
- [ ] 快递工具链接可点击
- [ ] 供应商推荐功能
- [ ] 时间线显示
- [ ] 移动端响应式

---

## 🎉 开始部署！

**快速命令（如果已安装 Vercel CLI）**：

```bash
# 1. 部署快递工具（如果还没部署）
cd /Users/moxin/Qcoder/express-tool
vercel --prod

# 2. 更新快递工具引用（手动编辑 index.html）

# 3. 部署公司设立平台
cd /Users/moxin/Qcoder/overseas-company-setup
vercel --prod
```

或使用 Vercel 网站：https://vercel.com

---

**需要帮助？** 查看详细文档 [`DEPLOYMENT.md`](file:///Users/moxin/Qcoder/overseas-company-setup/DEPLOYMENT.md)
