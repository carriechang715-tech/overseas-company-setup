// 境外公司设立计算器

// 计算总流程时间
function calculateTotalDuration(jurisdiction, supplierId, deliveryInfo) {
    const processSteps = SETUP_PROCESSES[jurisdiction]?.[supplierId] || [];
    
    let totalWorkingDays = 0;
    let expressDeliveryDays = 0;
    const steps = [];
    
    processSteps.forEach((step, index) => {
        let stepDuration = step.duration;
        
        // 处理州相关的特殊情况（美国）
        if (step.stateDependent && jurisdiction === 'US' && deliveryInfo.state) {
            const stateInfo = JURISDICTIONS.US.states[deliveryInfo.state];
            stepDuration = stateInfo?.days || 10;
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

// 匹配供应商
function matchSuppliers(jurisdiction) {
    return SUPPLIERS.filter(supplier => 
        supplier.specialties.includes(jurisdiction)
    ).map(supplier => ({
        ...supplier,
        price: supplier.price[jurisdiction] || { service: 0, government: 0, total: 0 }
    })).sort((a, b) => {
        // 按综合评分排序：价格30% + 评分40% + 经验30%
        const scoreA = (1 - a.price.total / 10000) * 0.3 + (a.rating / 5) * 0.4 + (a.experience / 20) * 0.3;
        const scoreB = (1 - b.price.total / 10000) * 0.3 + (b.rating / 5) * 0.4 + (b.experience / 20) * 0.3;
        return scoreB - scoreA;
    });
}

// 生成流程时间线数据
function generateTimeline(jurisdiction, supplierId, deliveryInfo) {
    const duration = calculateTotalDuration(jurisdiction, supplierId, deliveryInfo);
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    const risks = [
        ...(RISK_ALERTS.common || []),
        ...(RISK_ALERTS[jurisdiction] || [])
    ];
    
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
