// 境外公司设立计算器

// 计算总流程时间（基于用户表单数据动态调整）
function calculateTotalDuration(jurisdiction, supplierId, deliveryInfo, formData = {}) {
    let processSteps = SETUP_PROCESSES[jurisdiction]?.[supplierId] || [];
    
    // 如果没有该供应商的流程数据，使用第一个可用的供应商流程
    if (processSteps.length === 0) {
        const availableSuppliers = Object.keys(SETUP_PROCESSES[jurisdiction] || {});
        if (availableSuppliers.length > 0) {
            processSteps = SETUP_PROCESSES[jurisdiction][availableSuppliers[0]];
        }
    }
    
    let totalWorkingDays = 0;
    let expressDeliveryDays = 0;
    const steps = [];
    
    // 基础时效调整系数（基于子地区）
    let baseTimeMultiplier = 1.0;
    if (deliveryInfo.subRegion && JURISDICTIONS[jurisdiction]?.subRegions) {
        const subRegionData = JURISDICTIONS[jurisdiction].subRegions[deliveryInfo.subRegion];
        if (subRegionData && subRegionData.days) {
            // 根据子地区的标准天数调整整体流程时效
            const avgDays = JURISDICTIONS[jurisdiction].avgSetupDays || 10;
            baseTimeMultiplier = subRegionData.days / avgDays;
        }
    }
    
    // 股东董事数量影响系数
    let documentPrepMultiplier = 1.0;
    const shareholderCount = formData.shareholders ? formData.shareholders.length : 0;
    const directorCount = formData.directors ? formData.directors.length : 0;
    
    // 每增加一个股东/董事，文件准备时间增加10%
    if (shareholderCount > 2) {
        documentPrepMultiplier += (shareholderCount - 2) * 0.1;
    }
    if (directorCount > 1) {
        documentPrepMultiplier += (directorCount - 1) * 0.1;
    }
    
    processSteps.forEach((step, index) => {
        let stepDuration = step.duration;
        
        // 处理州/地区相关的特殊情况
        if (step.stateDependent && jurisdiction === 'US' && deliveryInfo.subRegion) {
            const stateInfo = JURISDICTIONS.US.subRegions?.[deliveryInfo.subRegion];
            stepDuration = stateInfo?.days || 10;
        }
        
        // 应用子地区时效系数到所有步骤
        if (stepDuration && stepDuration > 0 && baseTimeMultiplier !== 1.0) {
            stepDuration = Math.ceil(stepDuration * baseTimeMultiplier);
        }
        
        // 文件准备步骤受股东董事数量影响
        if (step.name.includes('准备') || step.name.includes('文件') || step.name.includes('公证')) {
            if (stepDuration && stepDuration > 0 && documentPrepMultiplier > 1.0) {
                stepDuration = Math.ceil(stepDuration * documentPrepMultiplier);
            }
        }
        
        // 处理国际快递步骤
        if (step.duration === null && step.fromCountry) {
            // 调用快递评估工具API计算
            const expressData = calculateExpressDelivery(
                step.fromCountry,
                deliveryInfo.toCountry,
                0.5  // 假设文件重量0.5kg
            );
            
            if (expressData) {
                expressDeliveryDays = expressData.days;
                stepDuration = expressDeliveryDays;
            } else {
                // 默认快递时间
                stepDuration = estimateDefaultExpressTime(step.fromCountry, deliveryInfo.toCountry);
            }
        }
        
        totalWorkingDays += stepDuration || 0;
        
        steps.push({
            ...step,
            actualDuration: stepDuration,
            startDay: totalWorkingDays - (stepDuration || 0),
            endDay: totalWorkingDays
        });
    });
    
    // 添加额外服务相关的流程步骤
    if (formData.services && Array.isArray(formData.services)) {
        const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
        
        // 银行开户服务
        if (services.includes('bank')) {
            const bankStep = {
                step: steps.length + 1,
                name: 'Bank Account Opening Assistance (银行开户协助)',
                description: 'Assist with preparing documents and coordinating with banks for account opening (协助准备材料并对接银行开户)',
                actualDuration: 7,
                startDay: totalWorkingDays,
                endDay: totalWorkingDays + 7,
                documents: ['Company Registration Certificate (公司注册证书)', 'Business License (营业执照)', 'Director ID Documents (董事身份文件)', 'Proof of Address (地址证明)'],
                requirements: ['Director may need to be present in person (董事可能需要亲自到场)', 'Prepare initial deposit (准备首笔存款)'],
                risks: ['Bank review time varies (银行审核时间不定)', 'May require multiple visits (可能需要多次往返)'],
                deliverables: ['Bank Account (银行账户)', 'Online Banking (网银)', 'Debit Card (银行卡)']
            };
            steps.push(bankStep);
            totalWorkingDays += 7;
        }
        
        // 税务咨询服务（并行，不增加总时长）
        if (services.includes('tax')) {
            const taxStep = {
                step: steps.length + 1,
                name: 'Tax Consultation (税务咨询)',
                description: 'Professional tax planning and compliance consultation (专业税务筹划和合规咨询)',
                actualDuration: 0,
                startDay: totalWorkingDays - 3,
                endDay: totalWorkingDays,
                documents: ['Business Scope (业务范围)', 'Expected Revenue (预期营收)'],
                requirements: [],
                risks: [],
                deliverables: ['Tax Planning Report (税务筹划方案)', 'Compliance Guidance (合规指引)']
            };
            steps.push(taxStep);
        }
        
        // 公司秘书服务（并行，不增加总时长）
        if (services.includes('secretary')) {
            const secretaryStep = {
                step: steps.length + 1,
                name: 'Company Secretary Service (公司秘书服务)',
                description: 'Annual compliance and secretarial services (年度合规和秘书服务)',
                actualDuration: 0,
                startDay: totalWorkingDays,
                endDay: totalWorkingDays,
                documents: [],
                requirements: [],
                risks: [],
                deliverables: ['Annual Compliance Service (年度合规服务)', 'Document Filing (文件归档)', 'Registered Address (注册地址)']
            };
            steps.push(secretaryStep);
        }
    }
    
    return {
        totalWorkingDays,
        totalCalendarDays: calculateCalendarDays(totalWorkingDays, jurisdiction),
        steps,
        expressDeliveryDays
    };
}

