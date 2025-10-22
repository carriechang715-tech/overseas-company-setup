// 境外公司设立数据配置

// 注册地区配置
const JURISDICTIONS = {
    'HK': {
        name: '香港',
        flag: '🇭🇰',
        currency: 'HKD',
        language: ['中文', '英文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节', '圣诞节'],
        taxRate: '8.25%-16.5%',
        minCapital: '无最低要求',
        description: '国际金融中心，税制简单，注册便捷',
        advantages: ['低税率', '无外汇管制', '法律体系健全', '地理位置优越'],
        avgSetupDays: 5
    },
    'SG': {
        name: '新加坡',
        flag: '🇸🇬',
        currency: 'SGD',
        language: ['英文', '中文', '马来文', '泰米尔文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['新年', '春节', '耶稣受难日', '劳动节', '卫塞节', '开斋节', '国庆日', '屠妖节', '圣诞节'],
        taxRate: '17%',
        minCapital: 'SGD 1',
        description: '亚洲金融中心，营商环境优越',
        advantages: ['政治稳定', '税务优惠', '国际声誉好', '基础设施完善'],
        avgSetupDays: 8
    },
    'US': {
        name: '美国',
        flag: '🇺🇸',
        currency: 'USD',
        language: ['英文'],
        timezone: 'GMT-5至GMT-10（多个时区）',
        workingDays: 5,
        holidays: ['新年', '马丁·路德·金日', '总统日', '阵亡将士纪念日', '独立日', '劳动节', '感恩节', '圣诞节'],
        taxRate: '21%（联邦）+ 州税',
        minCapital: '各州不同',
        description: '全球最大经济体，商业机会多',
        advantages: ['市场巨大', '融资便利', '法律保护', '品牌效应'],
        avgSetupDays: 12,
        states: {
            'DE': { name: '特拉华州', days: 2, tax: '无州税' },
            'WY': { name: '怀俄明州', days: 4, tax: '无州税' },
            'NV': { name: '内华达州', days: 6, tax: '无州税' },
            'CA': { name: '加利福尼亚州', days: 12, tax: '8.84%' },
            'NY': { name: '纽约州', days: 15, tax: '6.5%' }
        }
    },
    'UK': {
        name: '英国',
        flag: '🇬🇧',
        currency: 'GBP',
        language: ['英文'],
        timezone: 'GMT+0',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '五月初银行假日', '春季银行假日', '夏季银行假日', '圣诞节', '节礼日'],
        taxRate: '19%',
        minCapital: '£1',
        description: '欧洲金融中心，法律制度完善',
        advantages: ['法律健全', '金融发达', '国际认可度高', '欧洲门户'],
        avgSetupDays: 6
    },
    'BVI': {
        name: '英属维尔京群岛',
        flag: '🏝️',
        currency: 'USD',
        language: ['英文'],
        timezone: 'GMT-4',
        workingDays: 5,
        holidays: ['新年', '圣帕特里克节', '复活节', '女王生日', '劳动节', '圣诞节'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '经典离岸中心，保密性强',
        advantages: ['零税率', '高度保密', '快速设立', '无需审计'],
        avgSetupDays: 3
    },
    'Cayman': {
        name: '开曼群岛',
        flag: '🏝️',
        currency: 'KYD',
        language: ['英文'],
        timezone: 'GMT-5',
        workingDays: 5,
        holidays: ['新年', '灰星期三', '耶稣受难日', '复活节', '发现日', '女王生日', '宪法日', '圣诞节'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '顶级离岸金融中心',
        advantages: ['零税率', '政治稳定', '监管完善', '适合上市架构'],
        avgSetupDays: 5
    },
    'DE': {
        name: '德国',
        flag: '🇩🇪',
        currency: 'EUR',
        language: ['德文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '劳动节', '耶稣升天日', '圣灵降临节', '德国统一日', '圣诞节'],
        taxRate: '15%-30%',
        minCapital: 'EUR 25,000 (GmbH)',
        description: '欧洲经济引擎，工业强国',
        advantages: ['欧盟市场', '工业发达', '技术先进', '信誉度高'],
        avgSetupDays: 14
    },
    'AU': {
        name: '澳大利亚',
        flag: '🇦🇺',
        currency: 'AUD',
        language: ['英文'],
        timezone: 'GMT+8至GMT+10',
        workingDays: 5,
        holidays: ['新年', '澳大利亚日', '耶稣受难日', '复活节', '澳纽军团日', '女王生日', '圣诞节', '节礼日'],
        taxRate: '30%',
        minCapital: 'AUD 1',
        description: '亚太重要经济体',
        advantages: ['经济稳定', '法律健全', '资源丰富', '地理优势'],
        avgSetupDays: 10
    }
};

// 供应商配置
const SUPPLIERS = [
    {
        id: 'supplier_a',
        name: '启航国际商务咨询',
        rating: 4.9,
        experience: 15,
        completedCases: 3500,
        specialties: ['HK', 'SG', 'BVI', 'Cayman'],
        price: {
            'HK': { service: 3500, government: 1720, total: 5220 },
            'SG': { service: 4800, government: 315, total: 5115 },
            'BVI': { service: 6500, government: 750, total: 7250 },
            'Cayman': { service: 8500, government: 1200, total: 9700 }
        },
        advantages: ['经验丰富', '价格合理', '服务专业', '响应迅速'],
        certifications: ['会计师事务所', 'ISO9001', '律师资质'],
        contact: { phone: '+852-1234-5678', email: 'info@startup-intl.com' }
    },
    {
        id: 'supplier_b',
        name: '环球企业服务',
        rating: 4.8,
        experience: 12,
        completedCases: 2800,
        specialties: ['US', 'UK', 'DE', 'AU'],
        price: {
            'US': { service: 5500, government: 500, total: 6000 },
            'UK': { service: 4200, government: 200, total: 4400 },
            'DE': { service: 6800, government: 1500, total: 8300 },
            'AU': { service: 5800, government: 506, total: 6306 }
        },
        advantages: ['全球网络', '欧美优势', '律师团队', '一站式服务'],
        certifications: ['律师事务所', '会计师资质', '商标代理'],
        contact: { phone: '+1-888-123-4567', email: 'service@global-biz.com' }
    },
    {
        id: 'supplier_c',
        name: '港通商务顾问',
        rating: 4.7,
        experience: 10,
        completedCases: 2200,
        specialties: ['HK', 'SG', 'US', 'UK'],
        price: {
            'HK': { service: 2980, government: 1720, total: 4700 },
            'SG': { service: 4200, government: 315, total: 4515 },
            'US': { service: 4800, government: 500, total: 5300 },
            'UK': { service: 3800, government: 200, total: 4000 }
        },
        advantages: ['性价比高', '香港本地', '银行开户协助', '后续服务'],
        certifications: ['特许秘书', '会计师', '信托牌照'],
        contact: { phone: '+852-9876-5432', email: 'cs@hk-consulting.com' }
    }
];

// 文件清单配置
const REQUIRED_DOCUMENTS = {
    individual: {
        name: '个人股东/董事',
        documents: [
            { id: 'passport', name: '护照复印件', required: true, description: '有效期6个月以上', certify: true },
            { id: 'id', name: '身份证复印件', required: true, description: '正反面清晰扫描件', certify: true },
            { id: 'address', name: '地址证明', required: true, description: '3个月内的水电费账单/银行对账单', certify: true },
            { id: 'resume', name: '个人简历', required: false, description: '部分地区需要', certify: false }
        ]
    },
    corporate: {
        name: '公司股东',
        documents: [
            { id: 'certificate', name: '公司注册证书', required: true, description: '有效的公司注册证明', certify: true },
            { id: 'articles', name: '公司章程', required: true, description: '最新版本', certify: true },
            { id: 'resolution', name: '董事会决议', required: true, description: '授权投资决议', certify: true },
            { id: 'goodstanding', name: '良好存续证明', required: true, description: '6个月内出具', certify: true },
            { id: 'registry', name: '股东/董事名册', required: true, description: '最新名册', certify: false }
        ]
    },
    common: {
        name: '通用文件',
        documents: [
            { id: 'poa', name: '授权委托书', required: true, description: '委托代理机构办理', certify: true },
            { id: 'declaration', name: '申报表', required: true, description: '如实填写公司信息', certify: false }
        ]
    }
};
