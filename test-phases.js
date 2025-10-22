// 流程阶段化功能测试脚本

console.log('=== 流程阶段化功能测试 ===\n');

// 测试1: 检查数据结构
console.log('测试1: 检查process.js数据结构');
try {
    const hkSupplierA = SETUP_PROCESSES['HK']['supplier_a'];
    console.log('✓ 香港 supplier_a 存在');
    console.log('  - totalWorkingDays:', hkSupplierA.totalWorkingDays);
    console.log('  - phases数量:', hkSupplierA.phases.length);
    
    const phase1 = hkSupplierA.phases[0];
    console.log('  - Phase 1名称:', phase1.name);
    console.log('  - Phase 1任务数:', phase1.tasks.length);
    console.log('  - Phase 1任务1:', phase1.tasks[0].name);
    
    console.log('✓ 数据结构正确\n');
} catch (e) {
    console.error('✗ 数据结构错误:', e.message, '\n');
}

// 测试2: 检查并行任务支持
console.log('测试2: 检查并行任务支持');
try {
    const sgSupplierA = SETUP_PROCESSES['SG']['supplier_a'];
    const phase4 = sgSupplierA.phases[3]; // Phase 4: Tax Registration and Seal Production
    
    console.log('  - 阶段名称:', phase4.name);
    const parallelTasks = phase4.tasks.filter(t => t.parallel);
    console.log('  - 并行任务数量:', parallelTasks.length);
    console.log('  - 并行任务:', parallelTasks.map(t => t.name).join(', '));
    
    if (parallelTasks.length > 0) {
        console.log('✓ 并行任务支持正常\n');
    } else {
        console.warn('⚠ 未找到并行任务示例\n');
    }
} catch (e) {
    console.error('✗ 并行任务检查失败:', e.message, '\n');
}

// 测试3: 测试时间计算
console.log('测试3: 测试时间计算');
try {
    const deliveryInfo = {
        toCountry: 'CN',
        subRegion: null
    };
    
    const formData = {
        jurisdiction: 'HK',
        shareholders: [{name: 'Test 1'}, {name: 'Test 2'}],
        directors: [{name: 'Director 1'}],
        services: []
    };
    
    const duration = calculateTotalDuration('HK', 'supplier_a', deliveryInfo, formData);
    
    console.log('  - 总工作日:', duration.totalWorkingDays);
    console.log('  - 预计自然日:', duration.totalCalendarDays);
    console.log('  - 阶段数量:', duration.phases.length);
    
    duration.phases.forEach((phase, index) => {
        console.log(`  - Phase ${index + 1}: ${phase.name} (${phase.actualDuration}天)`);
    });
    
    console.log('✓ 时间计算正常\n');
} catch (e) {
    console.error('✗ 时间计算失败:', e.message, '\n');
}

// 测试4: 测试timeline生成
console.log('测试4: 测试timeline生成');
try {
    const deliveryInfo = {
        toCountry: 'CN',
        subRegion: null
    };
    
    const formData = {
        jurisdiction: 'HK',
        companyName: 'Test Company Limited',
        companyType: 'Limited',
        shareholders: [{name: 'Test 1'}],
        directors: [{name: 'Director 1'}],
        services: ['bank'],
        deliveryCountry: 'CN'
    };
    
    const timeline = generateTimeline('HK', 'supplier_a', deliveryInfo, formData);
    
    console.log('  - 总工作日:', timeline.totalWorkingDays);
    console.log('  - 阶段数量:', timeline.phases.length);
    console.log('  - 风险提示数量:', timeline.risks.length);
    console.log('  - 供应商:', timeline.supplier.name);
    
    console.log('✓ Timeline生成正常\n');
} catch (e) {
    console.error('✗ Timeline生成失败:', e.message, '\n');
}

// 测试5: 检查所有国家的数据完整性
console.log('测试5: 检查所有国家的数据完整性');
try {
    const jurisdictions = ['HK', 'SG', 'US', 'UK', 'BVI'];
    let allValid = true;
    
    jurisdictions.forEach(jur => {
        const suppliers = Object.keys(SETUP_PROCESSES[jur] || {});
        console.log(`  - ${jur}: ${suppliers.length}个供应商 (${suppliers.join(', ')})`);
        
        suppliers.forEach(supplierId => {
            const config = SETUP_PROCESSES[jur][supplierId];
            if (!config.phases || !Array.isArray(config.phases)) {
                console.error(`    ✗ ${supplierId} 缺少phases数组`);
                allValid = false;
            } else {
                const taskCount = config.phases.reduce((sum, p) => sum + p.tasks.length, 0);
                console.log(`    ✓ ${supplierId}: ${config.phases.length}阶段, ${taskCount}任务`);
            }
        });
    });
    
    if (allValid) {
        console.log('✓ 所有国家数据完整\n');
    } else {
        console.error('✗ 部分国家数据不完整\n');
    }
} catch (e) {
    console.error('✗ 数据完整性检查失败:', e.message, '\n');
}

// 测试6: 检查并行任务时间优化
console.log('测试6: 检查并行任务时间优化');
try {
    const deliveryInfo = { toCountry: 'CN', subRegion: null };
    const formData = { shareholders: [], directors: [], services: [] };
    
    const duration = calculateTotalDuration('SG', 'supplier_a', deliveryInfo, formData);
    
    // 检查Phase 4 (包含并行任务)
    const phase4 = duration.phases[3];
    console.log('  - Phase 4名称:', phase4.name);
    console.log('  - Phase 4任务数:', phase4.tasks.length);
    
    const parallelTasks = phase4.tasks.filter(t => t.parallel);
    if (parallelTasks.length > 1) {
        const maxDuration = Math.max(...parallelTasks.map(t => t.actualDuration));
        console.log('  - 并行任务数量:', parallelTasks.length);
        console.log('  - 各任务时长:', parallelTasks.map(t => t.actualDuration).join('天, ') + '天');
        console.log('  - Phase实际时长:', phase4.actualDuration, '天');
        console.log('  - 预期时长(最大值):', maxDuration, '天');
        
        if (phase4.actualDuration <= maxDuration + 0.1) {
            console.log('✓ 并行任务时间优化正确\n');
        } else {
            console.warn('⚠ 并行任务时间优化可能有误\n');
        }
    } else {
        console.log('  - 该阶段无并行任务\n');
    }
} catch (e) {
    console.error('✗ 并行任务时间优化检查失败:', e.message, '\n');
}

console.log('=== 测试完成 ===');
console.log('\n请在浏览器控制台运行此脚本以验证功能。');
console.log('使用方法: 在index.html页面打开浏览器控制台,复制粘贴此脚本并运行。');
