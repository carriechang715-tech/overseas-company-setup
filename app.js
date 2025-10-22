// 主应用逻辑

let currentStep = 1;
let formData = {};
let selectedSupplier = null;

// 页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    setupOtherServiceToggle();
});

// 初始化表单
function initializeForm() {
    const jurisdiction = document.getElementById('jurisdiction');
    const deliveryCountry = document.getElementById('deliveryCountry');
    
    // 监听注册地变化
    jurisdiction.addEventListener('change', function() {
        handleJurisdictionChange(this.value);
    });
    
    // 监听收件国家变化
    deliveryCountry.addEventListener('change', function() {
        handleDeliveryCountryChange(this.value);
    });
    
    // 初始化时加载默认公司类型
    updateCompanyTypes(DEFAULT_COMPANY_TYPES);
    
    // 初始化收件城市选项
    handleDeliveryCountryChange('CN');
}

// 处理收件国家变化
function handleDeliveryCountryChange(countryCode) {
    const deliveryCitySelect = document.getElementById('deliveryCity');
    
    // 城市数据定义
    const DELIVERY_CITIES = {
        'CN': [
            { value: 'Beijing', label: '北京 Beijing' },
            { value: 'Shanghai', label: '上海 Shanghai' },
            { value: 'Guangzhou', label: '广州 Guangzhou' },
            { value: 'Shenzhen', label: '深圳 Shenzhen' },
            { value: 'Chengdu', label: '成都 Chengdu' },
            { value: 'Hangzhou', label: '杭州 Hangzhou' },
            { value: 'Wuhan', label: '武汉 Wuhan' },
            { value: 'Chongqing', label: '重庆 Chongqing' },
            { value: 'Xian', label: '西安 Xi\'an' },
            { value: 'Nanjing', label: '南京 Nanjing' }
        ],
        'HK': [
            { value: 'Hong Kong Island', label: 'Hong Kong Island (香港岛)' },
            { value: 'Kowloon', label: 'Kowloon (九龙)' },
            { value: 'New Territories', label: 'New Territories (新界)' }
        ],
        'SG': [
            { value: 'Singapore', label: 'Singapore (新加坡)' }
        ],
        'US': [
            { value: 'New York', label: 'New York (纽约)' },
            { value: 'Los Angeles', label: 'Los Angeles (洛杉矶)' },
            { value: 'Chicago', label: 'Chicago (芝加哥)' },
            { value: 'San Francisco', label: 'San Francisco (旧金山)' },
            { value: 'Seattle', label: 'Seattle (西雅图)' },
            { value: 'Boston', label: 'Boston (波士顿)' }
        ],
        'UK': [
            { value: 'London', label: 'London (伦敦)' },
            { value: 'Manchester', label: 'Manchester (曼彻斯特)' },
            { value: 'Birmingham', label: 'Birmingham (伯明翰)' },
            { value: 'Edinburgh', label: 'Edinburgh (爱丁堡)' }
        ],
        'JP': [
            { value: 'Tokyo', label: 'Tokyo (东京)' },
            { value: 'Osaka', label: 'Osaka (大阪)' },
            { value: 'Kyoto', label: 'Kyoto (京都)' },
            { value: 'Yokohama', label: 'Yokohama (横滨)' }
        ],
        'AU': [
            { value: 'Sydney', label: 'Sydney (悉尼)' },
            { value: 'Melbourne', label: 'Melbourne (墨尔本)' },
            { value: 'Brisbane', label: 'Brisbane (布里斯班)' },
            { value: 'Perth', label: 'Perth (珀斯)' }
        ],
        'CA': [
            { value: 'Toronto', label: 'Toronto (多伦多)' },
            { value: 'Vancouver', label: 'Vancouver (温哥华)' },
            { value: 'Montreal', label: 'Montreal (蒙特利尔)' },
            { value: 'Calgary', label: 'Calgary (卡尔加里)' }
        ]
    };
    
    // 清空并重新填充城市选项
    deliveryCitySelect.innerHTML = '<option value="">Please select (请选择)</option>';
    
    const cities = DELIVERY_CITIES[countryCode] || [];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.value;
        option.textContent = city.label;
        deliveryCitySelect.appendChild(option);
    });
}

