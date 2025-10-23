// 境外公司设立数据配置

// 注册地区配置
const JURISDICTIONS = {
    // ========== 亚洲地区 ==========
    'HK': {
        name: '香港',
        flag: '🇭🇰',
        region: '亚洲',
        currency: 'HKD',
        language: ['中文', '英文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节', '圣诞节'],
        taxRate: '8.25%-16.5%',
        minCapital: '无最低要求',
        description: '国际金融中心，税制简单，注册便捷',
        advantages: ['低税率', '无外汇管制', '法律体系健全', '地理位置优越'],
        avgSetupDays: 5,
        companyTypes: [
            { value: 'Limited', label: 'Private Limited Company (私人有限公司) - Ltd', popular: true },
            { value: 'PublicLimited', label: 'Public Limited Company (公众有限公司) - PLC', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false },
            { value: 'RepOffice', label: 'Representative Office (代表处)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'HK_ISLAND': { name: '香港岛', days: 5, popular: true },
            'KOWLOON': { name: '九龙', days: 5, popular: true },
            'NT': { name: '新界', days: 5, popular: false }
        }
    },
    'SG': {
        name: '新加坡',
        flag: '🇸🇬',
        region: '亚洲',
        currency: 'SGD',
        language: ['英文', '中文', '马来文', '泰米尔文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['新年', '春节', '耶稣受难日', '劳动节', '卫塞节', '开斋节', '国庆日', '屠厖节', '圣诞节'],
        taxRate: '17%',
        minCapital: 'SGD 1',
        description: '亚洲金融中心，营商环境优越',
        advantages: ['政治稳定', '税务优惠', '国际声誉好', '基础设施完善'],
        avgSetupDays: 8,
        companyTypes: [
            { value: 'PteLtd', label: 'Private Limited (私人有限公司) - Pte Ltd', popular: true },
            { value: 'PublicLtd', label: 'Public Limited (公众有限公司) - Ltd', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false },
            { value: 'RepOffice', label: 'Representative Office (代表处)', popular: false },
            { value: 'LLP', label: 'Limited Liability Partnership (有限责任合伙) - LLP', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'CENTRAL': { name: '中心区', days: 8, popular: true },
            'MARINA': { name: '滨海湾金融中心', days: 8, popular: true },
            'JURONG': { name: '裕廊工业区', days: 8, popular: false }
        }
    },
    'JP': {
        name: '日本',
        flag: '🇯🇵',
        region: '亚洲',
        currency: 'JPY',
        language: ['日文'],
        timezone: 'GMT+9',
        workingDays: 5,
        holidays: ['元旦', '成人节', '建国纪念日', '春分', '昭和日', '宪法纪念日', '绿之日', '儿童节', '海之日', '山之日', '敬老日', '秋分', '体育节', '文化节', '勤劳感谢日'],
        taxRate: '23.2%',
        minCapital: 'JPY 1',
        description: '亚洲第二大经济体，技术先进',
        advantages: ['市场成熟', '技术领先', '法律完善', '信誉度高'],
        avgSetupDays: 14,
        companyTypes: [
            { value: 'KK', label: 'Kabushiki Kaisha - 株式会社 (Stock Company)', popular: true },
            { value: 'GK', label: 'Godo Kaisha - 合同会社 (Limited Liability Company)', popular: true },
            { value: 'YK', label: 'Yugen Kaisha - 有限会社 (Limited Company, discontinued)', popular: false },
            { value: 'Branch', label: 'Branch Office (支店)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'TOKYO': { name: '东京 (Tokyo)', days: 14, popular: true, description: '首都，经济中心' },
            'OSAKA': { name: '大阪 (Osaka)', days: 14, popular: true, description: '商业中心，关西门户' },
            'NAGOYA': { name: '名古屋 (Nagoya)', days: 14, popular: false, description: '工业中心，汽车产业' },
            'FUKUOKA': { name: '福冈 (Fukuoka)', days: 14, popular: false, description: '九州中心，创业友好' }
        }
    },
    'KR': {
        name: '韩国',
        flag: '🇰🇷',
        region: '亚洲',
        currency: 'KRW',
        language: ['韩文'],
        timezone: 'GMT+9',
        workingDays: 5,
        holidays: ['新年', '春节', '三一节', '儿童节', '佛诞节', '显忠日', '光复节', '中秋节', '开天节', '圣诞节'],
        taxRate: '10%-25%',
        minCapital: 'KRW 100',
        description: '高科技产业发达，韩流文化影响力大',
        advantages: ['创新能力强', '电子商务发达', '文化产业', 'FTA覆盖广'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'Chusik', label: 'Chusik Hoesa - 주식회사 (Stock Company)', popular: true },
            { value: 'Yuhan', label: 'Yuhan Hoesa - 유한회사 (Limited Liability Company)', popular: true },
            { value: 'Branch', label: 'Branch Office (지점)', popular: false },
            { value: 'RepOffice', label: 'Representative Office (연락사무소)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'SEOUL': { name: '首尔 (Seoul)', days: 10, popular: true, description: '首都，经济中心' },
            'BUSAN': { name: '釜山 (Busan)', days: 10, popular: true, description: '第二大城市，港口中心' },
            'INCHEON': { name: '仁川 (Incheon)', days: 10, popular: false, description: '自贸区，国际机场' },
            'DAEGU': { name: '大邱 (Daegu)', days: 10, popular: false, description: '纺织产业，制造业' }
        }
    },
    'MY': {
        name: '马来西亚',
        flag: '🇲🇾',
        region: '亚洲',
        currency: 'MYR',
        language: ['马来文', '英文', '中文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['新年', '春节', '劳动节', '卫塞节', '国庆日', '哈芝节', '屠妦节', '圣诞节'],
        taxRate: '24%',
        minCapital: 'MYR 1',
        description: '东南亚新兴市场，华人众多',
        advantages: ['成本较低', '语言便利', '地理位置好', '政策优惠'],
        avgSetupDays: 12,
        companyTypes: [
            { value: 'SdnBhd', label: 'Sendirian Berhad (Private Limited) - Sdn Bhd', popular: true },
            { value: 'Berhad', label: 'Berhad (Public Limited)', popular: false },
            { value: 'LLP', label: 'Limited Liability Partnership (LLP)', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'KL': { name: '吉隆坡 (Kuala Lumpur)', days: 12, popular: true, description: '首都，金融中心' },
            'JB': { name: '新山 (Johor Bahru)', days: 12, popular: true, description: '邻近新加坡，制造业' },
            'PG': { name: '槟城 (Penang)', days: 12, popular: true, description: '电子产业中心' },
            'LABUAN': { name: '纳闽 (Labuan)', days: 12, popular: false, description: '离岸金融中心，低税' }
        }
    },
    'TH': {
        name: '泰国',
        flag: '🇹🇭',
        region: '亚洲',
        currency: 'THB',
        language: ['泰文', '英文'],
        timezone: 'GMT+7',
        workingDays: 5,
        holidays: ['新年', '万佛节', '泼水节', '劳动节', '国王诞辰日', '宋干节', '守夏节'],
        taxRate: '20%',
        minCapital: 'THB 1,000,000',
        description: '东南亚制造业中心，旅游业发达',
        advantages: ['劳动力成本低', '旅游市场大', '制造业基础好', 'BOI优惠政策'],
        avgSetupDays: 15,
        companyTypes: [
            { value: 'Limited', label: 'Limited Company (有限公司) - Co. Ltd', popular: true },
            { value: 'PublicLtd', label: 'Public Limited Company (公众有限公司) - PLC', popular: false },
            { value: 'Partnership', label: 'Partnership (合伙企业)', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'BKK': { name: '曼谷 (Bangkok)', days: 15, popular: true, description: '首都，经济中心' },
            'CNX': { name: '清迈 (Chiang Mai)', days: 15, popular: true, description: '北部中心，数字游民' },
            'PHUKET': { name: '普吉 (Phuket)', days: 15, popular: false, description: '旅游业中心' },
            'SRIRACHA': { name: '春武里 (Sriracha)', days: 15, popular: false, description: '制造业中心，工业区' }
        }
    },
    'VN': {
        name: '越南',
        flag: '🇻🇳',
        region: '亚洲',
        currency: 'VND',
        language: ['越南文', '英文'],
        timezone: 'GMT+7',
        workingDays: 5,
        holidays: ['新年', '春节', '雄王节', '统一日', '劳动节', '国庆日'],
        taxRate: '20%',
        minCapital: 'VND 1',
        description: '东南亚新兴制造基地，经济增长快',
        advantages: ['人口红利', '制造业转移', '成本优势', '政策开放'],
        avgSetupDays: 18,
        companyTypes: [
            { value: 'LLC', label: 'Limited Liability Company (有限责任公司) - LLC', popular: true },
            { value: 'JSC', label: 'Joint Stock Company (股份公司) - JSC', popular: true },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false },
            { value: 'RepOffice', label: 'Representative Office (代表处)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'HCM': { name: '胡志明市 (Ho Chi Minh)', days: 18, popular: true, description: '经济中心，最大城市' },
            'HN': { name: '河内 (Hanoi)', days: 18, popular: true, description: '首都，政治中心' },
            'DN': { name: '岐港 (Da Nang)', days: 18, popular: false, description: '中部中心，港口城市' },
            'BINH': { name: '平阳 (Binh Duong)', days: 18, popular: false, description: '工业区，制造业' }
        }
    },
    'IN': {
        name: '印度',
        flag: '🇮🇳',
        region: '亚洲',
        currency: 'INR',
        language: ['印地文', '英文'],
        timezone: 'GMT+5:30',
        workingDays: 6,
        holidays: ['共和国日', '独立日', '甝地诞辰', '排灯节', '洒红节', '开斋节'],
        taxRate: '25%-30%',
        minCapital: 'INR 1',
        description: '全球第五大经济体，人口市场巨大',
        advantages: ['市场潜力大', 'IT产业发达', '人力资源丰富', '英语普及'],
        avgSetupDays: 20,
        companyTypes: [
            { value: 'PrivateLtd', label: 'Private Limited Company (私人有限公司) - Pvt Ltd', popular: true },
            { value: 'PublicLtd', label: 'Public Limited Company (公众有限公司) - Ltd', popular: true },
            { value: 'LLP', label: 'Limited Liability Partnership (LLP)', popular: false },
            { value: 'OPC', label: 'One Person Company (一人公司) - OPC', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'MUM': { name: '孟买 (Mumbai)', days: 20, popular: true, description: '金融中心，最大城市' },
            'BLR': { name: '班加罗尔 (Bangalore)', days: 20, popular: true, description: 'IT中心，印度硅谷' },
            'DEL': { name: '德里 (Delhi)', days: 20, popular: true, description: '首都，政治中心' },
            'HYD': { name: '海得拉巴 (Hyderabad)', days: 20, popular: false, description: 'IT产业，制药中心' }
        }
    },
    'ID': {
        name: '印度尼西亚',
        flag: '🇮🇩',
        region: '亚洲',
        currency: 'IDR',
        language: ['印尼文', '英文'],
        timezone: 'GMT+7',
        workingDays: 5,
        holidays: ['新年', '开斋节', '古尔邦节', '伊斯兰新年', '独立日', '圣诞节'],
        taxRate: '22%',
        minCapital: 'IDR 1',
        description: '东南亚最大经济体，人口第四',
        advantages: ['人口众多', '资源丰富', '市场潜力', '战略位置'],
        avgSetupDays: 21,
        companyTypes: [
            { value: 'PT', label: 'Perseroan Terbatas - PT (Limited Liability Company)', popular: true },
            { value: 'PTPMA', label: 'PT PMA (Foreign Investment Company)', popular: true },
            { value: 'CV', label: 'Commanditaire Vennootschap - CV (Limited Partnership)', popular: false },
            { value: 'Branch', label: 'Branch Office (Kantor Cabang)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'JKT': { name: '雅加达 (Jakarta)', days: 21, popular: true, description: '首都，经济中心' },
            'SBY': { name: '泗水 (Surabaya)', days: 21, popular: true, description: '第二大城市，工业中心' },
            'BDG': { name: '万隆 (Bandung)', days: 21, popular: false, description: '科技产业，创业中心' },
            'BATAM': { name: '巴淡 (Batam)', days: 21, popular: false, description: '自贸区，邻近新加坡' }
        }
    },
    'PH': {
        name: '菲律宾',
        flag: '🇵🇭',
        region: '亚洲',
        currency: 'PHP',
        language: ['菲律宾文', '英文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['新年', '人民力量革命纪念日', '耶穣受难日', '劳动节', '独立日', '国庆日', '万圣节', '圣诞节'],
        taxRate: '25%-30%',
        minCapital: 'PHP 1',
        description: '英语国家，BPO产业发达',
        advantages: ['英语熟练', '劳动力充足', '成本低', '美国关系'],
        avgSetupDays: 16,
        companyTypes: [
            { value: 'Corp', label: 'Stock Corporation (股份有限公司)', popular: true },
            { value: 'LLC', label: 'One Person Corporation (一人公司) - OPC', popular: true },
            { value: 'Partnership', label: 'Partnership (合伙企业)', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'MNL': { name: '马尼拉 (Manila)', days: 16, popular: true, description: '首都，经济中心' },
            'CEBU': { name: '宿务 (Cebu)', days: 16, popular: true, description: 'BPO中心，旅游业' },
            'CLARK': { name: '克拉克 (Clark)', days: 16, popular: false, description: '经济特区，自贸区' },
            'DAVAO': { name: '达沃 (Davao)', days: 16, popular: false, description: '南部中心，农业' }
        }
    },
    'TW': {
        name: '中国台湾',
        flag: '🇨🇳',
        region: '亚洲',
        currency: 'TWD',
        language: ['中文'],
        timezone: 'GMT+8',
        workingDays: 5,
        holidays: ['元旦', '春节', '和平纪念日', '清明节', '劳动节', '端午节', '中秋节', '国庆日'],
        taxRate: '20%',
        minCapital: 'TWD 1',
        description: '高科技产业发达，半导体全球领先',
        advantages: ['科技优势', '制造业强', '地理位置', '文化相近'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'Limited', label: 'Company Limited by Shares (有限公司)', popular: true },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false },
            { value: 'RepOffice', label: 'Representative Office (代表处)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'TPE': { name: '台北 (Taipei)', days: 10, popular: true, description: '首都，金融中心' },
            'HSC': { name: '新竹 (Hsinchu)', days: 10, popular: true, description: '科学园区，半导体' },
            'TXG': { name: '台中 (Taichung)', days: 10, popular: false, description: '中部中心，制造业' },
            'KHH': { name: '高雄 (Kaohsiung)', days: 10, popular: false, description: '南部中心，港口城市' }
        }
    },
    'AE': {
        name: '阿联酋',
        flag: '🇦🇪',
        region: '中东',
        currency: 'AED',
        language: ['阿拉伯文', '英文'],
        timezone: 'GMT+4',
        workingDays: 5,
        holidays: ['新年', '开斋节', '古尔邦节', '伊斯兰新年', '国庆日'],
        taxRate: '0%-9%',
        minCapital: 'AED 1,000',
        description: '中东金融和贸易中心，迪拜自贸区',
        advantages: ['零税收（自贸区）', '战略位置', '基础设施好', '国际化程度高'],
        avgSetupDays: 8,
        companyTypes: [
            { value: 'FZE', label: 'Free Zone Establishment (自贸区企业) - FZE', popular: true },
            { value: 'FZCO', label: 'Free Zone Company (自贸区公司) - FZCO', popular: true },
            { value: 'LLC', label: 'Limited Liability Company - LLC', popular: true },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'DXB': { name: '迪拜 (Dubai)', days: 8, popular: true, description: '金融中心，自贸区' },
            'AUH': { name: '阿布扎比 (Abu Dhabi)', days: 8, popular: true, description: '首都，能源中心' },
            'SHJ': { name: '沙迦 (Sharjah)', days: 8, popular: false, description: '制造业，成本低' },
            'RAK': { name: '哈伊马角 (Ras Al Khaimah)', days: 8, popular: false, description: '离岸区，低成本' }
        }
    },

    // ========== 欧洲地区 ==========
    'UK': {
        name: '英国',
        flag: '🇬🇧',
        region: '欧洲',
        currency: 'GBP',
        language: ['英文'],
        timezone: 'GMT+0',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '五月初银行假日', '春季银行假日', '夏季银行假日', '圣诞节', '节礼日'],
        taxRate: '19%',
        minCapital: '£1',
        description: '欧洲金融中心，法律制度完善',
        advantages: ['法律健全', '金融发达', '国际认可度高', '英语国家'],
        avgSetupDays: 6,
        companyTypes: [
            { value: 'Limited', label: 'Private Limited Company (私人有限公司) - Ltd', popular: true },
            { value: 'PLC', label: 'Public Limited Company (公众有限公司) - PLC', popular: false },
            { value: 'LLP', label: 'Limited Liability Partnership (有限责任合伙) - LLP', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'LONDON': { name: '伦敦 (London)', days: 6, popular: true, description: '金融中心，国际化' },
            'MANCHESTER': { name: '曼彻斯特 (Manchester)', days: 6, popular: false, description: '北部中心，科技产业' },
            'EDINBURGH': { name: '爱丁堡 (Edinburgh)', days: 6, popular: false, description: '苏格兰首府，金融中心' },
            'BIRMINGHAM': { name: '伯明翰 (Birmingham)', days: 6, popular: false, description: '工业中心' }
        }
    },
    'DE': {
        name: '德国',
        flag: '🇩🇪',
        region: '欧洲',
        currency: 'EUR',
        language: ['德文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '耶穣受难日', '复活节', '劳动节', '耶穣升天日', '圣灵降临节', '德国统一日', '圣诞节'],
        taxRate: '15%-30%',
        minCapital: 'EUR 25,000',
        description: '欧洲经济引擎，工业强国',
        advantages: ['欧盟市场', '工业发达', '技术先进', '信誉度高'],
        avgSetupDays: 14,
        companyTypes: [
            { value: 'GmbH', label: 'Gesellschaft mit beschränkter Haftung - GmbH (有限责任公司)', popular: true },
            { value: 'UG', label: 'Unternehmergesellschaft - UG (创业公司)', popular: true },
            { value: 'AG', label: 'Aktiengesellschaft - AG (股份公司)', popular: false },
            { value: 'Branch', label: 'Branch Office (Zweigniederlassung)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'BER': { name: '柏林 (Berlin)', days: 14, popular: true, description: '首都，创业中心' },
            'FRA': { name: '法兰克福 (Frankfurt)', days: 14, popular: true, description: '金融中心，ECB所在地' },
            'MUC': { name: '慕尼黑 (Munich)', days: 14, popular: true, description: '科技中心，生活质量高' },
            'HAM': { name: '汉堡 (Hamburg)', days: 14, popular: false, description: '港口城市，物流中心' }
        }
    },
    'FR': {
        name: '法国',
        flag: '🇫🇷',
        region: '欧洲',
        currency: 'EUR',
        language: ['法文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '复活节', '劳动节', '二战胜利日', '耶穣升天日', '国庆日', '圣母升天日', '万圣节', '一战停战日', '圣诞节'],
        taxRate: '25%-31%',
        minCapital: 'EUR 1',
        description: '欧洲第二大经济体，奢侈品之都',
        advantages: ['欧盟核心', '消费市场大', '品牌影响力', '创新能力'],
        avgSetupDays: 12,
        companyTypes: [
            { value: 'SARL', label: 'Société à Responsabilité Limitée - SARL (有限责任公司)', popular: true },
            { value: 'SAS', label: 'Société par Actions Simplifiée - SAS (简化股份公司)', popular: true },
            { value: 'SA', label: 'Société Anonyme - SA (匿名股份公司)', popular: false },
            { value: 'Branch', label: 'Branch Office (Succursale)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'PAR': { name: '巴黎 (Paris)', days: 12, popular: true, description: '首都，时尚之都' },
            'LYO': { name: '里昂 (Lyon)', days: 12, popular: false, description: '第二大城市，美食之都' },
            'MAR': { name: '马赛 (Marseille)', days: 12, popular: false, description: '港口城市，地中海门户' },
            'NCE': { name: '尼斯 (Nice)', days: 12, popular: false, description: '旅游业，科技园区' }
        }
    },
    'IE': {
        name: '爱尔兰',
        flag: '🇮🇪',
        region: '欧洲',
        currency: 'EUR',
        language: ['英文', '爱尔兰文'],
        timezone: 'GMT+0',
        workingDays: 5,
        holidays: ['新年', '圣帕特里克节', '耶穣受难日', '复活节', '五月银行假日', '六月银行假日', '八月银行假日', '十月银行假日', '圣诞节', '节礼日'],
        taxRate: '12.5%',
        minCapital: 'EUR 1',
        description: '欧洲低税天堂，科技公司首选',
        advantages: ['低税率', '欧盟成员', '英语国家', '科技友好'],
        avgSetupDays: 8,
        companyTypes: [
            { value: 'Limited', label: 'Private Company Limited by Shares - Ltd', popular: true },
            { value: 'DAC', label: 'Designated Activity Company - DAC', popular: false },
            { value: 'Branch', label: 'Branch Office', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'DUB': { name: '都柏林 (Dublin)', days: 8, popular: true, description: '首都，科技中心' },
            'CORK': { name: '科克 (Cork)', days: 8, popular: false, description: '第二大城市，医药中心' },
            'GAL': { name: '高威 (Galway)', days: 8, popular: false, description: '西部中心，创业友好' }
        }
    },
    'NL': {
        name: '荷兰',
        flag: '🇳🇱',
        region: '欧洲',
        currency: 'EUR',
        language: ['荷兰文', '英文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '耶穣受难日', '复活节', '国王节', '解放日', '耶穣升天日', '圣灵降临节', '圣诞节', '节礼日'],
        taxRate: '15%-25.8%',
        minCapital: 'EUR 0.01',
        description: '欧洲门户，物流中心',
        advantages: ['地理位置优', '物流发达', '税务优惠', '英语普及'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'BV', label: 'Besloten Vennootschap - BV (私人有限公司)', popular: true },
            { value: 'NV', label: 'Naamloze Vennootschap - NV (公众有限公司)', popular: false },
            { value: 'Branch', label: 'Branch Office (Filiaal)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'AMS': { name: '阿姆斯特丹 (Amsterdam)', days: 10, popular: true, description: '首都，金融中心' },
            'RTM': { name: '鹿特丹 (Rotterdam)', days: 10, popular: true, description: '欧洲最大港口' },
            'EIN': { name: '埃因霍温 (Eindhoven)', days: 10, popular: false, description: '科技中心，设计之都' }
        }
    },
    'CH': {
        name: '瑞士',
        flag: '🇨🇭',
        region: '欧洲',
        currency: 'CHF',
        language: ['德文', '法文', '意大利文', '罗曼什文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '耶穣受难日', '复活节', '耶穣升天日', '圣灵降临节', '国庆日', '圣诞节'],
        taxRate: '8.5%-21%',
        minCapital: 'CHF 100,000',
        description: '全球金融中心，隐私保护严格',
        advantages: ['政治稳定', '银行保密', '低税率', '生活质量高'],
        avgSetupDays: 15,
        companyTypes: [
            { value: 'GmbH', label: 'Gesellschaft mit beschränkter Haftung - GmbH', popular: true },
            { value: 'AG', label: 'Aktiengesellschaft - AG (股份公司)', popular: true },
            { value: 'Branch', label: 'Branch Office (Zweigniederlassung)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'ZRH': { name: '苏黎世 (Zurich)', days: 15, popular: true, description: '金融中心，最大城市' },
            'GVA': { name: '日内瓦 (Geneva)', days: 15, popular: true, description: '国际组织中心' },
            'BAS': { name: '巴塞尔 (Basel)', days: 15, popular: false, description: '制药中心' },
            'ZUG': { name: '楚格 (Zug)', days: 15, popular: false, description: '低税州，加密货币' }
        }
    },
    'LU': {
        name: '卢森堡',
        flag: '🇱🇺',
        region: '欧洲',
        currency: 'EUR',
        language: ['卢森堡文', '法文', '德文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '复活节', '劳动节', '欧洲日', '耶稣升天日', '圣灵降临节', '国庆日', '圣母升天日', '万圣节', '圣诞节'],
        taxRate: '17%-24%',
        minCapital: 'EUR 12,000',
        description: '欧洲金融中心，基金天堂',
        advantages: ['金融专业', '税务优惠', '欧盟核心', '基金注册'],
        avgSetupDays: 12,
        companyTypes: [
            { value: 'SARL', label: 'Société à Responsabilité Limitée - Sàrl (有限责任公司)', popular: true },
            { value: 'SA', label: 'Société Anonyme - SA (股份公司)', popular: true },
            { value: 'SOPARFI', label: 'Holding Company (控股公司) - SOPARFI', popular: false }
        ]
    },
    'MT': {
        name: '马耳他',
        flag: '🇲🇹',
        region: '欧洲',
        currency: 'EUR',
        language: ['马耳他文', '英文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '圣保禄船难日', '圣若瑟日', '耶稣受难日', '自由日', '劳动节', '独立日', '圣母升天日', '共和国日', '圣诞节'],
        taxRate: '5%-35%',
        minCapital: 'EUR 1,165',
        description: '欧洲离岸中心，税务优惠',
        advantages: ['欧盟成员', '英语国家', '税务返还', '博彩牌照'],
        avgSetupDays: 14,
        companyTypes: [
            { value: 'Limited', label: 'Private Limited Company - Ltd', popular: true },
            { value: 'PLC', label: 'Public Limited Company - PLC', popular: false },
            { value: 'Branch', label: 'Branch Office', popular: false }
        ]
    },
    'CY': {
        name: '塞浦路斯',
        flag: '🇨🇾',
        region: '欧洲',
        currency: 'EUR',
        language: ['希腊文', '土耳其文', '英文'],
        timezone: 'GMT+2',
        workingDays: 5,
        holidays: ['新年', '主显节', '净星期一', '希腊独立日', '塞浦路斯国庆日', '复活节', '劳动节', '圣灵降临节', '圣母升天日', '塞浦路斯独立日', '圣诞节'],
        taxRate: '12.5%',
        minCapital: 'EUR 1',
        description: '欧洲低税中心，俄罗斯门户',
        advantages: ['低税率', '欧盟成员', '英语普及', '双重税收协定'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'Limited', label: 'Private Limited Company - Ltd', popular: true },
            { value: 'PublicLtd', label: 'Public Limited Company - PLC', popular: false },
            { value: 'Branch', label: 'Branch Office', popular: false }
        ]
    },
    'IT': {
        name: '意大利',
        flag: '🇮🇹',
        region: '欧洲',
        currency: 'EUR',
        language: ['意大利文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '主显节', '复活节', '解放日', '劳动节', '共和国日', '圣母升天日', '万圣节', '圣诞节', '圣斯德望日'],
        taxRate: '24%-27.9%',
        minCapital: 'EUR 10,000',
        description: '欧洲第三大经济体，奢侈品产业',
        advantages: ['欧盟市场', '制造业强', '品牌效应', '文化影响'],
        avgSetupDays: 16,
        companyTypes: [
            { value: 'SRL', label: 'Società a Responsabilità Limitata - SRL (有限责任公司)', popular: true },
            { value: 'SPA', label: 'Società per Azioni - SpA (股份公司)', popular: true },
            { value: 'Branch', label: 'Branch Office (Succursale)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'ROM': { name: '罗马 (Rome)', days: 16, popular: true, description: '首都，文化之都' },
            'MIL': { name: '米兰 (Milan)', days: 16, popular: true, description: '时尚之都，金融中心' },
            'FLO': { name: '佛罗伦萨 (Florence)', days: 16, popular: false, description: '艺术之都，手工业' },
            'TUR': { name: '都灵 (Turin)', days: 16, popular: false, description: '工业中心，汽车产业' }
        }
    },
    'ES': {
        name: '西班牙',
        flag: '🇪🇸',
        region: '欧洲',
        currency: 'EUR',
        language: ['西班牙文'],
        timezone: 'GMT+1',
        workingDays: 5,
        holidays: ['新年', '主显节', '耶穣受难日', '劳动节', '圣母升天日', '国庆日', '万圣节', '宪法日', '圣母无染原罪日', '圣诞节'],
        taxRate: '25%',
        minCapital: 'EUR 3,000',
        description: '欧洲第四大经济体，拉美门户',
        advantages: ['欧盟市场', '拉美联系', '旅游业发达', '语言优势'],
        avgSetupDays: 14,
        companyTypes: [
            { value: 'SL', label: 'Sociedad Limitada - SL (有限公司)', popular: true },
            { value: 'SA', label: 'Sociedad Anónima - SA (股份公司)', popular: true },
            { value: 'Branch', label: 'Branch Office (Sucursal)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'MAD': { name: '马德里 (Madrid)', days: 14, popular: true, description: '首都，经济中心' },
            'BCN': { name: '巴塞罗那 (Barcelona)', days: 14, popular: true, description: '科技中心，创业友好' },
            'VAL': { name: '瓦伦西亚 (Valencia)', days: 14, popular: false, description: '港口城市，制造业' },
            'SEV': { name: '塞维利亚 (Seville)', days: 14, popular: false, description: '文化中心，旅游业' }
        }
    },

    // ========== 美洲地区 ==========
    'US': {
        name: '美国',
        flag: '🇺🇸',
        region: '美洲',
        currency: 'USD',
        language: ['英文'],
        timezone: 'GMT-5至GMT-10',
        workingDays: 5,
        holidays: ['新年', '马丁·路德·金日', '总统日', '阵亡将士纪念日', '独立日', '劳动节', '感恩节', '圣诞节'],
        taxRate: '21%（联邦）',
        minCapital: '各州不同',
        description: '全球最大经济体，商业机会多',
        advantages: ['市场巨大', '融资便利', '法律保护', '品牌效应'],
        avgSetupDays: 12,
        companyTypes: [
            { value: 'LLC', label: 'Limited Liability Company (有限责任公司) - LLC', popular: true },
            { value: 'Corp', label: 'Corporation (股份有限公司) - Corp / Inc', popular: true },
            { value: 'SCorp', label: 'S Corporation (S型公司) - S-Corp', popular: false },
            { value: 'Branch', label: 'Branch Office (分公司)', popular: false },
            { value: 'LLP', label: 'Limited Liability Partnership (有限责任合伙) - LLP', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'DE': { name: '特拉华州 (Delaware)', days: 2, tax: '无州税', popular: true, description: '最佳注册地，公司法完善' },
            'WY': { name: '怀俄明州 (Wyoming)', days: 4, tax: '无州税', popular: true, description: '隐私保护好，低成本' },
            'NV': { name: '内华达州 (Nevada)', days: 6, tax: '无州税', popular: true, description: '无州税，隐私保护' },
            'CA': { name: '加利福尼亚州 (California)', days: 12, tax: '8.84%', popular: true, description: '科技中心，市场巨大' },
            'NY': { name: '纽约州 (New York)', days: 15, tax: '6.5%', popular: true, description: '金融中心，品牌效应' },
            'FL': { name: '佛罗里达州 (Florida)', days: 8, tax: '5.5%', popular: false, description: '无个人所得税，旅游业' },
            'TX': { name: '德克萨斯州 (Texas)', days: 10, tax: '无州税', popular: false, description: '能源中心，无州税' },
            'WA': { name: '华盛顿州 (Washington)', days: 10, tax: '无州税', popular: false, description: '科技产业，无州税' },
            'CO': { name: '科罗拉多州 (Colorado)', days: 12, tax: '4.63%', popular: false, description: '创新中心，生活质量高' },
            'MA': { name: '马萨诸塞州 (Massachusetts)', days: 14, tax: '8%', popular: false, description: '教育中心，生物医药' }
        }
    },
    'CA': {
        name: '加拿大',
        flag: '🇨🇦',
        region: '美洲',
        currency: 'CAD',
        language: ['英文', '法文'],
        timezone: 'GMT-3.5至GMT-8',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '维多利亚日', '加拿大日', '劳动节', '感恩节', '圣诞节', '节礼日'],
        taxRate: '15%-26.5%',
        minCapital: 'CAD 1',
        description: 'G7成员，生活质量高',
        advantages: ['政治稳定', '资源丰富', '移民友好', '邻近美国'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'Inc', label: 'Corporation (Federal) - Inc', popular: true },
            { value: 'Corp', label: 'Corporation (Provincial) - Corp', popular: true },
            { value: 'ULC', label: 'Unlimited Liability Corporation - ULC', popular: false },
            { value: 'Branch', label: 'Branch Office', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'ON': { name: '安大略省-多伦多 (Toronto, ON)', days: 10, popular: true, description: '最大城市，金融中心' },
            'BC': { name: '不列颠哥伦比亚省-温哥华 (Vancouver, BC)', days: 10, popular: true, description: '西海岸中心，亚太门户' },
            'QC': { name: '魁北克省-蒙特利尔 (Montreal, QC)', days: 10, popular: false, description: '法语区，文化中心' },
            'AB': { name: '阿尔伯塔省-卡尔加里 (Calgary, AB)', days: 10, popular: false, description: '能源中心，无省税' }
        }
    },
    'MX': {
        name: '墨西哥',
        flag: '🇲🇽',
        region: '美洲',
        currency: 'MXN',
        language: ['西班牙文'],
        timezone: 'GMT-6至GMT-8',
        workingDays: 5,
        holidays: ['新年', '宪法日', '贝尼托·华雷斯诞辰', '劳动节', '独立日', '革命纪念日', '圣诞节'],
        taxRate: '30%',
        minCapital: 'MXN 3,000',
        description: '拉美第二大经济体，美国门户',
        advantages: ['USMCA成员', '制造业发达', '人口市场大', '成本优势'],
        avgSetupDays: 15,
        companyTypes: [
            { value: 'SA', label: 'Sociedad Anónima - SA (股份公司)', popular: true },
            { value: 'SAPI', label: 'Sociedad Anónima Promotora de Inversión - SAPI', popular: false },
            { value: 'SRL', label: 'Sociedad de Responsabilidad Limitada - SRL', popular: false },
            { value: 'Branch', label: 'Branch Office (Sucursal)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'MEX': { name: '墨西哥城 (Mexico City)', days: 15, popular: true, description: '首都，经济中心' },
            'GDL': { name: '瓜达拉哈拉 (Guadalajara)', days: 15, popular: true, description: '科技中心，IT产业' },
            'MTY': { name: '蒙特雷 (Monterrey)', days: 15, popular: true, description: '工业中心，制造业' },
            'TIJ': { name: '蒂华纳 (Tijuana)', days: 15, popular: false, description: '边境城市，制造业' }
        }
    },
    'BR': {
        name: '巴西',
        flag: '🇧🇷',
        region: '美洲',
        currency: 'BRL',
        language: ['葡萄牙文'],
        timezone: 'GMT-2至GMT-5',
        workingDays: 5,
        holidays: ['新年', '狂欢节', '耶穣受难日', '复活节', '劳动节', '独立日', '圣母显灵日', '万灵节', '共和国日', '黑人意识日', '圣诞节'],
        taxRate: '15%-34%',
        minCapital: 'BRL 1',
        description: '拉美最大经济体，资源大国',
        advantages: ['市场潜力大', '资源丰富', '金砖国家', '区域影响力'],
        avgSetupDays: 25,
        companyTypes: [
            { value: 'Ltda', label: 'Sociedade Limitada - Ltda (有限公司)', popular: true },
            { value: 'SA', label: 'Sociedade Anônima - SA (股份公司)', popular: true },
            { value: 'Branch', label: 'Branch Office (Filial)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'SAO': { name: '圣保罗 (Sao Paulo)', days: 25, popular: true, description: '经济中心，最大城市' },
            'RIO': { name: '里约 (Rio de Janeiro)', days: 25, popular: true, description: '文化中心，旅游业' },
            'BRA': { name: '巴西利亚 (Brasilia)', days: 25, popular: false, description: '首都，政治中心' },
            'MAN': { name: '玛瑙斯 (Manaus)', days: 25, popular: false, description: '自贸区，制造业' }
        }
    },
    'CL': {
        name: '智利',
        flag: '🇨🇱',
        region: '美洲',
        currency: 'CLP',
        language: ['西班牙文'],
        timezone: 'GMT-3至GMT-6',
        workingDays: 5,
        holidays: ['新年', '耶穣受难日', '复活节', '劳动节', '海军节', '圣伯多禄圣保禄节', '圣母升天日', '独立日', '军队日', '哥伦布日', '宗教改革日', '万圣节', '圣母无染原罪日', '圣诞节'],
        taxRate: '25%',
        minCapital: 'CLP 1',
        description: '拉美最稳定经济体，铜矿大国',
        advantages: ['政治稳定', '经济自由', 'FTA网络广', '营商环境好'],
        avgSetupDays: 20,
        companyTypes: [
            { value: 'SA', label: 'Sociedad Anónima - SA (股份公司)', popular: true },
            { value: 'SpA', label: 'Sociedad por Acciones - SpA (简化股份公司)', popular: true },
            { value: 'Ltda', label: 'Sociedad de Responsabilidad Limitada - Ltda', popular: false },
            { value: 'Branch', label: 'Branch Office (Agencia)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'SCL': { name: '圣地亚哥 (Santiago)', days: 20, popular: true, description: '首都，经济中心' },
            'VAL': { name: '瓦尔帕莱索 (Valparaiso)', days: 20, popular: false, description: '港口城市，文化中心' },
            'CON': { name: '康塞普西翁 (Concepcion)', days: 20, popular: false, description: '第二大城市，工业中心' }
        }
    },

    // ========== 大洋洲地区 ==========
    'AU': {
        name: '澳大利亚',
        flag: '🇦🇺',
        region: '大洋洲',
        currency: 'AUD',
        language: ['英文'],
        timezone: 'GMT+8至GMT+10',
        workingDays: 5,
        holidays: ['新年', '澳大利亚日', '耶稣受难日', '复活节', '澳纽军团日', '女王生日', '圣诞节', '节礼日'],
        taxRate: '30%',
        minCapital: 'AUD 1',
        description: '亚太重要经济体，资源丰富',
        advantages: ['经济稳定', '法律健全', '资源丰富', '地理优势'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'PtyLtd', label: 'Proprietary Limited Company - Pty Ltd', popular: true },
            { value: 'PublicLtd', label: 'Public Limited Company - Ltd', popular: false },
            { value: 'Branch', label: 'Branch Office', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'NSW': { name: '新南威尔士州-悉尼 (Sydney, NSW)', days: 10, popular: true, description: '最大城市，金融中心' },
            'VIC': { name: '维多利亚州-墨尔本 (Melbourne, VIC)', days: 10, popular: true, description: '文化中心，创新城市' },
            'QLD': { name: '昆士兰州-布里斯班 (Brisbane, QLD)', days: 10, popular: false, description: '旅游业，自然资源' },
            'WA': { name: '西澳州-珀斯 (Perth, WA)', days: 10, popular: false, description: '矿产资源，能源中心' }
        }
    },
    'NZ': {
        name: '新西兰',
        flag: '🇳🇿',
        region: '大洋洲',
        currency: 'NZD',
        language: ['英文', '毛利文'],
        timezone: 'GMT+12',
        workingDays: 5,
        holidays: ['新年', '怀唐伊日', '耶穣受难日', '复活节', '澳纽军团日', '女王生日', '劳动节', '圣诞节', '节礼日'],
        taxRate: '28%',
        minCapital: 'NZD 1',
        description: '营商环境全球第一，政治清廉',
        advantages: ['营商便利', '政治清廉', '生活质量高', '创新能力强'],
        avgSetupDays: 5,
        companyTypes: [
            { value: 'Limited', label: 'Limited Liability Company - Ltd', popular: true },
            { value: 'LookThrough', label: 'Look-Through Company - LTC', popular: false },
            { value: 'Branch', label: 'Overseas Company (Branch)', popular: false }
        ],
        hasSubRegions: true,
        subRegions: {
            'AKL': { name: '奥克兰 (Auckland)', days: 5, popular: true, description: '最大城市，经济中心' },
            'WLG': { name: '惠灵顿 (Wellington)', days: 5, popular: true, description: '首都，科技中心' },
            'CHC': { name: '基督城 (Christchurch)', days: 5, popular: false, description: '南岛中心' }
        }
    },

    // ========== 离岸金融中心 ==========
    'BVI': {
        name: '英属维尔京群岛',
        flag: '🏝️',
        region: '离岸',
        currency: 'USD',
        language: ['英文'],
        timezone: 'GMT-4',
        workingDays: 5,
        holidays: ['新年', '圣帕特里克节', '复活节', '女王生日', '劳动节', '圣诞节'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '经典离岸中心，保密性强',
        advantages: ['零税率', '高度保密', '快速设立', '无需审计'],
        avgSetupDays: 3,
        companyTypes: [
            { value: 'BC', label: 'Business Company (BVI商业公司) - BC', popular: true },
            { value: 'Limited', label: 'Limited Company (有限公司) - Ltd', popular: false }
        ]
    },
    'Cayman': {
        name: '开曼群岛',
        flag: '🏝️',
        region: '离岸',
        currency: 'KYD',
        language: ['英文'],
        timezone: 'GMT-5',
        workingDays: 5,
        holidays: ['新年', '灰星期三', '耶稣受难日', '复活节', '发现日', '女王生日', '宪法日', '圣诞节'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '顶级离岸金融中心，适合上市架构',
        advantages: ['零税率', '政治稳定', '监管完善', '适合上市架构'],
        avgSetupDays: 5,
        companyTypes: [
            { value: 'ExemptedCompany', label: 'Exempted Company (豁免公司)', popular: true },
            { value: 'OrdinaryCompany', label: 'Ordinary Resident Company (普通居民公司)', popular: false },
            { value: 'LLC', label: 'Limited Liability Company (LLC)', popular: false }
        ]
    },
    'Seychelles': {
        name: '塞舌尔',
        flag: '🇸🇨',
        region: '离岸',
        currency: 'SCR',
        language: ['英文', '法文', '塞舌尔克里奥尔语'],
        timezone: 'GMT+4',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '劳动节', '解放日', '圣体节', '独立日', '圣母升天日', '万圣节', '圣诞节'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '新兴离岸中心，成本低',
        advantages: ['零税率', '注册快速', '成本低', '保密性好'],
        avgSetupDays: 2,
        companyTypes: [
            { value: 'IBC', label: 'International Business Company - IBC', popular: true },
            { value: 'CSL', label: 'Company Special License - CSL', popular: false }
        ]
    },
    'Mauritius': {
        name: '毛里求斯',
        flag: '🇲🇺',
        region: '离岸',
        currency: 'MUR',
        language: ['英文', '法文'],
        timezone: 'GMT+4',
        workingDays: 5,
        holidays: ['新年', '废除奴隶制日', '春节', '大宝森节', '独立日', '劳动节', '圣母升天日', '屠妖节', '万圣节', '圣诞节'],
        taxRate: '3%-15%',
        minCapital: 'USD 1',
        description: '非洲离岸中心，印度门户',
        advantages: ['低税率', '双重税收协定多', '政治稳定', '印度投资首选'],
        avgSetupDays: 7,
        companyTypes: [
            { value: 'GBC1', label: 'Global Business Company Type 1 - GBC1', popular: true },
            { value: 'GBC2', label: 'Global Business Company Type 2 - GBC2', popular: false }
        ]
    },
    'Samoa': {
        name: '萨摩亚',
        flag: '🇼🇸',
        region: '离岸',
        currency: 'WST',
        language: ['萨摩亚文', '英文'],
        timezone: 'GMT+13',
        workingDays: 5,
        holidays: ['新年', '耶稣受难日', '复活节', '澳纽军团日', '母亲节', '独立日', '父亲节', '劳动节', '圣诞节', '节礼日'],
        taxRate: '0%',
        minCapital: 'USD 1',
        description: '太平洋离岸中心',
        advantages: ['零税率', '注册简便', '无需审计', '保密性强'],
        avgSetupDays: 3,
        companyTypes: [
            { value: 'IBC', label: 'International Business Company - IBC', popular: true },
            { value: 'Trust', label: 'International Trust', popular: false }
        ]
    },
    'Panama': {
        name: '巴拿马',
        flag: '🇵🇦',
        region: '离岸',
        currency: 'PAB',
        language: ['西班牙文'],
        timezone: 'GMT-5',
        workingDays: 5,
        holidays: ['新年', '殉道者日', '狂欢节', '耶稣受难日', '劳动节', '独立日', '哥伦布日', '国庆日', '圣诞节'],
        taxRate: '0%（境外收入）',
        minCapital: 'USD 10,000',
        description: '拉美离岸中心，运河之国',
        advantages: ['属地税制', '美元流通', '银行保密', '船舶注册'],
        avgSetupDays: 10,
        companyTypes: [
            { value: 'SA', label: 'Sociedad Anónima - SA (股份公司)', popular: true },
            { value: 'Foundation', label: 'Private Interest Foundation (私人利益基金会)', popular: false }
        ]
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

// 通用公司类型配置（用于没有特定配置的国家）
const DEFAULT_COMPANY_TYPES = [
    { value: 'LLC', label: 'Limited Liability Company (有限责任公司) - LLC', popular: true },
    { value: 'Corp', label: 'Corporation (股份有限公司) - Corp', popular: true },
    { value: 'Limited', label: 'Private Limited (私人有限公司) - Ltd', popular: true },
    { value: 'Branch', label: 'Branch (分公司)', popular: false }
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
