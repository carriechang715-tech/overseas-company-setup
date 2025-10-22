# 🚀 部署指南

本文档指导如何将境外公司设立服务平台部署到 GitHub Pages。

## 📋 部署前准备

### 1. 检查文件结构

确保项目包含以下文件：

```
overseas-company-setup/
├── index.html          ✅ 主页面
├── style.css           ✅ 样式文件
├── data.js             ✅ 数据配置
├── process.js          ✅ 流程配置
├── calculator.js       ✅ 计算引擎
├── app.js              ✅ 应用逻辑
├── README.md           ✅ 项目文档
└── DEPLOYMENT.md       ✅ 部署指南
```

### 2. 确认快递 API 可用

本应用依赖快递评估工具，有两种集成方式：

#### 方式 1：本地文件引入（推荐用于测试）

```html
<!-- 在 index.html 中已配置 -->
<script src="../express-tool/data.js"></script>
<script src="../express-tool/calculator.js"></script>
```

**优点**：无需网络请求，响应快
**缺点**：需要同时部署快递工具

#### 方式 2：远程 API 调用（推荐用于生产）

修改 `calculator.js` 中的 `calculateExpressDelivery` 函数：

```javascript
async function calculateExpressDelivery(fromCountry, toCountry, weight) {
    try {
        // 调用远程 API
        const response = await fetch(
            `https://your-api.vercel.app/api/calculate?` +
            `from=${fromCountry}&to=${toCountry}&weight=${weight}&` +
            `parcelType=document&serviceType=standard`
        );
        const result = await response.json();
        
        if (result.success && result.options && result.options.length > 0) {
            const fastest = result.options.reduce((min, opt) => 
                opt.days < min.days ? opt : min
            );
            return {
                fastest: fastest,
                cheapest: result.options.reduce((min, opt) => 
                    opt.price < min.price ? opt : min
                )
            };
        }
    } catch (error) {
        console.warn('快递 API 调用失败，使用默认估算', error);
    }
    
    // 降级方案：默认估算
    return {
        fastest: {
            company: '默认快递',
            days: 5,
            price: 200
        },
        cheapest: {
            company: '默认快递',
            days: 7,
            price: 150
        }
    };
}
```

## 🌐 GitHub Pages 部署步骤

### 步骤 1：创建 Git 仓库

```bash
cd /Users/moxin/Qcoder/overseas-company-setup

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 境外公司设立服务平台 v1.0"
```

### 步骤 2：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `overseas-company-setup`
   - Description: `境外公司设立服务平台 - 智能供应商匹配与流程管理`
   - Public（公开）
   - 不要勾选 "Initialize this repository with a README"

### 步骤 3：推送代码到 GitHub

```bash
# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/overseas-company-setup.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

如果遇到认证问题，使用 Personal Access Token：

```bash
# 使用 Token 推送
git push https://YOUR_TOKEN@github.com/YOUR_USERNAME/overseas-company-setup.git main
```

### 步骤 4：启用 GitHub Pages

1. 进入仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 "Save"

等待 1-2 分钟，GitHub 会自动构建和部署。

### 步骤 5：访问网站

部署完成后，访问地址为：

```
https://YOUR_USERNAME.github.io/overseas-company-setup/
```

## 📦 完整项目部署（包含快递工具）

如果要同时部署快递评估工具和公司设立平台：

### 方案 1：单独仓库

分别部署两个应用：

```
https://YOUR_USERNAME.github.io/express-tool/
https://YOUR_USERNAME.github.io/overseas-company-setup/
```

然后修改公司设立平台的 `index.html`：

```html
<!-- 引用已部署的快递工具 -->
<script src="https://YOUR_USERNAME.github.io/express-tool/data.js"></script>
<script src="https://YOUR_USERNAME.github.io/express-tool/calculator.js"></script>
```

### 方案 2：合并仓库

创建统一的项目结构：

```
qcoder-apps/
├── express-tool/
│   ├── index.html
│   ├── data.js
│   ├── calculator.js
│   └── ...
└── overseas-company-setup/
    ├── index.html
    ├── data.js
    └── ...
```

部署后访问：

```
https://YOUR_USERNAME.github.io/qcoder-apps/express-tool/
https://YOUR_USERNAME.github.io/qcoder-apps/overseas-company-setup/
```

## 🔧 优化建议

### 1. 添加自定义域名（可选）

在仓库设置的 Pages 部分：

1. 添加你的域名到 "Custom domain"
2. 等待 DNS 检查
3. 勾选 "Enforce HTTPS"

在项目根目录创建 `CNAME` 文件：

```
your-domain.com
```

### 2. 启用 HTTPS

GitHub Pages 自动提供 HTTPS，无需额外配置。

### 3. SEO 优化

在 `index.html` 的 `<head>` 中添加：

```html
<!-- SEO Meta Tags -->
<meta name="description" content="一站式境外公司注册服务，智能推荐供应商，可视化流程管理">
<meta name="keywords" content="境外公司注册,香港公司,新加坡公司,离岸公司,公司设立">
<meta name="author" content="Your Name">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://your-domain.com/">
<meta property="og:title" content="境外公司设立服务平台">
<meta property="og:description" content="一站式境外公司注册服务">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://your-domain.com/">
<meta property="twitter:title" content="境外公司设立服务平台">
```

### 4. 添加网站图标

创建 `favicon.ico` 并在 `<head>` 中添加：

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

### 5. Google Analytics（可选）

在 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 常见问题

### 问题 1：页面显示 404

**原因**：GitHub Pages 还未完成构建  
**解决**：等待 2-5 分钟后刷新

### 问题 2：CSS 样式未加载

**原因**：路径错误  
**解决**：检查 `index.html` 中的 CSS 引用：

```html
<!-- 相对路径 -->
<link rel="stylesheet" href="style.css">

<!-- 绝对路径（如果在子目录） -->
<link rel="stylesheet" href="/overseas-company-setup/style.css">
```

### 问题 3：JavaScript 错误

**原因**：文件加载顺序错误  
**解决**：确保 `</body>` 前的脚本顺序正确：

```html
<script src="data.js"></script>
<script src="process.js"></script>
<script src="calculator.js"></script>
<script src="app.js"></script>
<!-- 快递 API 必须在最后 -->
<script src="../express-tool/data.js"></script>
<script src="../express-tool/calculator.js"></script>
```

### 问题 4：快递 API 调用失败

**原因**：跨域或文件路径问题  
**解决**：
1. 使用远程 API（Vercel）
2. 或将快递工具文件复制到同一项目
3. 确保快递 API 支持 CORS

### 问题 5：表单提交后无响应

**原因**：JavaScript 错误  
**解决**：打开浏览器控制台（F12）查看错误信息

## 📊 部署后测试清单

- [ ] 页面正常加载
- [ ] CSS 样式正确显示
- [ ] 表单填写功能正常
- [ ] 步骤切换流畅
- [ ] 供应商推荐正确
- [ ] 时间线显示完整
- [ ] 快递 API 调用成功
- [ ] 响应式设计正常（移动端）
- [ ] 浏览器兼容性（Chrome, Firefox, Safari）

## 🔄 更新部署

当需要更新代码时：

```bash
# 修改文件后
git add .
git commit -m "Update: 描述你的更改"
git push origin main
```

GitHub Pages 会自动重新部署（1-2 分钟）。

## 📞 技术支持

如果部署过程中遇到问题：

1. 检查 GitHub Actions（仓库的 Actions 标签）
2. 查看浏览器控制台错误
3. 参考 [GitHub Pages 文档](https://docs.github.com/en/pages)

---

**祝部署顺利！** 🎉