// 调用快递评估工具
function calculateExpressDelivery(fromCountry, toCountry, weight) {
    try {
        // 调用之前创建的快递评估工具
        if (typeof calculateExpressOptions === 'function') {
            const result = calculateExpressOptions({
                fromCountry,
                toCountry,
                weight,
                urgent: false,
                parcelType: 'document',
                serviceType: 'standard'
            });
            
            if (result && result.recommended) {
                // 提取天数
                const timeStr = result.recommended.time;
                const days = parseExpressTime(timeStr);
                
                return {
                    days,
                    price: result.recommended.price,
                    company: result.recommended.name,
                    time: timeStr
                };
            }
        }
    } catch (e) {
        console.warn('快递计算失败，使用默认估算', e);
    }
    
    return null;
}

// 解析快递时间字符串
function parseExpressTime(timeStr) {
    // 例如："3-4天" -> 取平均值 3.5
    // "24小时内" -> 1天
    if (timeStr.includes('小时')) {
        return 1;
    }
    
    const match = timeStr.match(/(\d+)-(\d+)天/);
    if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        return (min + max) / 2;
    }
    
    const singleMatch = timeStr.match(/(\d+)天/);
    if (singleMatch) {
        return parseInt(singleMatch[1]);
    }
    
    return 5;  // 默认5天
}

// 默认快递时间估算（如果快递API不可用）
function estimateDefaultExpressTime(fromCountry, toCountry) {
    const expressTimeMatrix = {
        'HK': { 'CN': 2, 'US': 5, 'UK': 6, 'SG': 3, 'AU': 5 },
        'SG': { 'CN': 3, 'US': 6, 'UK': 7, 'HK': 3, 'AU': 4 },
        'US': { 'CN': 7, 'HK': 5, 'SG': 6, 'UK': 4, 'AU': 6 },
        'UK': { 'CN': 8, 'HK': 6, 'SG': 7, 'US': 4, 'AU': 7 },
        'BVI': { 'CN': 10, 'HK': 8, 'SG': 9, 'US': 7, 'UK': 8 },
        'Cayman': { 'CN': 10, 'HK': 8, 'SG': 9, 'US': 7, 'UK': 8 }
    };
    
    return expressTimeMatrix[fromCountry]?.[toCountry] || 7;
}

// 计算自然日（考虑周末和节假日）
function calculateCalendarDays(workingDays, jurisdiction) {
    const weekendDays = Math.floor(workingDays / 5) * 2;  // 每5个工作日有2天周末
    const avgHolidaysPerMonth = 2;  // 平均每月2天节假日
    const estimatedMonths = workingDays / 20;  // 假设每月20个工作日
    const holidayDays = Math.ceil(estimatedMonths * avgHolidaysPerMonth);
    
    return workingDays + weekendDays + holidayDays;
}

