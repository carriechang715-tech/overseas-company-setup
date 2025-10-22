// 设立流程步骤配置

const SETUP_PROCESSES = {
    'HK': {
        supplier_a: [
            {
                step: 1,
                name: '名称查册',
                description: '检查公司名称是否可用，提交公司名称申请',
                duration: 1,
                documents: ['公司名称备选（2-3个）'],
                requirements: ['名称不能与现有公司重复', '不能包含敏感词汇'],
                risks: ['名称被占用需重新提交'],
                deliverables: ['名称预留通知书']
            },
            {
                step: 2,
                name: '准备注册文件',
                description: '起草公司章程、股东董事决议等文件',
                duration: 1,
                documents: ['公司章程', '首任董事同意书', '注册地址证明'],
                requirements: ['所有股东董事签字', '文件需公证认证'],
                risks: ['文件不全影响进度', '签字不规范需重签'],
                deliverables: ['完整注册申请文件']
            },
            {
                step: 3,
                name: '提交公司注册处',
                description: '向香港公司注册处提交注册申请',
                duration: 2,
                documents: ['注册申请表（NNC1）', '公司章程', '董事股东资料'],
                requirements: ['缴纳注册费用', '提供注册地址'],
                risks: ['审核不通过需补充材料'],
                deliverables: ['公司注册处受理通知']
            },
            {
                step: 4,
                name: '获取注册证书',
                description: '公司注册处核准后颁发注册证书',
                duration: 1,
                documents: [],
                requirements: [],
                risks: [],
                deliverables: ['公司注册证书（CI）', '商业登记证（BR）']
            },
            {
                step: 5,
                name: '刻制印章',
                description: '刻制公司印章（圆章、长方章、钢印）',
                duration: 1,
                documents: [],
                requirements: ['提供注册证书'],
                risks: [],
                deliverables: ['公司印章套装']
            },
            {
                step: 6,
                name: '文件国际快递',
                description: '将全套公司文件快递至客户指定地址',
                duration: null,  // 将通过快递API计算
                fromCountry: 'HK',
                documents: ['注册证书', '印章', '公司章程', '会议记录'],
                requirements: ['提供准确收件地址'],
                risks: ['国际快递可能延误', '清关可能需要额外时间'],
                deliverables: ['完整公司设立文件包']
            }
        ],
        supplier_c: [
            // 类似结构，略微不同的时间和服务
            {
                step: 1,
                name: '免费名称查册',
                description: '快速查册公司名称，确认可用性',
                duration: 0.5,
                documents: ['公司名称'],
                requirements: [],
                risks: [],
                deliverables: ['名称可用性报告']
            },
            {
                step: 2,
                name: '签署服务协议',
                description: '签署委托协议，支付服务费用',
                duration: 1,
                documents: ['委托协议', '身份证明'],
                requirements: ['支付定金'],
                risks: [],
                deliverables: ['服务协议']
            },
            {
                step: 3,
                name: '文件准备与公证',
                description: '准备全套注册文件并办理公证',
                duration: 2,
                documents: ['股东董事资料', '地址证明'],
                requirements: ['所有文件需公证'],
                risks: ['公证时间可能延长'],
                deliverables: ['公证文件']
            },
            {
                step: 4,
                name: '政府注册',
                description: '提交香港公司注册处并缴费',
                duration: 1,
                documents: [],
                requirements: [],
                risks: [],
                deliverables: ['注册受理通知']
            },
            {
                step: 5,
                name: '领取证书与印章',
                description: '获取注册证书并刻制印章',
                duration: 1,
                documents: [],
                requirements: [],
                risks: [],
                deliverables: ['注册证书', '印章']
            },
            {
                step: 6,
                name: '国际快递邮寄',
                description: '快递公司全套文件',
                duration: null,
                fromCountry: 'HK',
                documents: ['全套公司文件'],
                requirements: [],
                risks: ['快递延误风险'],
                deliverables: ['公司文件包']
            }
        ]
    },
    'SG': {
        supplier_a: [
            {
                step: 1,
                name: '名称核准',
                description: '向ACRA提交公司名称申请',
                duration: 1,
                documents: ['公司名称'],
                requirements: ['符合新加坡命名规则'],
                risks: ['名称可能被拒'],
                deliverables: ['名称核准通知']
            },
            {
                step: 2,
                name: '准备注册文件',
                description: '准备公司章程、股东决议等',
                duration: 2,
                documents: ['公司章程', '股东资料', '董事资料'],
                requirements: ['至少一名本地董事', '本地注册地址'],
                risks: ['本地董事需额外安排'],
                deliverables: ['注册申请文件']
            },
            {
                step: 3,
                name: 'ACRA注册',
                description: '在线提交ACRA注册申请',
                duration: 3,
                documents: ['完整注册表格', '身份证明'],
                requirements: ['缴纳注册费'],
                risks: ['审核可能要求补充材料'],
                deliverables: ['公司注册证书（ACRA）']
            },
            {
                step: 4,
                name: '税务登记',
                description: '向IRAS办理税务登记',
                duration: 1,
                documents: ['公司注册证书'],
                requirements: [],
                risks: [],
                deliverables: ['税号']
            },
            {
                step: 5,
                name: '刻制印章',
                description: '制作公司印章',
                duration: 1,
                documents: [],
                requirements: [],
                risks: [],
                deliverables: ['公司印章']
            },
            {
                step: 6,
                name: '国际快递',
                description: '邮寄全套文件',
                duration: null,
                fromCountry: 'SG',
                documents: ['注册证书', '印章', '章程'],
                requirements: [],
                risks: ['国际快递延误'],
                deliverables: ['公司文件包']
            }
        ]
    },
    'US': {
        supplier_b: [
            {
                step: 1,
                name: '州名称检索',
                description: '在目标州检查公司名称可用性',
                duration: 1,
                documents: ['公司名称'],
                requirements: ['符合州命名规则'],
                risks: ['名称被占用'],
                deliverables: ['名称可用性确认']
            },
            {
                step: 2,
                name: '准备注册文件',
                description: '起草Articles of Incorporation/Organization',
                duration: 2,
                documents: ['公司章程', '股东资料'],
                requirements: ['指定注册代理'],
                risks: [],
                deliverables: ['注册文件']
            },
            {
                step: 3,
                name: '州政府注册',
                description: '向州务卿办公室提交注册',
                duration: null,  // 根据州不同
                stateDependent: true,
                documents: ['Articles of Incorporation'],
                requirements: ['缴纳州注册费'],
                risks: ['处理时间因州而异'],
                deliverables: ['州注册证书']
            },
            {
                step: 4,
                name: '申请EIN',
                description: '向IRS申请雇主识别号',
                duration: 3,
                documents: ['公司注册证书'],
                requirements: ['有效的注册地址'],
                risks: ['IRS处理时间可能延长'],
                deliverables: ['EIN号码']
            },
            {
                step: 5,
                name: '银行开户准备',
                description: '准备银行开户所需文件',
                duration: 1,
                documents: ['注册证书', 'EIN', '公司章程'],
                requirements: [],
                risks: [],
                deliverables: ['开户文件包']
            },
            {
                step: 6,
                name: '国际快递',
                description: '邮寄公司文件',
                duration: null,
                fromCountry: 'US',
                documents: ['注册证书', 'EIN', '章程'],
                requirements: [],
                risks: ['国际快递时间'],
                deliverables: ['文件包']
            }
        ]
    },
    'UK': {
        supplier_b: [
            {
                step: 1,
                name: '名称检查',
                description: '在Companies House检查名称',
                duration: 1,
                documents: ['公司名称'],
                requirements: [],
                risks: [],
                deliverables: ['名称确认']
            },
            {
                step: 2,
                name: '准备注册文件',
                description: '准备IN01表格和章程',
                duration: 1,
                documents: ['IN01表格', '章程'],
                requirements: ['至少一名董事', '英国注册地址'],
                risks: [],
                deliverables: ['注册文件']
            },
            {
                step: 3,
                name: 'Companies House注册',
                description: '提交在线注册申请',
                duration: 3,
                documents: ['完整表格'],
                requirements: ['缴纳£12注册费'],
                risks: [],
                deliverables: ['公司注册证书']
            },
            {
                step: 4,
                name: '税务登记',
                description: '向HMRC登记税务',
                duration: 1,
                documents: ['注册证书'],
                requirements: [],
                risks: [],
                deliverables: ['税号']
            },
            {
                step: 5,
                name: '银行开户',
                description: '协助开设英国银行账户',
                duration: 5,
                documents: ['公司文件'],
                requirements: ['可能需要面签'],
                risks: ['银行审核时间长'],
                deliverables: ['银行账户']
            },
            {
                step: 6,
                name: '国际快递',
                description: '邮寄文件',
                duration: null,
                fromCountry: 'UK',
                documents: ['注册证书', '章程'],
                requirements: [],
                risks: [],
                deliverables: ['文件包']
            }
        ]
    },
    'BVI': {
        supplier_a: [
            {
                step: 1,
                name: '名称预留',
                description: 'BVI公司注册处名称查册',
                duration: 1,
                documents: ['公司名称'],
                requirements: [],
                risks: [],
                deliverables: ['名称预留']
            },
            {
                step: 2,
                name: '签署文件',
                description: '签署M&A和注册文件',
                duration: 1,
                documents: ['M&A', '注册申请'],
                requirements: ['所有股东签字'],
                risks: [],
                deliverables: ['签署文件']
            },
            {
                step: 3,
                name: 'BVI注册',
                description: '提交注册处审批',
                duration: 1,
                documents: [],
                requirements: ['缴纳政府费用'],
                risks: [],
                deliverables: ['注册证书']
            },
            {
                step: 4,
                name: '国际快递',
                description: '邮寄全套文件',
                duration: null,
                fromCountry: 'BVI',
                fromCity: 'Road Town',
                toCountry: null,  // 将从表单获取
                documents: ['注册证书', 'M&A', '股份证书'],
                requirements: [],
                risks: ['离岸地快递时间较长'],
                deliverables: ['完整文件包']
            }
        ]
    }
};

