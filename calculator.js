// 境外公司设立计算器

// 计算总流程时间（基于用户表单数据动态调整）
function calculateTotalDuration(jurisdiction, supplierId, deliveryInfo, formData = {}) {
    let processConfig = SETUP_PROCESSES[jurisdiction]?.[supplierId];
    
    // 如果没有该供应商的流程数据，使用第一个可用的供应商流程
    if (!processConfig) {
        const availableSuppliers = Object.keys(SETUP_PROCESSES[jurisdiction] || {});
        if (availableSuppliers.length > 0) {
            processConfig = SETUP_PROCESSES[jurisdiction][availableSuppliers[0]];
        }
    }
    
    if (!processConfig || !processConfig.phases) {
        return {
            totalWorkingDays: 0,
            totalCalendarDays: 0,
            phases: [],
            expressDeliveryDays: 0
        };
    }
    
    let totalWorkingDays = 0;
    let expressDeliveryDays = 0;
    const phases = [];
    
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
    const shareholderCount = formData.shareholders && formData.shareholders.length > 0 && formData.shareholders[0].count 
        ? formData.shareholders[0].count 
        : 0;
    const directorCount = formData.directors && formData.directors.length > 0 && formData.directors[0].count 
        ? formData.directors[0].count 
        : 0;
    
    // 每增加一个股东/董事，文件准备时间增加10%
    if (shareholderCount > 2) {
        documentPrepMultiplier += (shareholderCount - 2) * 0.1;
    }
    if (directorCount > 1) {
        documentPrepMultiplier += (directorCount - 1) * 0.1;
    }
    
    // 跨国股东/董事额外增加时间（需要海外公证）
    if (formData.shareholders && formData.shareholders.length > 0) {
        const shareholderNationalities = formData.shareholders[0].nationalities || [];
        // 检查是否有跨国股东
        const hasForeignShareholder = shareholderNationalities.some(nat => 
            nat && nat !== jurisdiction && nat !== 'Unknown'
        );
        if (hasForeignShareholder) {
            documentPrepMultiplier += 0.2; // 海外股东增加20%时间
        }
    }
    if (formData.directors && formData.directors.length > 0) {
        const directorNationalities = formData.directors[0].nationalities || [];
        // 检查是否有跨国董事
        const hasForeignDirector = directorNationalities.some(nat => 
            nat && nat !== jurisdiction && nat !== 'Unknown'
        );
        if (hasForeignDirector) {
            documentPrepMultiplier += 0.15; // 海外董事增加15%时间
        }
    }
    
    let currentDay = 0;
    
    // 处理每个阶段
    processConfig.phases.forEach((phase, phaseIndex) => {
        const phaseStartDay = currentDay;
        let phaseDuration = 0;
        const tasks = [];
        
        // 并行任务组追踪
        const parallelGroups = {};
        
        // 处理阶段内的每个任务
        phase.tasks.forEach((task, taskIndex) => {
            let taskDuration = task.duration;
            
            // 处理州/地区相关的特殊情况
            if (task.stateDependent && jurisdiction === 'US' && deliveryInfo.subRegion) {
                const stateInfo = JURISDICTIONS.US.subRegions?.[deliveryInfo.subRegion];
                taskDuration = stateInfo?.days || 10;
            }
            
            // 应用子地区时效系数
            if (taskDuration && taskDuration > 0 && baseTimeMultiplier !== 1.0) {
                taskDuration = Math.ceil(taskDuration * baseTimeMultiplier);
            }
            
            // 文件准备任务受股东董事数量影响
            if ((task.name.includes('准备') || task.name.includes('文件') || task.name.includes('公证') ||
                 task.name.includes('Preparation') || task.name.includes('Document') || task.name.includes('Notarization')) &&
                taskDuration && taskDuration > 0 && documentPrepMultiplier > 1.0) {
                taskDuration = Math.ceil(taskDuration * documentPrepMultiplier);
            }
            
            // 处理国际快递任务（双向：fromCountry 或 toCountry）
            if (task.duration === null && (task.fromCountry || task.toCountry)) {
                let fromCountry, toCountry;
                
                // 判断快递方向
                if (task.fromCountry) {
                    // 从注册地寄出（回程快递）
                    fromCountry = task.fromCountry;
                    toCountry = deliveryInfo.toCountry;
                } else if (task.toCountry) {
                    // 寄往注册地（往程快递）
                    fromCountry = deliveryInfo.toCountry;  // 客户所在地
                    toCountry = task.toCountry;  // 注册地
                }
                
                // 调用快递评估工具API计算
                const expressData = calculateExpressDelivery(
                    fromCountry,
                    toCountry,
                    0.5  // 假设文件重量0.5kg
                );
                
                if (expressData) {
                    expressDeliveryDays += expressData.days;
                    taskDuration = expressData.days;
                } else {
                    // 默认快递时间
                    taskDuration = estimateDefaultExpressTime(fromCountry, toCountry);
                    expressDeliveryDays += taskDuration;
                }
            }
            
            // 确保任务时间至少为1天（除非是并行任务或特殊标记的任务）
            if (taskDuration !== null && taskDuration !== undefined) {
                taskDuration = Math.max(taskDuration, 1);
            }
            
            // 计算任务的起止时间
            let taskStartDay, taskEndDay;
            
            if (task.parallel && task.parallelGroup) {
                // 并行任务：属于同一个parallelGroup的任务同时开始
                if (!parallelGroups[task.parallelGroup]) {
                    parallelGroups[task.parallelGroup] = {
                        startDay: currentDay,
                        maxDuration: taskDuration || 0
                    };
                } else {
                    parallelGroups[task.parallelGroup].maxDuration = Math.max(
                        parallelGroups[task.parallelGroup].maxDuration,
                        taskDuration || 0
                    );
                }
                
                taskStartDay = parallelGroups[task.parallelGroup].startDay;
                taskEndDay = taskStartDay + (taskDuration || 0);
            } else {
                // 串行任务：按顺序执行
                taskStartDay = currentDay;
                taskEndDay = currentDay + (taskDuration || 0);
                currentDay = taskEndDay;
            }
            
            tasks.push({
                ...task,
                actualDuration: taskDuration,
                startDay: taskStartDay,
                endDay: taskEndDay
            });
        });
        
        // 处理并行任务组对currentDay的影响
        Object.values(parallelGroups).forEach(group => {
            currentDay = Math.max(currentDay, group.startDay + group.maxDuration);
        });
        
        phaseDuration = currentDay - phaseStartDay;
        
        phases.push({
            ...phase,
            actualDuration: phaseDuration,
            startDay: phaseStartDay,
            endDay: currentDay,
            tasks
        });
    });
    
    totalWorkingDays = currentDay;
    
    // 确保总时间至少为1天（避免显示0天）
    if (totalWorkingDays === 0) {
        totalWorkingDays = 1;
    }
    
    // 添加额外服务相关的流程阶段
    if (formData.services && Array.isArray(formData.services)) {
        const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
        
        // 银行开户服务
        if (services.includes('bank')) {
            const bankPhase = {
                phase: phases.length + 1,
                name: 'Bank Account Opening Assistance (银行开户协助)',
                description: 'Assist with preparing documents and coordinating with banks for account opening (协助准备材料并对接银行开户)',
                actualDuration: 7,
                startDay: totalWorkingDays,
                endDay: totalWorkingDays + 7,
                tasks: [
                    {
                        taskId: 'EXTRA-BANK-T1',
                        name: 'Bank Account Opening (银行开户)',
                        description: 'Assist with opening bank account (协助开设银行账户)',
                        duration: 7,
                        actualDuration: 7,
                        startDay: totalWorkingDays,
                        endDay: totalWorkingDays + 7,
                        parallel: false,
                        parallelGroup: null,
                        responsible: 'Service Provider (服务商) + Bank (银行)',
                        documents: ['Company Registration Certificate (公司注册证书)', 'Business License (营业执照)', 'Director ID Documents (董事身份文件)', 'Proof of Address (地址证明)'],
                        requirements: ['Director may need to be present in person (董事可能需要亲自到场)', 'Prepare initial deposit (准备首笔存款)'],
                        risks: ['Bank review time varies (银行审核时间不定)', 'May require multiple visits (可能需要多次往返)'],
                        deliverables: ['Bank Account (银行账户)', 'Online Banking (网银)', 'Debit Card (银行卡)']
                    }
                ]
            };
            phases.push(bankPhase);
            totalWorkingDays += 7;
        }
        
        // 税务咨询服务（并行，不增加总时长）
        if (services.includes('tax')) {
            const taxPhase = {
                phase: phases.length + 1,
                name: 'Tax Consultation (税务咨询)',
                description: 'Professional tax planning and compliance consultation (专业税务筹划和合规咨询)',
                actualDuration: 0,
                startDay: totalWorkingDays - 3,
                endDay: totalWorkingDays,
                tasks: [
                    {
                        taskId: 'EXTRA-TAX-T1',
                        name: 'Tax Consultation (税务咨询)',
                        description: 'Tax planning and consultation (税务筹划与咨询)',
                        duration: 0,
                        actualDuration: 0,
                        startDay: totalWorkingDays - 3,
                        endDay: totalWorkingDays,
                        parallel: true,
                        parallelGroup: 'EXTRA',
                        responsible: 'Tax Consultant (税务顾问)',
                        documents: ['Business Scope (业务范围)', 'Expected Revenue (预期营收)'],
                        requirements: [],
                        risks: [],
                        deliverables: ['Tax Planning Report (税务筹划方案)', 'Compliance Guidance (合规指引)']
                    }
                ]
            };
            phases.push(taxPhase);
        }
        
        // 公司秘书服务（并行，不增加总时长）
        if (services.includes('secretary')) {
            const secretaryPhase = {
                phase: phases.length + 1,
                name: 'Company Secretary Service (公司秘书服务)',
                description: 'Annual compliance and secretarial services (年度合规和秘书服务)',
                actualDuration: 0,
                startDay: totalWorkingDays,
                endDay: totalWorkingDays,
                tasks: [
                    {
                        taskId: 'EXTRA-SEC-T1',
                        name: 'Company Secretary Service (公司秘书服务)',
                        description: 'Ongoing secretarial support (持续秘书服务)',
                        duration: 0,
                        actualDuration: 0,
                        startDay: totalWorkingDays,
                        endDay: totalWorkingDays,
                        parallel: true,
                        parallelGroup: 'EXTRA',
                        responsible: 'Company Secretary (公司秘书)',
                        documents: [],
                        requirements: [],
                        risks: [],
                        deliverables: ['Annual Compliance Service (年度合规服务)', 'Document Filing (文件归档)', 'Registered Address (注册地址)']
                    }
                ]
            };
            phases.push(secretaryPhase);
        }
    }
    
    return {
        totalWorkingDays,
        totalCalendarDays: calculateCalendarDays(totalWorkingDays, jurisdiction),
        phases,
        expressDeliveryDays
    };
}

