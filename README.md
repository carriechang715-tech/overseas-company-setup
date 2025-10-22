# 🌍 境外公司设立服务平台

一站式境外公司注册服务平台，提供智能供应商匹配、可视化流程管理和精准时效预估。

## ✨ 功能特点

### 1. 智能需求表单
- **8个注册地区**：香港、新加坡、美国、英国、BVI、开曼、德国、澳大利亚
- **完整字段收集**：
  - 公司基本信息（名称、类型、业务范围、注册资本）
  - 股东信息（支持个人/公司股东，无限添加）
  - 董事信息（完整个人资料）
  - 注册地址（代理地址服务）
  - 秘书服务（部分地区需要）
  - 文件邮寄地址
  - 额外服务需求

### 2. 智能供应商推荐
- **多维度评分系统**：
  - 价格评分（30%）
  - 经验评分（20%）
  - 速度评分（20%）
  - 评分评分（20%）
  - 专长匹配（10%）
- **详细供应商信息**：
  - 服务费用明细（服务费+政府费用）
  - 预计时效
  - 专业领域标签
  - 用户评分
  - 推荐标识

### 3. 可视化流程时间线
- **详细步骤展示**：
  - 步骤序号和名称
  - 处理时效（工作日）
  - 所需文件清单
  - 详细说明
  - 风险提示
- **快递时效集成**：
  - 自动调用快递评估工具 API
  - 实时计算国际快递时间
  - 多快递公司对比
- **总时效计算**：
  - 自动汇总所有步骤耗时
  - 区分工作日/自然日
  - 考虑节假日影响

### 4. 风险提示系统
- 法律法规风险
- 税务合规风险
- 文件准备风险
- 时效延误风险

## 📁 项目结构

```
overseas-company-setup/
├── index.html          # 主页面（278行）
├── style.css           # 样式文件（972行）
├── data.js             # 基础数据配置（210行）
├── process.js          # 流程步骤配置（463行）
├── calculator.js       # 计算引擎（204行）
├── app.js              # 应用逻辑（447行）
└── README.md           # 项目文档
```

**总代码量**：2,574 行

## 🎯 核心数据配置

### 支持的注册地区

| 地区 | 代码 | 平均设立时间 | 税率 |
|------|------|--------------|------|
| 🇭🇰 香港 | HK | 5天 | 8.25%-16.5% |
| 🇸🇬 新加坡 | SG | 7天 | 17% |
| 🇺🇸 美国 | US | 3-20天 | 21%联邦税 |
| 🇬🇧 英国 | UK | 6天 | 19% |
| 🏝️ BVI | BVI | 10天 | 0% |
| 🏝️ 开曼 | Cayman | 12天 | 0% |
| 🇩🇪 德国 | DE | 14天 | 15% |
| 🇦🇺 澳大利亚 | AU | 10天 | 30% |

### 供应商配置

当前配置了 3 家供应商：
- **启航国际商务咨询**：4.9分，价格中等，全地区覆盖
- **瑞丰德永**：4.8分，老牌机构，专注亚太
- **骏德集团**：4.7分，性价比高，快速办理

### 流程步骤配置

已配置完整流程的地区：
- ✅ 香港（8步骤）
- ✅ 新加坡（9步骤）
- ✅ 美国（7步骤）
- ✅ 英国（7步骤）
- ✅ BVI（6步骤）

## 🔌 快递 API 集成

本平台集成了之前创建的 **国际/国内快递评估工具** API：

```javascript
// 调用快递 API 示例
function calculateExpressDelivery(fromCountry, toCountry, weight) {
    const result = calculateExpressOptions({
        fromCountry: fromCountry,
        toCountry: toCountry,
        weight: weight,
        urgent: false,
        parcelType: 'document',
        serviceType: 'standard'
    });
    return result;
}
```

### 集成位置
- 文件：`calculator.js`
- 函数：`calculateTotalDuration()`
- 触发时机：当流程步骤包含 `fromCountry` 字段时自动调用

## 🚀 使用方法

### 1. 本地运行

直接打开 `index.html` 即可在浏览器中运行：

```bash
# 方式1：直接打开
open index.html

# 方式2：使用简单 HTTP 服务器
python3 -m http.server 8000
# 访问 http://localhost:8000
```

### 2. 操作流程

#### 步骤 1：填写需求表单
1. 选择目标注册地区
2. 填写公司基本信息
3. 添加股东信息（可添加多个）
4. 添加董事信息（可添加多个）
5. 选择注册地址服务
6. 选择秘书服务（部分地区）
7. 填写文件邮寄地址
8. 选择额外服务
9. 点击"下一步"

#### 步骤 2：选择供应商
1. 查看推荐供应商列表
2. 对比价格、时效、评分
3. 查看专业领域标签
4. 选择合适的供应商
5. 点击"下一步"

#### 步骤 3：查看流程详情
1. 查看完整时间线
2. 了解每个步骤的：
   - 处理时效
   - 所需文件
   - 详细说明
   - 风险提示
3. 查看快递时效（如有）
4. 确认总流程耗时

## 💡 技术实现

### 核心算法

#### 1. 供应商匹配算法

