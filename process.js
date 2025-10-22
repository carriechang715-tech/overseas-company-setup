// 设立流程步骤配置（优化版：支持阶段划分、并行事项、详细时间评估）

const SETUP_PROCESSES = {
    'HK': {
        supplier_a: {
            totalWorkingDays: 6,  // 总工作日（不含并行部分重叠时间）
            phases: [
                {
                    phase: 1,
                    name: 'Preparation Phase (准备阶段)',
                    description: 'Company name verification and document preparation (公司名称核查与文件准备)',
                    duration: 2,  // 本阶段总工作日
                    startDay: 0,
                    endDay: 2,
                    tasks: [
                        {
                            taskId: 'HK-P1-T1',
                            name: 'Name Search (名称查册)',
                            description: 'Check company name availability and submit name application (检查公司名称是否可用，提交公司名称申请)',
                            duration: 1,
                            startDay: 0,
                            endDay: 1,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [
                                'Alternative company names (2-3 options) (公司名称备选（2-3个）)'
                            ],
                            requirements: [
                                'Name must not duplicate existing companies (名称不能与现有公司重复)',
                                'Cannot contain sensitive words (不能包含敏感词汇)'
                            ],
                            risks: [
                                'Name may be taken, need to resubmit (名称被占用需重新提交)'
                            ],
                            deliverables: [
                                'Name Reservation Notice (名称预留通知书)'
                            ]
                        },
                        {
                            taskId: 'HK-P1-T2',
                            name: 'Document Preparation (准备注册文件)',
                            description: 'Draft Articles of Association, shareholder and director resolutions (起草公司章程、股东董事决议等文件)',
                            duration: 1,
                            startDay: 1,
                            endDay: 2,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: [
                                'Articles of Association (公司章程)',
                                'Consent of First Director (首任董事同意书)',
                                'Registered Address Proof (注册地址证明)',
                                'Shareholder/Director ID documents (股东/董事身份文件)'
                            ],
                            requirements: [
                                'All shareholders and directors sign (所有股东董事签字)',
                                'Documents need notarization (文件需公证认证)'
                            ],
                            risks: [
                                'Incomplete documents affect progress (文件不全影响进度)',
                                'Irregular signatures need re-signing (签字不规范需重签)'
                            ],
                            deliverables: [
                                'Complete registration application documents (完整注册申请文件)'
                            ]
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Courier to HK (文件寄往香港)',
                    description: 'Client courier signed documents to Hong Kong service provider (客户将签署文件快递至香港服务商)',
                    duration: null,
                    startDay: 2,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'HK-P2-T1',
                            name: 'Courier Signed Documents (寄送签署文件)',
                            description: 'Client courier signed and notarized documents to Hong Kong (客户将签署并公证的文件快递至香港)',
                            duration: null,
                            startDay: 2,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            toCountry: 'HK',
                            responsible: 'Client (客户) + Courier Company (快递公司)',
                            documents: [
                                'Signed Articles of Association (已签署公司章程)',
                                'Notarized ID documents (已公证身份文件)',
                                'Director consent letters (董事同意书)'
                            ],
                            requirements: [
                                'Original documents required (需要原件)',
                                'Proper packaging to avoid damage (妥善包装避免损坏)'
                            ],
                            risks: [
                                'International courier delay (国际快递延误)',
                                'Customs clearance time (清关时间)'
                            ],
                            deliverables: [
                                'Documents received by service provider (服务商收到文件)'
                            ]
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'Government Registration Phase (政府注册阶段)',
                    description: 'Submit to Companies Registry and obtain certificates (提交公司注册处并获取证书)',
                    duration: 3,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'HK-P2-T1',
                            name: 'Submit to Companies Registry (提交公司注册处)',
                            description: 'Submit registration application to Hong Kong Companies Registry (向香港公司注册处提交注册申请)',
                            duration: 2,
                            startDay: 2,
                            endDay: 4,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [
                                'Registration Form NNC1 (注册申请表（NNC1）)',
                                'Articles of Association (公司章程)',
                                'Shareholder/Director Information (董事股东资料)'
                            ],
                            requirements: [
                                'Pay registration fee (缴纳注册费用)',
                                'Provide registered address (提供注册地址)'
                            ],
                            risks: [
                                'May need supplementary materials if review fails (审核不通过需补充材料)'
                            ],
                            deliverables: [
                                'Companies Registry Acceptance Notice (公司注册处受理通知)'
                            ]
                        },
                        {
                            taskId: 'HK-P2-T2',
                            name: 'Obtain Registration Certificate (获取注册证书)',
                            description: 'Companies Registry issues certificate after approval (公司注册处核准后颁发注册证书)',
                            duration: 1,
                            startDay: 4,
                            endDay: 5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Companies Registry (公司注册处)',
                            documents: [],
                            requirements: [],
                            risks: [],
                            deliverables: [
                                'Certificate of Incorporation (公司注册证书（CI）)',
                                'Business Registration Certificate (商业登记证（BR）)'
                            ]
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'Post-Registration Phase (注册后阶段)',
                    description: 'Seal production and document delivery (印章制作与文件交付)',
                    duration: 1,  // 刻章1天（快递时间在phase 5）
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'HK-P3-T1',
                            name: 'Seal Production (刻制印章)',
                            description: 'Make company seals (round seal, rectangular seal, steel seal) (刻制公司印章（圆章、长方章、钢印）)',
                            duration: 1,
                            startDay: 5,
                            endDay: 6,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [],
                            requirements: [
                                'Provide registration certificate (提供注册证书)'
                            ],
                            risks: [],
                            deliverables: [
                                'Company Seal Set (公司印章套装)'
                            ]
                        }
                    ]
                },
                {
                    phase: 5,
                    name: 'Delivery Phase (交付阶段)',
                    description: 'International courier of all documents (全套文件国际快递)',
                    duration: null,  // 通过快递API计算
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'HK-P5-T1',
                            name: 'International Courier (文件国际快递)',
                            description: 'Courier complete company documents to client address (将全套公司文件快递至客户指定地址)',
                            duration: null,
                            startDay: null,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'HK',
                            responsible: 'Courier Company (快递公司)',
                            documents: [
                                'Registration Certificate (注册证书)',
                                'Seal (印章)',
                                'Articles of Association (公司章程)',
                                'Meeting Minutes (会议记录)'
                            ],
                            requirements: [
                                'Provide accurate delivery address (提供准确收件地址)'
                            ],
                            risks: [
                                'International courier may be delayed (国际快递可能延误)',
                                'Customs clearance may require extra time (清关可能需要额外时间)'
                            ],
                            deliverables: [
                                'Complete Company Setup Document Package (完整公司设立文件包)'
                            ]
                        }
                    ]
                }
            ]
        },
        supplier_c: {
            totalWorkingDays: 5,
            phases: [
                {
                    phase: 1,
                    name: 'Initial Consultation Phase (初步咨询阶段)',
                    description: 'Free name search and service agreement (免费名称查册与签署协议)',
                    duration: 1.5,
                    startDay: 0,
                    endDay: 1.5,
                    tasks: [
                        {
                            taskId: 'HK-C-P1-T1',
                            name: 'Free Name Search (免费名称查册)',
                            description: 'Quick search for company name availability (快速查册公司名称，确认可用性)',
                            duration: 0.5,
                            startDay: 0,
                            endDay: 0.5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Name (公司名称)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Name Availability Report (名称可用性报告)']
                        },
                        {
                            taskId: 'HK-C-P1-T2',
                            name: 'Sign Service Agreement (签署服务协议)',
                            description: 'Sign engagement agreement and pay service fee (签署委托协议，支付服务费用)',
                            duration: 1,
                            startDay: 0.5,
                            endDay: 1.5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: ['Engagement Agreement (委托协议)', 'ID Proof (身份证明)'],
                            requirements: ['Pay Deposit (支付定金)'],
                            risks: [],
                            deliverables: ['Service Agreement (服务协议)']
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Preparation and Notarization (文件准备与公证)',
                    description: 'Prepare complete registration documents and handle notarization (准备全套注册文件并办理公证)',
                    duration: 2,
                    startDay: 1.5,
                    endDay: 3.5,
                    tasks: [
                        {
                            taskId: 'HK-C-P2-T1',
                            name: 'Document Preparation and Notarization (文件准备与公证)',
                            description: 'Prepare all registration documents and arrange notarization (准备全套注册文件并办理公证)',
                            duration: 2,
                            startDay: 1.5,
                            endDay: 3.5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: ['Shareholder/Director Information (股东董事资料)', 'Address Proof (地址证明)'],
                            requirements: ['All documents need notarization (所有文件需公证)'],
                            risks: ['Notarization time may extend (公证时间可能延长)'],
                            deliverables: ['Notarized Documents (公证文件)']
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'Government Registration (政府注册)',
                    description: 'Submit to Companies Registry and pay fees (提交香港公司注册处并缴费)',
                    duration: 1,
                    startDay: 3.5,
                    endDay: 4.5,
                    tasks: [
                        {
                            taskId: 'HK-C-P3-T1',
                            name: 'Government Registration (政府注册)',
                            description: 'Submit to Hong Kong Companies Registry and pay registration fees (提交香港公司注册处并缴费)',
                            duration: 1,
                            startDay: 3.5,
                            endDay: 4.5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [],
                            requirements: [],
                            risks: [],
                            deliverables: ['Registration Acceptance Notice (注册受理通知)']
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'Certificate and Seal Collection (领取证书与印章)',
                    description: 'Obtain registration certificate and produce company seal (获取注册证书并刻制印章)',
                    duration: 1,
                    startDay: 4.5,
                    endDay: 5.5,
                    tasks: [
                        {
                            taskId: 'HK-C-P4-T1',
                            name: 'Obtain Certificate and Seal (领取证书与印章)',
                            description: 'Collect registration certificate and company seal (获取注册证书并刻制印章)',
                            duration: 1,
                            startDay: 4.5,
                            endDay: 5.5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [],
                            requirements: [],
                            risks: [],
                            deliverables: ['Registration Certificate (注册证书)', 'Company Seal (印章)']
                        }
                    ]
                },
                {
                    phase: 5,
                    name: 'International Courier (国际快递邮寄)',
                    description: 'Courier complete company documents (快递公司全套文件)',
                    duration: null,
                    startDay: 5.5,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'HK-C-P5-T1',
                            name: 'International Courier (国际快递邮寄)',
                            description: 'Courier complete company documents (快递公司全套文件)',
                            duration: null,
                            startDay: 5.5,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'HK',
                            responsible: 'Courier Company (快递公司)',
                            documents: ['Complete Company Documents (全套公司文件)'],
                            requirements: [],
                            risks: ['Courier Delay Risk (快递延误风险)'],
                            deliverables: ['Company Document Package (公司文件包)']
                        }
                    ]
                }
            ]
        }
    },
    'SG': {
        supplier_a: {
            totalWorkingDays: 8,
            phases: [
                {
                    phase: 1,
                    name: 'Name Approval Phase (名称核准阶段)',
                    description: 'Submit company name application to ACRA (向ACRA提交公司名称申请)',
                    duration: 1,
                    startDay: 0,
                    endDay: 1,
                    tasks: [
                        {
                            taskId: 'SG-P1-T1',
                            name: 'Name Approval (名称核准)',
                            description: 'Submit company name application to ACRA (向ACRA提交公司名称申请)',
                            duration: 1,
                            startDay: 0,
                            endDay: 1,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Name (公司名称)'],
                            requirements: ['Comply with Singapore naming rules (符合新加坡命名规则)'],
                            risks: ['Name may be rejected (名称可能被拒)'],
                            deliverables: ['Name Approval Notice (名称核准通知)']
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Preparation Phase (文件准备阶段)',
                    description: 'Prepare Articles of Association, shareholder resolutions, etc. (准备公司章程、股东决议等)',
                    duration: 2,
                    startDay: 1,
                    endDay: 3,
                    tasks: [
                        {
                            taskId: 'SG-P2-T1',
                            name: 'Prepare Registration Documents (准备注册文件)',
                            description: 'Prepare Articles of Association, shareholder and director information (准备公司章程、股东决议等)',
                            duration: 2,
                            startDay: 1,
                            endDay: 3,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: ['Articles of Association (公司章程)', 'Shareholder Information (股东资料)', 'Director Information (董事资料)'],
                            requirements: ['At least one local director (至少一名本地董事)', 'Local registered address (本地注册地址)'],
                            risks: ['Local director needs extra arrangement (本地董事需额外安排)'],
                            deliverables: ['Registration Application Documents (注册申请文件)']
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'Document Courier to SG (文件寄往新加坡)',
                    description: 'Client courier signed documents to Singapore service provider (客户将签署文件快递至新加坡服务商)',
                    duration: null,
                    startDay: 3,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'SG-P3-T1',
                            name: 'Courier Signed Documents (寄送签署文件)',
                            description: 'Client courier signed and notarized documents to Singapore (客户将签署并公证的文件快递至新加坡)',
                            duration: null,
                            startDay: 3,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            toCountry: 'SG',
                            responsible: 'Client (客户) + Courier Company (快递公司)',
                            documents: [
                                'Signed Articles of Association (已签署公司章程)',
                                'Director/Shareholder ID documents (董事/股东身份文件)',
                                'Notarized documents if required (公证文件（如需）)'
                            ],
                            requirements: [
                                'Original documents preferred (最好是原件)',
                                'Secure packaging (安全包装)'
                            ],
                            risks: [
                                'International courier delay (国际快递延误)',
                                'Customs clearance (清关手续)'
                            ],
                            deliverables: [
                                'Documents received by service provider (服务商收到文件)'
                            ]
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'ACRA Registration Phase (ACRA注册阶段)',
                    description: 'Submit online ACRA registration application (在线提交ACRA注册申请)',
                    duration: 3,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'SG-P4-T1',
                            name: 'ACRA Registration (ACRA注册)',
                            description: 'Submit online ACRA registration application (在线提交ACRA注册申请)',
                            duration: 3,
                            startDay: 3,
                            endDay: 6,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Complete Registration Form (完整注册表格)', 'ID Proof (身份证明)'],
                            requirements: ['Pay registration fee (缴纳注册费)'],
                            risks: ['May require supplementary materials (审核可能要求补充材料)'],
                            deliverables: ['Company Registration Certificate ACRA (公司注册证书（ACRA）)']
                        }
                    ]
                },
                {
                    phase: 5,
                    name: 'Tax Registration and Seal Production (税务登记与印章制作)',
                    description: 'Tax registration with IRAS and seal production (向IRAS办理税务登记并刻制印章)',
                    duration: 2,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'SG-P5-T1',
                            name: 'Tax Registration (税务登记)',
                            description: 'Register tax with IRAS (向IRAS办理税务登记)',
                            duration: 1,
                            startDay: 6,
                            endDay: 7,
                            parallel: true,
                            parallelGroup: 'A',
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Registration Certificate (公司注册证书)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Tax Number (税号)']
                        },
                        {
                            taskId: 'SG-P5-T2',
                            name: 'Seal Production (刻制印章)',
                            description: 'Produce company seal (制作公司印章)',
                            duration: 1,
                            startDay: 6,
                            endDay: 7,
                            parallel: true,
                            parallelGroup: 'A',
                            responsible: 'Service Provider (服务商)',
                            documents: [],
                            requirements: [],
                            risks: [],
                            deliverables: ['Company Seal (公司印章)']
                        }
                    ]
                },
                {
                    phase: 6,
                    name: 'International Courier (国际快递)',
                    description: 'Courier complete documents (邮寄全套文件)',
                    duration: null,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'SG-P6-T1',
                            name: 'International Courier (国际快递)',
                            description: 'Courier complete documents (邮寄全套文件)',
                            duration: null,
                            startDay: 8,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'SG',
                            responsible: 'Courier Company (快递公司)',
                            documents: ['Registration Certificate (注册证书)', 'Seal (印章)', 'Articles (章程)'],
                            requirements: [],
                            risks: ['International courier delay (国际快递延误)'],
                            deliverables: ['Company Document Package (公司文件包)']
                        }
                    ]
                }
            ]
        }
    },
    'US': {
        supplier_b: {
            totalWorkingDays: 7,  // Base days, state registration time varies
            phases: [
                {
                    phase: 1,
                    name: 'State Name Search (州名称检索)',
                    description: 'Check company name availability in target state (在目标州检查公司名称可用性)',
                    duration: 1,
                    startDay: 0,
                    endDay: 1,
                    tasks: [
                        {
                            taskId: 'US-P1-T1',
                            name: 'State Name Search (州名称检索)',
                            description: 'Check company name availability in target state (在目标州检查公司名称可用性)',
                            duration: 1,
                            startDay: 0,
                            endDay: 1,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Name (公司名称)'],
                            requirements: ['Comply with state naming rules (符合州命名规则)'],
                            risks: ['Name taken (名称被占用)'],
                            deliverables: ['Name Availability Confirmation (名称可用性确认)']
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Preparation (文件准备)',
                    description: 'Draft Articles of Incorporation/Organization (起草Articles of Incorporation/Organization)',
                    duration: 2,
                    startDay: 1,
                    endDay: 3,
                    tasks: [
                        {
                            taskId: 'US-P2-T1',
                            name: 'Prepare Registration Documents (准备注册文件)',
                            description: 'Draft Articles of Incorporation/Organization (起草Articles of Incorporation/Organization)',
                            duration: 2,
                            startDay: 1,
                            endDay: 3,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: ['Articles of Incorporation (公司章程)', 'Shareholder Information (股东资料)'],
                            requirements: ['Designate registered agent (指定注册代理)'],
                            risks: [],
                            deliverables: ['Registration Documents (注册文件)']
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'Document Courier to US (文件寄往美国)',
                    description: 'Client courier signed documents to US service provider (客户将签署文件快递至美国服务商)',
                    duration: null,
                    startDay: 3,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'US-P3-T1',
                            name: 'Courier Signed Documents (寄送签署文件)',
                            description: 'Client courier signed Articles and documents to US (客户将签署的文件快递至美国)',
                            duration: null,
                            startDay: 3,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            toCountry: 'US',
                            responsible: 'Client (客户) + Courier Company (快递公司)',
                            documents: [
                                'Signed Articles of Incorporation (已签署公司章程)',
                                'Shareholder resolutions (股东决议)',
                                'Notarized ID documents (公证身份文件)'
                            ],
                            requirements: [
                                'Original signatures required (需要原始签名)',
                                'Apostille for international documents (国际文件需海牙认证)'
                            ],
                            risks: [
                                'International courier delay (国际快递延误)',
                                'Customs clearance time (清关时间)'
                            ],
                            deliverables: [
                                'Documents received by US service provider (美国服务商收到文件)'
                            ]
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'State Registration (州政府注册)',
                    description: 'Submit registration to Secretary of State (向州务卿办公室提交注册)',
                    duration: null,
                    stateDependent: true,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'US-P4-T1',
                            name: 'State Government Registration (州政府注册)',
                            description: 'Submit registration to Secretary of State (向州务卿办公室提交注册)',
                            duration: null,
                            stateDependent: true,
                            startDay: 3,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'State Government (州政府)',
                            documents: ['Articles of Incorporation'],
                            requirements: ['Pay state registration fee (缴纳州注册费)'],
                            risks: ['Processing time varies by state (处理时间因州而异)'],
                            deliverables: ['State Registration Certificate (州注册证书)']
                        }
                    ]
                },
                {
                    phase: 5,
                    name: 'EIN Application and Bank Setup (申请EIN与银行开户准备)',
                    description: 'Apply for EIN from IRS and prepare bank account documents (向IRS申请雇主识别号并准备银行开户文件)',
                    duration: 4,
                    startDay: null,  // Depends on state registration completion
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'US-P5-T1',
                            name: 'Apply for EIN (申请EIN)',
                            description: 'Apply for Employer Identification Number from IRS (向IRS申请雇主识别号)',
                            duration: 3,
                            startDay: null,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Registration Certificate (公司注册证书)'],
                            requirements: ['Valid registered address (有效的注册地址)'],
                            risks: ['IRS processing time may extend (IRS处理时间可能延长)'],
                            deliverables: ['EIN Number (EIN号码)']
                        },
                        {
                            taskId: 'US-P5-T2',
                            name: 'Bank Account Setup Preparation (银行开户准备)',
                            description: 'Prepare documents for bank account opening (准备银行开户所需文件)',
                            duration: 1,
                            startDay: null,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Registration Certificate (注册证书)', 'EIN', 'Articles of Incorporation (公司章程)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Bank Account Document Package (开户文件包)']
                        }
                    ]
                },
                {
                    phase: 6,
                    name: 'International Courier (国际快递)',
                    description: 'Courier company documents (邮寄公司文件)',
                    duration: null,
                    startDay: null,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'US-P6-T1',
                            name: 'International Courier (国际快递)',
                            description: 'Courier company documents (邮寄公司文件)',
                            duration: null,
                            startDay: null,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'US',
                            responsible: 'Courier Company (快递公司)',
                            documents: ['Registration Certificate (注册证书)', 'EIN', 'Articles (章程)'],
                            requirements: [],
                            risks: ['International courier time (国际快递时间)'],
                            deliverables: ['Document Package (文件包)']
                        }
                    ]
                }
            ]
        }
    },
    'UK': {
        supplier_b: {
            totalWorkingDays: 11,
            phases: [
                {
                    phase: 1,
                    name: 'Name Check (名称检查)',
                    description: 'Check name at Companies House (在Companies House检查名称)',
                    duration: 1,
                    startDay: 0,
                    endDay: 1,
                    tasks: [
                        {
                            taskId: 'UK-P1-T1',
                            name: 'Name Check (名称检查)',
                            description: 'Check name at Companies House (在Companies House检查名称)',
                            duration: 1,
                            startDay: 0,
                            endDay: 1,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Name (公司名称)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Name Confirmation (名称确认)']
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Preparation (文件准备)',
                    description: 'Prepare IN01 form and Articles (准备IN01表格和章程)',
                    duration: 1,
                    startDay: 1,
                    endDay: 2,
                    tasks: [
                        {
                            taskId: 'UK-P2-T1',
                            name: 'Prepare Registration Documents (准备注册文件)',
                            description: 'Prepare IN01 form and Articles (准备IN01表格和章程)',
                            duration: 1,
                            startDay: 1,
                            endDay: 2,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Client (客户)',
                            documents: ['IN01 Form (IN01表格)', 'Articles (章程)'],
                            requirements: ['At least one director (至少一名董事)', 'UK registered address (英国注册地址)'],
                            risks: [],
                            deliverables: ['Registration Documents (注册文件)']
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'Companies House Registration (Companies House注册)',
                    description: 'Submit online registration application (提交在线注册申请)',
                    duration: 3,
                    startDay: 2,
                    endDay: 5,
                    tasks: [
                        {
                            taskId: 'UK-P3-T1',
                            name: 'Companies House Registration (Companies House注册)',
                            description: 'Submit online registration application (提交在线注册申请)',
                            duration: 3,
                            startDay: 2,
                            endDay: 5,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Complete Form (完整表格)'],
                            requirements: ['Pay £12 registration fee (缴纳£12注册费)'],
                            risks: [],
                            deliverables: ['Company Registration Certificate (公司注册证书)']
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'Tax Registration (税务登记)',
                    description: 'Register tax with HMRC (向HMRC登记税务)',
                    duration: 1,
                    startDay: 5,
                    endDay: 6,
                    tasks: [
                        {
                            taskId: 'UK-P4-T1',
                            name: 'Tax Registration (税务登记)',
                            description: 'Register tax with HMRC (向HMRC登记税务)',
                            duration: 1,
                            startDay: 5,
                            endDay: 6,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Registration Certificate (注册证书)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Tax Number (税号)']
                        }
                    ]
                },
                {
                    phase: 5,
                    name: 'Bank Account Opening (银行开户)',
                    description: 'Assist with opening UK bank account (协助开设英国银行账户)',
                    duration: 5,
                    startDay: 6,
                    endDay: 11,
                    tasks: [
                        {
                            taskId: 'UK-P5-T1',
                            name: 'Bank Account Opening (银行开户)',
                            description: 'Assist with opening UK bank account (协助开设英国银行账户)',
                            duration: 5,
                            startDay: 6,
                            endDay: 11,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商) + Bank (银行)',
                            documents: ['Company Documents (公司文件)'],
                            requirements: ['May need face-to-face signing (可能需要面签)'],
                            risks: ['Bank review time long (银行审核时间长)'],
                            deliverables: ['Bank Account (银行账户)']
                        }
                    ]
                },
                {
                    phase: 6,
                    name: 'International Courier (国际快递)',
                    description: 'Courier documents (邮寄文件)',
                    duration: null,
                    startDay: 11,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'UK-P6-T1',
                            name: 'International Courier (国际快递)',
                            description: 'Courier documents (邮寄文件)',
                            duration: null,
                            startDay: 11,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'UK',
                            responsible: 'Courier Company (快递公司)',
                            documents: ['Registration Certificate (注册证书)', 'Articles (章程)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Document Package (文件包)']
                        }
                    ]
                }
            ]
        }
    },
    'BVI': {
        supplier_a: {
            totalWorkingDays: 3,
            phases: [
                {
                    phase: 1,
                    name: 'Name Reservation (名称预留)',
                    description: 'BVI Registry name search (BVI公司注册处名称查册)',
                    duration: 1,
                    startDay: 0,
                    endDay: 1,
                    tasks: [
                        {
                            taskId: 'BVI-P1-T1',
                            name: 'Name Reservation (名称预留)',
                            description: 'BVI Registry name search (BVI公司注册处名称查册)',
                            duration: 1,
                            startDay: 0,
                            endDay: 1,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: ['Company Name (公司名称)'],
                            requirements: [],
                            risks: [],
                            deliverables: ['Name Reservation (名称预留)']
                        }
                    ]
                },
                {
                    phase: 2,
                    name: 'Document Signing (签署文件)',
                    description: 'Sign M&A and registration documents (签署M&A和注册文件)',
                    duration: 1,
                    startDay: 1,
                    endDay: 2,
                    tasks: [
                        {
                            taskId: 'BVI-P2-T1',
                            name: 'Sign Documents (签署文件)',
                            description: 'Sign M&A and registration documents (签署M&A和注册文件)',
                            duration: 1,
                            startDay: 1,
                            endDay: 2,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Client (客户)',
                            documents: ['M&A', 'Registration Application (注册申请)'],
                            requirements: ['All shareholders sign (所有股东签字)'],
                            risks: [],
                            deliverables: ['Signed Documents (签署文件)']
                        }
                    ]
                },
                {
                    phase: 3,
                    name: 'BVI Registration (BVI注册)',
                    description: 'Submit to Registry for approval (提交注册处审批)',
                    duration: 1,
                    startDay: 2,
                    endDay: 3,
                    tasks: [
                        {
                            taskId: 'BVI-P3-T1',
                            name: 'BVI Registration (BVI注册)',
                            description: 'Submit to Registry for approval (提交注册处审批)',
                            duration: 1,
                            startDay: 2,
                            endDay: 3,
                            parallel: false,
                            parallelGroup: null,
                            responsible: 'Service Provider (服务商)',
                            documents: [],
                            requirements: ['Pay government fees (缴纳政府费用)'],
                            risks: [],
                            deliverables: ['Registration Certificate (注册证书)']
                        }
                    ]
                },
                {
                    phase: 4,
                    name: 'International Courier (国际快递)',
                    description: 'Courier complete documents (邮寄全套文件)',
                    duration: null,
                    startDay: 3,
                    endDay: null,
                    tasks: [
                        {
                            taskId: 'BVI-P4-T1',
                            name: 'International Courier (国际快递)',
                            description: 'Courier complete documents (邮寄全套文件)',
                            duration: null,
                            startDay: 3,
                            endDay: null,
                            parallel: false,
                            parallelGroup: null,
                            fromCountry: 'BVI',
                            fromCity: 'Road Town',
                            toCountry: null,
                            responsible: 'Courier Company (快递公司)',
                            documents: ['Registration Certificate (注册证书)', 'M&A', 'Share Certificate (股份证书)'],
                            requirements: [],
                            risks: ['Offshore courier time longer (离岸地快递时间较长)'],
                            deliverables: ['Complete Document Package (完整文件包)']
                        }
                    ]
                }
            ]
        }
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