// 调用快递评估工具（确保使用express-tool的计算逻辑）
function calculateExpressDelivery(fromCountry, toCountry, weight) {
    try {
        // 调用express-tool的calculateExpressOptions函数
        if (typeof calculateExpressOptions === 'function') {
            const result = calculateExpressOptions({
                fromCountry,
                toCountry,
                weight: weight || 0.5,  // 默认0.5kg
                urgent: false,
                parcelType: 'document',
                serviceType: 'standard'
            });
            
            if (result && result.recommended) {
                // 提取天数
                const timeStr = result.recommended.time;
                const days = parseExpressTime(timeStr);
                
                // 确保至少返回1天
                const finalDays = Math.max(days, 1);
                
                console.log(`快递计算: ${fromCountry} -> ${toCountry}, 时间: ${timeStr}, 解析天数: ${finalDays}天`);
                
                return {
                    days: finalDays,
                    price: result.recommended.price,
                    company: result.recommended.name,
                    time: timeStr
                };
            }
        }
        
        // 如果函数不存在，记录警告
        console.warn('calculateExpressOptions 函数不可用，使用默认估算');
    } catch (e) {
        console.error('快递计算失败:', e);
    }
    
    // 如果API调用失败，使用默认估算
    const defaultDays = estimateDefaultExpressTime(fromCountry, toCountry);
    console.log(`使用默认快递时间: ${fromCountry} -> ${toCountry} = ${defaultDays}天`);
    
    return {
        days: Math.max(defaultDays, 1),
        price: 0,
        company: 'Estimated (预估)',
        time: `${defaultDays}天`
    };
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
        // 确保至少返回1天
        return Math.max(Math.ceil((min + max) / 2), 1);  // 取平均值并向上取整，至少为1天
    }
    
    const singleMatch = timeStr.match(/(\d+)天/);
    if (singleMatch) {
        // 确保至少返回1天
        return Math.max(parseInt(singleMatch[1]), 1);
    }
    
    // 默认至少返回1天
    return 1;
}