// 风险提示配置
const RISK_ALERTS = {
    common: [
        {
            level: 'warning',
            title: '文件公证认证',
            content: '个人身份文件和公司文件需要进行公证认证，中国公证处办理需要3-7个工作日'
        },
        {
            level: 'info',
            title: '国际快递时间',
            content: '国际快递受海关、节假日影响，实际时效可能有所延误'
        },
        {
            level: 'warning',
            title: '银行开户',
            content: '部分地区银行开户需要本人到场，或需要视频见证，请提前安排时间'
        }
    ],
    HK: [
        {
            level: 'info',
            title: '香港假期',
            content: '香港公众假期期间政府部门不办公，会影响注册进度'
        },
        {
            level: 'warning',
            title: '重要控制人登记册',
            content: '2018年起香港公司需备存SCR登记册，记录公司实际控制人信息'
        }
    ],
    SG: [
        {
            level: 'warning',
            title: '本地董事要求',
            content: '新加坡公司必须有至少一名本地董事（新加坡公民/PR/EP持有人）'
        },
        {
            level: 'info',
            title: '秘书要求',
            content: '必须在公司成立后6个月内委任公司秘书'
        }
    ],
    US: [
        {
            level: 'warning',
            title: '各州要求不同',
            content: '美国各州的注册要求、费用、时间都不相同，需要根据实际业务选择'
        },
        {
            level: 'info',
            title: '年度报告',
            content: '大部分州要求每年提交年度报告并缴纳年费'
        },
        {
            level: 'warning',
            title: 'BOI报告',
            content: '2024年起需向FinCEN提交受益所有人信息报告'
        }
    ],
    UK: [
        {
            level: 'info',
            title: '确认声明',
            content: '每年需向Companies House提交确认声明（Confirmation Statement）'
        },
        {
            level: 'warning',
            title: 'PSC登记',
            content: '需要维护重大控制人登记册（PSC Register）'
        }
    ],
    BVI: [
        {
            level: 'warning',
            title: '经济实质法',
            content: 'BVI公司需符合经济实质要求，定期提交申报'
        },
        {
            level: 'info',
            title: '代理服务',
            content: '必须委任BVI持牌代理人，每年需缴纳代理费用'
        }
    ]
};