// 处理注册地变化
function handleJurisdictionChange(jurisdictionCode) {
    const subRegionGroup = document.getElementById('subRegionGroup');
    const subRegionSelect = document.getElementById('subRegion');
    const subRegionLabel = document.getElementById('subRegionLabel');
    const subRegionHint = document.getElementById('subRegionHint');
    const companyTypeSelect = document.getElementById('companyType');
    
    if (!jurisdictionCode || !JURISDICTIONS[jurisdictionCode]) {
        subRegionGroup.style.display = 'none';
        // 重置为默认公司类型
        updateCompanyTypes(DEFAULT_COMPANY_TYPES);
        return;
    }
    
    const jurisdiction = JURISDICTIONS[jurisdictionCode];
    
    // 更新公司类型选项
    const companyTypes = jurisdiction.companyTypes || DEFAULT_COMPANY_TYPES;
    updateCompanyTypes(companyTypes);
    
    // 检查是否有子地区
    if (jurisdiction.hasSubRegions && jurisdiction.subRegions) {
        // 显示子地区选择框
        subRegionGroup.style.display = 'block';
        
        // 更新标签
        if (jurisdictionCode === 'US') {
            subRegionLabel.textContent = 'State/City (州/城市)';
            subRegionHint.textContent = 'Registration timeline and tax rates vary significantly by state, please select based on your business needs (不同州的注册时效和税率差异较大，请根据业务需求选择)';
        } else if (jurisdictionCode === 'CA') {
            subRegionLabel.textContent = 'Province/City (省/城市)';
            subRegionHint.textContent = 'Tax rates and policies vary by province (不同省份的税率和政策有所不同)';
        } else if (jurisdictionCode === 'AU') {
            subRegionLabel.textContent = 'State/City (州/城市)';
            subRegionHint.textContent = 'Policies and business environment vary by state (不同州的政策和营商环境有所差异)';
        } else {
            subRegionLabel.textContent = 'City/Region (城市/地区)';
            subRegionHint.textContent = 'Registration timeline and fees may vary by city/region (不同城市/地区的注册时效和费用可能不同)';
        }
        
        // 清空并重新填充选项
        subRegionSelect.innerHTML = '<option value="">Please select (请选择)</option>';
        
        // 按照popular先后排序
        const regions = Object.entries(jurisdiction.subRegions).sort((a, b) => {
            if (a[1].popular === b[1].popular) return 0;
            return a[1].popular ? -1 : 1;
        });
        
        regions.forEach(([code, region]) => {
            const option = document.createElement('option');
            option.value = code;
            
            // 构建选项文本（不包含天数）
            let text = region.name;
            if (region.tax) {
                text += ` (Tax Rate (税率): ${region.tax})`;
            }
            if (region.popular) {
                text = '★ ' + text;
            }
            
            option.textContent = text;
            option.title = region.description || '';
            subRegionSelect.appendChild(option);
        });
    } else {
        // 隐藏子地区选择框
        subRegionGroup.style.display = 'none';
        subRegionSelect.value = '';
    }
}

// 更新公司类型选项
function updateCompanyTypes(companyTypes) {
    const companyTypeSelect = document.getElementById('companyType');
    const currentValue = companyTypeSelect.value;
    
    // 清空现有选项
    companyTypeSelect.innerHTML = '<option value="">Please select (请选择)</option>';
    
    // 按照popular先后排序
    const sortedTypes = [...companyTypes].sort((a, b) => {
        if (a.popular === b.popular) return 0;
        return a.popular ? -1 : 1;
    });
    
    // 添加选项
    sortedTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        
        // 如果是热门类型，添加星号标记
        if (type.popular) {
            option.textContent = '★ ' + option.textContent;
        }
        
        companyTypeSelect.appendChild(option);
    });
    
    // 尝试保持之前选中的值（如果该选项在新列表中存在）
    if (currentValue && companyTypes.some(t => t.value === currentValue)) {
        companyTypeSelect.value = currentValue;
    }
}

// 设置"其他"选项切换
function setupOtherServiceToggle() {
    const otherCheckbox = document.getElementById('otherServiceCheckbox');
    const otherGroup = document.getElementById('otherServiceGroup');
    const otherInput = document.getElementById('otherServiceInput');
    
    if (otherCheckbox) {
        otherCheckbox.addEventListener('change', function() {
            if (this.checked) {
                otherGroup.style.display = 'block';
                otherInput.focus();
            } else {
                otherGroup.style.display = 'none';
                otherInput.value = '';
            }
        });
    }
}