// 默认快递时间估算（如果快递API不可用）
function estimateDefaultExpressTime(fromCountry, toCountry) {
    const expressTimeMatrix = {
        'HK': { 'CN': 4, 'US': 7, 'UK': 8, 'SG': 3, 'AU': 5, 'JP': 3, 'CA': 8 },
        'SG': { 'CN': 5, 'US': 8, 'UK': 9, 'HK': 3, 'AU': 4, 'JP': 4, 'CA': 9 },
        'US': { 'CN': 8, 'HK': 7, 'SG': 8, 'UK': 6, 'AU': 6, 'JP': 5, 'CA': 3 },
        'UK': { 'CN': 9, 'HK': 8, 'SG': 9, 'US': 6, 'AU': 7, 'JP': 8, 'CA': 7 },
        'CN': { 'HK': 4, 'SG': 5, 'US': 8, 'UK': 9, 'AU': 6, 'JP': 4, 'CA': 9 },
        'JP': { 'CN': 4, 'HK': 3, 'SG': 4, 'US': 5, 'UK': 8, 'AU': 5, 'CA': 6 },
        'AU': { 'CN': 6, 'HK': 5, 'SG': 4, 'US': 6, 'UK': 7, 'JP': 5, 'CA': 7 },
        'CA': { 'CN': 9, 'HK': 8, 'SG': 9, 'US': 3, 'UK': 7, 'JP': 6, 'AU': 7 },
        'BVI': { 'CN': 10, 'HK': 8, 'SG': 9, 'US': 7, 'UK': 8, 'AU': 9, 'JP': 9, 'CA': 8 },
        'Cayman': { 'CN': 10, 'HK': 8, 'SG': 9, 'US': 7, 'UK': 8, 'AU': 9, 'JP': 9, 'CA': 8 }
    };
    
    // 确保至少返回1天
    return Math.max(expressTimeMatrix[fromCountry]?.[toCountry] || 7, 1);
}