// 匹配供应商（基于用户需求智能推荐，最多3个）
function matchSuppliers(jurisdiction, formData = {}) {
    const filtered = SUPPLIERS.filter(supplier => 
        supplier.specialties.includes(jurisdiction)
    ).map(supplier => {
        let matchScore = 0;
        
        // 基础匹配：有该地区专长
        matchScore += 30;
        
        // 服务匹配加分：如果用户选择了额外服务，优先推荐有相关优势的供应商
        if (formData.services && Array.isArray(formData.services)) {
            const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
            
            if (services.includes('bank') && supplier.advantages.some(adv => adv.includes('银行开户') || adv.includes('开户'))) {
                matchScore += 10;
            }
            if (services.includes('tax') && supplier.advantages.some(adv => adv.includes('税务') || adv.includes('财税'))) {
                matchScore += 10;
            }
            if (services.includes('secretary') && supplier.advantages.some(adv => adv.includes('秘书') || adv.includes('合规'))) {
                matchScore += 10;
            }
            if (services.includes('trademark') && supplier.certifications.some(cert => cert.includes('商标'))) {
                matchScore += 10;
            }
        }
        
        // 地区匹配加分：优先推荐该地区经验丰富的供应商
        if (supplier.id === 'supplier_a' && ['HK', 'SG', 'BVI', 'Cayman'].includes(jurisdiction)) {
            matchScore += 15;
        }
        if (supplier.id === 'supplier_b' && ['US', 'UK', 'DE', 'AU'].includes(jurisdiction)) {
            matchScore += 15;
        }
        if (supplier.id === 'supplier_c' && ['HK', 'SG', 'US', 'UK'].includes(jurisdiction)) {
            matchScore += 10;
        }
        
        return {
            ...supplier,
            price: supplier.price[jurisdiction] || { service: 0, government: 0, total: 0 },
            matchScore
        };
    }).sort((a, b) => {
        // 综合评分排序：匹配度40% + 价格30% + 评分20% + 经验10%
        const scoreA = (a.matchScore / 100) * 0.4 + (1 - a.price.total / 10000) * 0.3 + (a.rating / 5) * 0.2 + (a.experience / 20) * 0.1;
        const scoreB = (b.matchScore / 100) * 0.4 + (1 - b.price.total / 10000) * 0.3 + (b.rating / 5) * 0.2 + (b.experience / 20) * 0.1;
        return scoreB - scoreA;
    });
    
    // 最多返回3个供应商
    return filtered.slice(0, 3);
}

// 生成流程时间线数据（基于用户表单数据动态评估）
function generateTimeline(jurisdiction, supplierId, deliveryInfo, formData = {}) {
    const duration = calculateTotalDuration(jurisdiction, supplierId, deliveryInfo, formData);
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    const risks = [
        ...(RISK_ALERTS.common || []),
        ...(RISK_ALERTS[jurisdiction] || [])
    ];
    
    // 根据用户填写的股东董事数量添加风险提示
    if (formData.shareholders && formData.shareholders.length > 3) {
        risks.push({
            level: 'warning',
            title: 'Multiple Shareholders (多股东提示)',
            content: `You have ${formData.shareholders.length} shareholders, which may require additional time for document preparation and notarization (您有${formData.shareholders.length}位股东，文件准备和公证可能需要额外时间)`
        });
    }
    
    if (formData.directors && formData.directors.length > 2) {
        risks.push({
            level: 'info',
            title: 'Multiple Directors (多董事说明)',
            content: `You have ${formData.directors.length} directors, please ensure all directors' documents are complete (您有${formData.directors.length}位董事，请确保所有董事的文件齐全)`
        });
    }
    
    // 根据选择的额外服务添加风险提示
    if (formData.services && Array.isArray(formData.services)) {
        const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
        
        if (services.includes('bank')) {
            risks.push({
                level: 'info',
                title: 'Bank Account Opening (银行开户说明)',
                content: 'Bank account opening usually requires 1-2 weeks after company registration, and may require in-person visit (银行开户通常需要在公司注册完成后1-2周，可能需要本人到场)'
            });
        }
        
        if (services.includes('trademark')) {
            risks.push({
                level: 'warning',
                title: 'Trademark Registration (商标注册周期)',
                content: 'Trademark registration is a separate process, typically taking 6-12 months, and does not affect company registration timeline (商标注册是独立流程，通常需要6-12个月，不影响公司注册时效)'
            });
        }
    }
    
    return {
        jurisdiction: jurisdictionInfo,
        totalWorkingDays: duration.totalWorkingDays,
        totalCalendarDays: duration.totalCalendarDays,
        steps: duration.steps,
        risks,
        supplier: SUPPLIERS.find(s => s.id === supplierId)
    };
}

// 格式化价格
function formatPrice(price, currency = 'CNY') {
    const symbols = {
        'CNY': '¥',
        'HKD': 'HK$',
        'USD': '$',
        'SGD': 'S$',
        'GBP': '£',
        'EUR': '€',
        'AUD': 'A$'
    };
    
    return `${symbols[currency] || '¥'}${price.toLocaleString()}`;
}

// 计算完成日期
function calculateCompletionDate(workingDays, jurisdiction) {
    const startDate = new Date();
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    let currentDate = new Date(startDate);
    let remainingDays = workingDays;
    
    while (remainingDays > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        
        // 跳过周末
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            remainingDays--;
        }
    }
    
    return currentDate;
}