// 全选/取消全选服务
function toggleAllServices(selectAllCheckbox) {
    const serviceCheckboxes = document.querySelectorAll('[name="services[]"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        
        // 如果全选包含"其他"，则显示输入框
        if (checkbox.id === 'otherServiceCheckbox' && checkbox.checked) {
            document.getElementById('otherServiceGroup').style.display = 'block';
        } else if (checkbox.id === 'otherServiceCheckbox' && !checkbox.checked) {
            document.getElementById('otherServiceGroup').style.display = 'none';
            document.getElementById('otherServiceInput').value = '';
        }
    });
}

// 设置事件监听
function setupEventListeners() {
    const form = document.getElementById('companyForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

// 处理表单提交
function handleFormSubmit() {
    // 收集表单数据
    formData = {
        jurisdiction: document.getElementById('jurisdiction').value,
        subRegion: document.getElementById('subRegion').value || null,
        companyName: document.getElementById('companyName').value,
        companyType: document.getElementById('companyType').value,
        businessScope: document.getElementById('businessScope').value,
        registeredCapital: document.getElementById('registeredCapital').value,
        needRegisteredAddress: document.getElementById('needRegisteredAddress').checked,
        deliveryCountry: document.getElementById('deliveryCountry').value,
        deliveryCity: document.getElementById('deliveryCity').value,
        shareholders: collectShareholders(),
        directors: collectDirectors(),
        services: collectServices()
    };
    
    // 显示供应商推荐
    showSuppliers();
    goToStep(2);
}

// 收集股东信息（简化版）
function collectShareholders() {
    const count = document.getElementById('shareholderCount')?.value;
    const nationality = document.getElementById('shareholderNationality')?.value;
    
    if (!count || count === '' || count === '0') {
        return [];
    }
    
    // 返回简化的股东信息
    return [{
        count: parseInt(count),
        nationality: nationality || 'Unknown'
    }];
}

// 收集董事信息（简化版）
function collectDirectors() {
    const count = document.getElementById('directorCount')?.value;
    const nationality = document.getElementById('directorNationality')?.value;
    
    if (!count || count === '' || count === '0') {
        return [];
    }
    
    // 返回简化的董事信息
    return [{
        count: parseInt(count),
        nationality: nationality || 'Unknown'
    }];
}

// 收集服务
function collectServices() {
    const services = [];
    document.querySelectorAll('[name="services[]"]:checked').forEach(cb => {
        if (cb.value === 'other') {
            // 如果选了"其他"，收集用户输入的内容
            const otherInput = document.getElementById('otherServiceInput');
            if (otherInput && otherInput.value.trim()) {
                services.push({
                    type: 'other',
                    description: otherInput.value.trim()
                });
            }
        } else {
            services.push(cb.value);
        }
    });
    return services;
}

// 显示供应商列表（基于用户需求智能匹配）
function showSuppliers() {
    const suppliers = matchSuppliers(formData.jurisdiction, formData);
    const container = document.querySelector('.suppliers-container');
    
    const jurisdictionInfo = JURISDICTIONS[formData.jurisdiction];
    
    let html = `
        <div class="suppliers-header">
            <h2>🏆 Recommended Suppliers (推荐供应商) - ${jurisdictionInfo.flag} ${jurisdictionInfo.name}</h2>
            <p>We have matched <strong>${suppliers.length}</strong> professional service providers for you based on your requirements (根据您的需求，已为您匹配 <strong>${suppliers.length}</strong> 家专业服务商)</p>
            
            <!-- 匹配说明 -->
            ${formData.services && formData.services.length > 0 ? `
                <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 12px; margin-top: 15px; border-radius: 6px; font-size: 14px;">
                    <strong style="color: #059669;">✨ Smart Matching (智能匹配):</strong> 
                    Based on your selected additional services, we prioritize suppliers with relevant expertise (根据您选择的额外服务，优先推荐有相关专长的供应商)
                </div>
            ` : ''}
        </div>
    `;
    
    suppliers.forEach((supplier, index) => {
        const isRecommended = index === 0;
        html += `
            <div class="supplier-card ${isRecommended ? 'recommended' : ''}">
                ${isRecommended ? '<div class="recommended-badge">⭐ Top Recommendation (推荐首选)</div>' : ''}
                <div class="supplier-header">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-rating">
                        ${'★'.repeat(Math.floor(supplier.rating))}${'☆'.repeat(5-Math.floor(supplier.rating))}
                        <span>${supplier.rating}</span>
                    </div>
                </div>
                <div class="supplier-info">
                    <div class="info-item">
                        <span class="label">Experience (从业经验)</span>
                        <span class="value">${supplier.experience} Years (年)</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Completed Cases (完成案例)</span>
                        <span class="value">${supplier.completedCases.toLocaleString()} Companies (家)</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Service Fee (服务费)</span>
                        <span class="value price">${formatPrice(supplier.price.service)}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Government Fee (政府费用)</span>
                        <span class="value">${formatPrice(supplier.price.government)}</span>
                    </div>
                    <div class="info-item total">
                        <span class="label">Total Fee (总费用)</span>
                        <span class="value price-total">${formatPrice(supplier.price.total)}</span>
                    </div>
                </div>
                <div class="supplier-advantages">
                    <h4>Service Advantages (服务优势):</h4>
                    <div class="tags">
                        ${supplier.advantages.map(adv => `<span class="tag">${adv}</span>`).join('')}
                    </div>
                </div>
                <div class="supplier-certifications">
                    <strong>Certifications (资质认证):</strong>
                    ${supplier.certifications.map(cert => `<span class="cert">${cert}</span>`).join(' | ')}
                </div>
                <div class="supplier-contact">
                    <span>📞 ${supplier.contact.phone}</span>
                    <span>📧 ${supplier.contact.email}</span>
                </div>
                <button class="btn-select" onclick="selectSupplier('${supplier.id}')">
                    View Detailed Process (查看详细流程)
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 选择供应商
function selectSupplier(supplierId) {
    selectedSupplier = supplierId;
    showTimeline();
    goToStep(3);
}

// 显示流程时间线（基于表单数据动态评估）
function showTimeline() {
    const timeline = generateTimeline(
        formData.jurisdiction,
        selectedSupplier,
        { 
            toCountry: formData.deliveryCountry, 
            subRegion: formData.subRegion 
        },
        formData  // 传递完整的表单数据
    );
    
    const container = document.querySelector('.timeline-container');
    
    // 构建地区显示文本
    let jurisdictionDisplay = `${timeline.jurisdiction.flag} ${timeline.jurisdiction.name}`;
    if (formData.subRegion && timeline.jurisdiction.subRegions) {
        const subRegion = timeline.jurisdiction.subRegions[formData.subRegion];
        if (subRegion) {
            jurisdictionDisplay += ` - ${subRegion.name}`;
        }
    }
    
    let html = `
        <div class="timeline-header">
            <h2>📅 Setup Process Timeline (设立流程时间线) - ${jurisdictionDisplay}</h2>
            
            <!-- 基于用户输入的评估说明 -->
            <div class="assessment-info" style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
                <h4 style="margin-top: 0; color: #0369a1;">📈 Assessment Based on Your Information (基于您的信息评估)</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 14px;">
                    ${formData.companyName ? `<div><strong>Company Name (公司名称):</strong> ${formData.companyName}</div>` : ''}
                    ${formData.companyType ? `<div><strong>Company Type (公司类型):</strong> ${formData.companyType}</div>` : ''}
                    ${formData.shareholders && formData.shareholders.length > 0 && formData.shareholders[0].count ? `<div><strong>Shareholders (股东):</strong> ${formData.shareholders[0].count} person(s) (位)${formData.shareholders[0].nationality !== 'Unknown' ? ` - ${formData.shareholders[0].nationality}` : ''}</div>` : '<div><strong>Shareholders (股东):</strong> Not specified (未填写)</div>'}
                    ${formData.directors && formData.directors.length > 0 && formData.directors[0].count ? `<div><strong>Directors (董事):</strong> ${formData.directors[0].count} person(s) (位)${formData.directors[0].nationality !== 'Unknown' ? ` - ${formData.directors[0].nationality}` : ''}</div>` : '<div><strong>Directors (董事):</strong> Not specified (未填写)</div>'}
                    ${formData.services && formData.services.length > 0 ? `<div><strong>Additional Services (额外服务):</strong> ${formData.services.length} service(s) (项)</div>` : '<div><strong>Additional Services (额外服务):</strong> None (无)</div>'}
                    ${formData.deliveryCountry ? `<div><strong>Delivery to (邮寄到):</strong> ${formData.deliveryCity ? formData.deliveryCity + ', ' : ''}${formData.deliveryCountry}</div>` : ''}
                </div>
                <p style="margin-bottom: 0; margin-top: 10px; color: #0369a1; font-size: 13px;">
                    👉 The timeline below is dynamically calculated based on your selections. Different regions, number of shareholders/directors, and additional services will affect the total time required.
                    <br>
                    👉 以下时间线是根据您的选择动态计算的，不同地区、股东/董事数量、额外服务都会影响总时长。
                </p>
            </div>
            
            <div class="timeline-summary">
                <div class="summary-item">
                    <span class="label">Total Working Days (总工作日)</span>
                    <span class="value">${timeline.totalWorkingDays} Days (天)</span>
                </div>
                <div class="summary-item">
                    <span class="label">Estimated Calendar Days (预计自然日)</span>
                    <span class="value">${timeline.totalCalendarDays} Days (天)</span>
                </div>
                <div class="summary-item">
                    <span class="label">Expected Completion Date (预计完成日期)</span>
                    <span class="value">${calculateCompletionDate(timeline.totalWorkingDays, formData.jurisdiction).toLocaleDateString('zh-CN')}</span>
                </div>
            </div>
        </div>
        
        <div class="timeline-phases">
            ${timeline.phases.map((phase, phaseIndex) => `
                <div class="timeline-phase">
                    <div class="phase-header">
                        <div class="phase-number">Phase ${phase.phase} (阶段 ${phase.phase})</div>
                        <h3 class="phase-name">${phase.name}</h3>
                        <span class="phase-duration">${phase.actualDuration} Working Days (工作日)</span>
                    </div>
                    <p class="phase-description">${phase.description}</p>
                    
                    <!-- 阶段内的任务列表 -->
                    <div class="phase-tasks">
                        ${phase.tasks.map((task, taskIndex) => {
                            const isParallel = task.parallel && task.parallelGroup;
                            const parallelGroupTasks = isParallel ? phase.tasks.filter(t => t.parallelGroup === task.parallelGroup) : [];
                            const isFirstInGroup = isParallel && parallelGroupTasks[0].taskId === task.taskId;
                            
                            return `
                            <div class="task-item ${isParallel ? 'parallel-task' : 'sequential-task'}" data-task-id="${task.taskId}">
                                ${isParallel && isFirstInGroup ? `
                                    <div class="parallel-indicator">
                                        ⚡ Parallel Tasks (并行处理 ${parallelGroupTasks.length} items) - Can be done simultaneously (可同时进行)
                                    </div>
                                ` : ''}
                                
                                <div class="task-header">
                                    <div class="task-number">${phaseIndex + 1}.${taskIndex + 1}</div>
                                    <div class="task-info">
                                        <h4 class="task-name">${task.name}</h4>
                                        <div class="task-meta">
                                            <span class="task-duration">⏱ ${task.actualDuration} Working Days (工作日)</span>
                                            <span class="task-timeline">📅 Day ${task.startDay}-${task.endDay}</span>
                                            ${task.responsible ? `<span class="task-responsible">👤 ${task.responsible}</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                                
                                <p class="task-description">${task.description}</p>
                                
                                ${task.documents && task.documents.length > 0 ? `
                                    <div class="task-documents">
                                        <strong>📄 Required Documents (所需文件):</strong>
                                        <ul>
                                            ${task.documents.map(doc => `<li>${doc}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${task.requirements && task.requirements.length > 0 ? `
                                    <div class="task-requirements">
                                        <strong>✅ Requirements (要求):</strong>
                                        <ul>
                                            ${task.requirements.map(req => `<li>${req}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${task.risks && task.risks.length > 0 ? `
                                    <div class="task-risks">
                                        <strong>⚠️ Risk Alerts (风险提示):</strong>
                                        <ul>
                                            ${task.risks.map(risk => `<li>${risk}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${task.deliverables && task.deliverables.length > 0 ? `
                                    <div class="task-deliverables">
                                        <strong>📦 Deliverables (交付物):</strong>
                                        ${task.deliverables.map(del => `<span class="deliverable">${del}</span>`).join(' ')}
                                    </div>
                                ` : ''}
                                
                                ${task.fromCountry ? `
                                    <div class="express-info">
                                        <strong>🚚 Express Information (快递信息):</strong>
                                        <span>From (从) ${task.fromCountry} To (寄往) ${formData.deliveryCountry}</span>
                                        <span class="express-duration">Estimated (预计) ${task.actualDuration} Working Days (工作日)</span>
                                    </div>
                                ` : ''}
                            </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <!-- 阶段总结 -->
                    <div class="phase-summary">
                        <strong>Phase ${phase.phase} Summary (阶段${phase.phase}总结):</strong>
                        Duration: ${phase.actualDuration} working days (工作日) | 
                        Timeline: Day ${phase.startDay} - Day ${phase.endDay}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="risk-alerts">
            <h3>⚠️ Important Notices (重要提示)</h3>
            ${timeline.risks.map(risk => `
                <div class="alert alert-${risk.level}">
                    <strong>${risk.title}</strong>
                    <p>${risk.content}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="documents-checklist">
            <h3>📋 Documents Preparation Checklist (文件准备清单)</h3>
            ${renderDocumentsChecklist()}
        </div>
    `;
    
    container.innerHTML = html;
}

// 渲染文件清单
function renderDocumentsChecklist() {
    let html = '';
    
    Object.keys(REQUIRED_DOCUMENTS).forEach(category => {
        const categoryData = REQUIRED_DOCUMENTS[category];
        html += `
            <div class="doc-category">
                <h4>${categoryData.name}</h4>
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Document Name (文件名称)</th>
                            <th>Description (说明)</th>
                            <th>Required (是否必须)</th>
                            <th>Notarization (公证认证)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categoryData.documents.map(doc => `
                            <tr>
                                <td>${doc.name}</td>
                                <td>${doc.description}</td>
                                <td>${doc.required ? '<span class="required">Required (必须)</span>' : '<span class="optional">Optional (可选)</span>'}</td>
                                <td>${doc.certify ? 'Yes (需要)' : 'No (不需要)'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    });
    
    return html;
}

// 切换步骤
function goToStep(step) {
    // 隐藏所有步骤
    document.querySelectorAll('.step-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // 显示目标步骤
    document.getElementById(`step${step}`).style.display = 'block';
    
    // 更新步骤指示器
    document.querySelectorAll('.step-indicator .step').forEach((stepEl, index) => {
        if (index + 1 < step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
    
    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 重置表单
function resetForm() {
    document.getElementById('companyForm').reset();
    formData = {};
    selectedSupplier = null;
    goToStep(1);
}

// 添加股东
function addShareholder() {
    const container = document.getElementById('shareholdersContainer');
    const index = container.querySelectorAll('.shareholder-item').length;
    
    const html = `
        <div class="shareholder-item" data-index="${index}">
            <div class="item-header">
                <h4>Shareholder (股东) #${index + 1}</h4>
                <button type="button" class="btn-remove" onclick="removeShareholder(this)">Remove (删除)</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Shareholder Type (股东类型)</label>
                    <select name="shareholderType[]" class="shareholderType">
                        <option value="individual">Individual (个人)</option>
                        <option value="corporate">Corporate (公司)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Name/Company Name (姓名/公司名)</label>
                    <input type="text" name="shareholderName[]" placeholder="Full Name / Company Name">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Nationality/Jurisdiction (国籍/注册地)</label>
                    <input type="text" name="shareholderNationality[]" placeholder="China">
                </div>
                <div class="form-group">
                    <label>Shareholding Percentage (持股比例) (%)</label>
                    <input type="number" name="shareholderPercentage[]" min="0" max="100" step="0.01">
                </div>
            </div>
            <div class="form-group">
                <label>Address (地址)</label>
                <input type="text" name="shareholderAddress[]" placeholder="Complete Address">
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
}

// 删除股东
function removeShareholder(btn) {
    btn.closest('.shareholder-item').remove();
}

// 添加董事
function addDirector() {
    const container = document.getElementById('directorsContainer');
    const index = container.querySelectorAll('.director-item').length;
    
    const html = `
        <div class="director-item" data-index="${index}">
            <div class="item-header">
                <h4>Director (董事) #${index + 1}</h4>
                <button type="button" class="btn-remove" onclick="removeDirector(this)">Remove (删除)</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Name (姓名)</label>
                    <input type="text" name="directorName[]" placeholder="Full Name">
                </div>
                <div class="form-group">
                    <label>Nationality (国籍)</label>
                    <input type="text" name="directorNationality[]" placeholder="China">
                </div>
            </div>
            <div class="form-group">
                <label>Address (地址)</label>
                <input type="text" name="directorAddress[]" placeholder="Complete Address">
            </div>
            <div class="form-group">
                <label>Contact Information (联系方式)</label>
                <input type="email" name="directorEmail[]" placeholder="Email">
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
}

// 删除董事
function removeDirector(btn) {
    btn.closest('.director-item').remove();
}