// 计算自然日（考虑周末和节假日）
function calculateCalendarDays(workingDays, jurisdiction) {
    const weekendDays = Math.floor(workingDays / 5) * 2;  // 每5个工作日有2天周末
    const avgHolidaysPerMonth = 2;  // 平均每月2天节假日
    const estimatedMonths = workingDays / 20;  // 假设每月20个工作日
    const holidayDays = Math.ceil(estimatedMonths * avgHolidaysPerMonth);
    
    return workingDays + weekendDays + holidayDays;
}

// 匹配供应商（基于用户需求智能推荐，至少3个）
function matchSuppliers(jurisdiction, formData = {}) {
    // 第一步：过滤出有该地区专长的供应商
    let filtered = SUPPLIERS.filter(supplier => 
        supplier.specialties.includes(jurisdiction)
    ).map(supplier => {
        let matchScore = 0;
        const reasons = [];  // 推荐理由列表
        
        // 基础匹配：有该地区专长
        matchScore += 30;
        reasons.push(`专注于${JURISDICTIONS[jurisdiction]?.name || jurisdiction}公司注册，经验丰富`);
        
        // 服务匹配加分：如果用户选择了额外服务，优先推荐有相关优势的供应商
        if (formData.services && Array.isArray(formData.services)) {
            const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
            
            if (services.includes('bank')) {
                if (supplier.advantages.some(adv => adv.includes('银行开户') || adv.includes('开户'))) {
                    matchScore += 12;
                    reasons.push('提供专业银行开户协助服务');
                }
                // 检查strengths中是否有银行相关优势
                if (supplier.strengths?.bank) {
                    matchScore += 8;
                    reasons.push(supplier.strengths.bank);
                }
            }
            
            if (services.includes('tax') && supplier.advantages.some(adv => adv.includes('税务') || adv.includes('财税'))) {
                matchScore += 10;
                reasons.push('具备专业税务筹划和申报能力');
            }
            
            if (services.includes('secretary') && supplier.advantages.some(adv => adv.includes('秘书') || adv.includes('合规'))) {
                matchScore += 10;
                reasons.push('提供公司秘书和持续合规服务');
            }
            
            if (services.includes('trademark') && supplier.certifications.some(cert => cert.includes('商标'))) {
                matchScore += 10;
                reasons.push('有商标注册专业资质');
            }
            
            if (services.includes('accounting') && supplier.advantages.some(adv => adv.includes('记账') || adv.includes('财务'))) {
                matchScore += 10;
                reasons.push('提供代理记账和财务管理服务');
            }
        }
        
        // 地区专长加分：根据供应商的strengths生成推荐理由
        const jurisdictionInfo = JURISDICTIONS[jurisdiction];
        const region = jurisdictionInfo?.region;
        
        if (supplier.regions && supplier.regions.includes(region)) {
            matchScore += 12;
            reasons.push(`专注于${region}地区业务`);
        }
        
        // 根据具体国家添加专业理由
        if (jurisdiction === 'HK' && supplier.strengths?.hongkong) {
            matchScore += 15;
            reasons.push(supplier.strengths.hongkong);
        }
        if (['BVI', 'Cayman', 'Seychelles'].includes(jurisdiction) && supplier.strengths?.offshore) {
            matchScore += 15;
            reasons.push(supplier.strengths.offshore);
        }
        if (jurisdiction === 'US' && supplier.strengths?.usa) {
            matchScore += 15;
            reasons.push(supplier.strengths.usa);
        }
        if (['UK', 'DE', 'FR', 'NL', 'IE'].includes(jurisdiction) && supplier.strengths?.eu) {
            matchScore += 12;
            reasons.push(supplier.strengths.eu);
        }
        
        // 复杂度加分：跨国股东/董事需要更专业的服务
        let hasForeignParticipants = false;
        if (formData.shareholders && formData.shareholders.length > 0) {
            const shareholderNationalities = formData.shareholders[0].nationalities || [];
            if (shareholderNationalities.some(nat => nat && nat !== jurisdiction && nat !== 'Unknown')) {
                hasForeignParticipants = true;
            }
        }
        if (formData.directors && formData.directors.length > 0) {
            const directorNationalities = formData.directors[0].nationalities || [];
            if (directorNationalities.some(nat => nat && nat !== jurisdiction && nat !== 'Unknown')) {
                hasForeignParticipants = true;
            }
        }
        
        if (hasForeignParticipants) {
            if (supplier.experience >= 12) {
                matchScore += 10;
                reasons.push(`${supplier.experience}年跨国业务经验，熟悉国际股东文件处理`);
            }
        }
        
        // 价格优势
        const priceInfo = supplier.price[jurisdiction];
        if (priceInfo && priceInfo.total < 6000) {
            matchScore += 8;
            reasons.push(`价格具有竞争力，性价比高`);
        }
        
        // 评分和案例数量加分
        if (supplier.rating >= 4.8) {
            matchScore += 5;
            reasons.push(`客户满意度${supplier.rating}/5.0，服务质量保障`);
        }
        
        if (supplier.completedCases >= 3000) {
            matchScore += 5;
            reasons.push(`已成功服务${supplier.completedCases}+家企业`);
        }
        
        // 认证和资质
        if (supplier.certifications && supplier.certifications.length >= 3) {
            matchScore += 5;
            reasons.push(`持有${supplier.certifications.slice(0, 2).join('、')}等多项专业资质`);
        }
        
        return {
            ...supplier,
            price: priceInfo || { service: 8000, government: 2000, total: 10000 },
            matchScore,
            recommendReasons: reasons.slice(0, 5)  // 最多显示5个推荐理由
        };
    }).sort((a, b) => {
        // 综合评分排序：匹配度50% + 价格25% + 评分15% + 经验10%
        const scoreA = (a.matchScore / 100) * 0.5 + (1 - Math.min(a.price.total, 10000) / 10000) * 0.25 + (a.rating / 5) * 0.15 + (a.experience / 20) * 0.1;
        const scoreB = (b.matchScore / 100) * 0.5 + (1 - Math.min(b.price.total, 10000) / 10000) * 0.25 + (b.rating / 5) * 0.15 + (b.experience / 20) * 0.1;
        return scoreB - scoreA;
    });
    
    // 如果过滤后少于3个，尝试添加其他供应商
    if (filtered.length < 3) {
        const remainingSuppliers = SUPPLIERS.filter(supplier => 
            !supplier.specialties.includes(jurisdiction)
        ).map(supplier => {
            const priceInfo = supplier.price[jurisdiction] || { service: 8000, government: 2000, total: 10000 };
            return {
                ...supplier,
                price: priceInfo,
                matchScore: 15,  // 低匹配分
                recommendReasons: [
                    `虽非${JURISDICTIONS[jurisdiction]?.name}专业机构，但具备全球服务经验`,
                    `可提供${JURISDICTIONS[jurisdiction]?.name}公司注册服务`,
                    `${supplier.experience}年国际商务服务经验`
                ]
            };
        });
        
        filtered = [...filtered, ...remainingSuppliers].slice(0, 3);
    }
    
    // 确保至少返回3个供应商
    return filtered.slice(0, Math.max(3, filtered.length));
}