```javascript
function matchSuppliers(formData) {
    const scores = suppliers.map(supplier => {
        // 价格评分（30%）
        const priceScore = calculatePriceScore(supplier, formData.jurisdiction);
        
        // 经验评分（20%）
        const experienceScore = supplier.yearsOfExperience / 20 * 100;
        
        // 速度评分（20%）
        const speedScore = calculateSpeedScore(supplier, formData.jurisdiction);
        
        // 评分评分（20%）
        const ratingScore = supplier.rating / 5 * 100;
        
        // 专长匹配（10%）
        const specialtyScore = calculateSpecialtyMatch(supplier, formData);
        
        // 加权总分
        const totalScore = 
            priceScore * 0.3 +
            experienceScore * 0.2 +
            speedScore * 0.2 +
            ratingScore * 0.2 +
            specialtyScore * 0.1;
            
        return { supplier, score: totalScore };
    });
    
    // 按分数降序排序
    return scores.sort((a, b) => b.score - a.score);
}
```

#### 2. 流程时间计算

```javascript
function calculateTotalDuration(jurisdiction, supplierId, mailAddress) {
    let totalDays = 0;
    const steps = SETUP_PROCESSES[jurisdiction][supplierId];
    
    steps.forEach(step => {
        if (step.fromCountry) {
            // 调用快递 API 计算时效
            const expressResult = calculateExpressDelivery(
                step.fromCountry,
                mailAddress.country,
                1.0
            );
            step.duration = expressResult.fastest.days;
        }
        totalDays += step.duration || 0;
    });
    
    return totalDays;
}
```

### 数据流转

```
用户填写表单
    ↓
表单数据验证
    ↓
供应商匹配评分
    ↓
生成供应商列表
    ↓
用户选择供应商
    ↓
加载流程配置
    ↓
调用快递 API（如需要）
    ↓
计算总时效
    ↓
渲染时间线
```

## 📋 数据模型

### 表单数据结构

```javascript
{
    jurisdiction: 'HK',              // 注册地区
    state: '',                       // 美国州（可选）
    companyName: 'ABC Ltd.',         // 公司名称
    companyType: 'Limited',          // 公司类型
    businessScope: '...',            // 业务范围
    registeredCapital: '10,000',     // 注册资本
    fiscalYearEnd: '12月31日',       // 财年结束日
    shareholders: [{                 // 股东数组
        type: 'individual',
        name: 'John Doe',
        nationality: 'China',
        percentage: 50,
        address: '...',
        documents: ['passport', 'address']
    }],
    directors: [{                    // 董事数组
        name: 'Jane Doe',
        nationality: 'China',
        address: '...',
        email: 'jane@example.com'
    }],
    needRegisteredAddress: true,     // 是否需要注册地址
    needSecretary: false,            // 是否需要秘书服务
    mailAddress: {                   // 邮寄地址
        country: 'CN',
        address: '...',
        recipient: '...',
        phone: '...'
    },
    additionalServices: [            // 额外服务
        'bankAccount',
        'taxConsulting'
    ]
}
```

### 供应商数据结构

```javascript
{
    id: 'supplier_a',
    name: '启航国际商务咨询',
    rating: 4.9,
    yearsOfExperience: 15,
    specialties: ['香港公司', '离岸公司', '商标注册'],
    price: {
        'HK': {
            service: 3500,
            government: 1720,
            total: 5220
        }
    },
    duration: {
        'HK': 5
    }
}
```

### 流程步骤数据结构

```javascript
{
    step: 1,
    name: '名称查册',
    duration: 1,                     // 工作日
    documents: [                     // 所需文件
        '公司名称备选（2-3个）'
    ],
    description: '...',              // 详细说明
    risks: [                         // 风险提示
        '名称可能被占用',
        '部分敏感词汇不可使用'
    ],
    fromCountry: 'HK',               // 快递起点（可选）
    toCountry: null,                 // 快递终点（自动获取）
    expressWeight: 0.5               // 快递重量（可选）
}
```

## 🎨 样式设计

### 设计系统

- **主题色**：蓝色系 (#2563eb)
- **辅助色**：绿色 (#10b981)、红色 (#ef4444)、橙色 (#f59e0b)
- **字体**：系统字体栈（San Francisco, Segoe UI, Roboto）
- **圆角**：4px - 16px
- **阴影**：多层次阴影系统
- **动画**：150ms - 350ms 过渡效果

### 响应式设计

- **桌面端**：≥1200px 全功能展示
- **平板端**：768px - 1199px 两列布局
- **移动端**：≤767px 单列布局

## ⚠️ 注意事项

### 1. 快递 API 依赖

本平台依赖快递评估工具的 API，使用前需确保：

```javascript
// 需要引入快递评估工具的核心文件
<script src="../express-tool/data.js"></script>
<script src="../express-tool/calculator.js"></script>
```

或者通过 HTTP API 调用：

```javascript
const response = await fetch('https://your-api.vercel.app/api/calculate?from=HK&to=CN&weight=1');
const result = await response.json();
```

### 2. 数据准确性

- 流程步骤和时效基于公开信息整理
- 实际时效可能因具体情况有所变化
- 价格仅供参考，以供应商实际报价为准
- 建议与供应商确认最新信息

### 3. 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔄 扩展建议

### 短期优化
1. 添加更多国家/地区支持
2. 增加供应商数量
3. 完善风险提示内容
4. 添加用户评价系统

### 中期优化
1. 后端 API 开发
2. 数据库存储
3. 用户账号系统
4. 订单管理功能

### 长期规划
1. AI 智能推荐
2. 在线支付集成
3. 文件在线上传
4. 实时进度追踪
5. 多语言支持

## 📞 技术支持

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- Email: support@example.com

## 📄 许可证

MIT License

---

**版本**：v1.0.0  
**最后更新**：2025-10-21  
**作者**：Qoder AI Assistant