// 生成流程时间线数据(基于用户表单数据动态评估)
function generateTimeline(jurisdiction, supplierId, deliveryInfo, formData = {}) {
    const duration = calculateTotalDuration(jurisdiction, supplierId, deliveryInfo, formData);
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    const risks = [
        ...(RISK_ALERTS.common || []),
        ...(RISK_ALERTS[jurisdiction] || [])
    ];
    
    // 根据用户填写的股东董事数量添加风险提示
    const shareholderCount = formData.shareholders && formData.shareholders.length > 0 && formData.shareholders[0].count 
        ? formData.shareholders[0].count 
        : 0;
    const directorCount = formData.directors && formData.directors.length > 0 && formData.directors[0].count 
        ? formData.directors[0].count 
        : 0;
        
    if (shareholderCount > 3) {
        risks.push({
            level: 'warning',
            title: 'Multiple Shareholders (多股东提示)',
            content: `You have ${shareholderCount} shareholders, which may require additional time for document preparation and notarization (您有${shareholderCount}位股东,文件准备和公证可能需要额外时间)`
        });
    }
    
    if (directorCount > 2) {
        risks.push({
            level: 'info',
            title: 'Multiple Directors (多董事说明)',
            content: `You have ${directorCount} directors, please ensure all directors' documents are complete (您有${directorCount}位董事,请确保所有董事的文件齐全)`
        });
    }
    
    // 根据选择的额外服务添加风险提示
    if (formData.services && Array.isArray(formData.services)) {
        const services = formData.services.map(s => typeof s === 'string' ? s : s.type);
        
        if (services.includes('bank')) {
            risks.push({
                level: 'info',
                title: 'Bank Account Opening (银行开户说明)',
                content: 'Bank account opening usually requires 1-2 weeks after company registration, and may require in-person visit (银行开户通常需要在公司注册完成后1-2周,可能需要本人到场)'
            });
        }
        
        if (services.includes('trademark')) {
            risks.push({
                level: 'warning',
                title: 'Trademark Registration (商标注册周期)',
                content: 'Trademark registration is a separate process, typically taking 6-12 months, and does not affect company registration timeline (商标注册是独立流程,通常需要6-12个月,不影响公司注册时效)'
            });
        }
    }
    
    return {
        jurisdiction: jurisdictionInfo,
        totalWorkingDays: duration.totalWorkingDays,
        totalCalendarDays: duration.totalCalendarDays,
        phases: duration.phases,  // 返回阶段数据而不是steps
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
