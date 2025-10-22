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
    
    // 监听注册地变化
    jurisdiction.addEventListener('change', function() {
        handleJurisdictionChange(this.value);
    });
}

// 处理注册地变化
function handleJurisdictionChange(jurisdictionCode) {
    const subRegionGroup = document.getElementById('subRegionGroup');
    const subRegionSelect = document.getElementById('subRegion');
    const subRegionLabel = document.getElementById('subRegionLabel');
    const subRegionHint = document.getElementById('subRegionHint');
    
    if (!jurisdictionCode || !JURISDICTIONS[jurisdictionCode]) {
        subRegionGroup.style.display = 'none';
        return;
    }
    
    const jurisdiction = JURISDICTIONS[jurisdictionCode];
    
    // 检查是否有子地区
    if (jurisdiction.hasSubRegions && jurisdiction.subRegions) {
        // 显示子地区选择框
        subRegionGroup.style.display = 'block';
        
        // 更新标签
        if (jurisdictionCode === 'US') {
            subRegionLabel.textContent = '州/城市';
            subRegionHint.textContent = '不同州的注册时效和税率差异较大，请根据业务需求选择';
        } else if (jurisdictionCode === 'CA') {
            subRegionLabel.textContent = '省/城市';
            subRegionHint.textContent = '不同省份的税率和政策有所不同';
        } else if (jurisdictionCode === 'AU') {
            subRegionLabel.textContent = '州/城市';
            subRegionHint.textContent = '不同州的政策和营商环境有所差异';
        } else {
            subRegionLabel.textContent = '城市/地区';
            subRegionHint.textContent = '不同城市/地区的注册时效和费用可能不同';
        }
        
        // 清空并重新填充选项
        subRegionSelect.innerHTML = '<option value="">请选择</option>';
        
        // 按照popular先后排序
        const regions = Object.entries(jurisdiction.subRegions).sort((a, b) => {
            if (a[1].popular === b[1].popular) return 0;
            return a[1].popular ? -1 : 1;
        });
        
        regions.forEach(([code, region]) => {
            const option = document.createElement('option');
            option.value = code;
            
            // 构建选项文本
            let text = region.name;
            if (region.days) {
                text += ` - ${region.days}天`;
            }
            if (region.tax) {
                text += ` (税率: ${region.tax})`;
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
        fiscalYearEnd: document.getElementById('fiscalYearEnd').value,
        needRegisteredAddress: document.getElementById('needRegisteredAddress').checked,
        deliveryCountry: document.getElementById('deliveryCountry').value,
        deliveryAddress: document.getElementById('deliveryAddress').value,
        shareholders: collectShareholders(),
        directors: collectDirectors(),
        services: collectServices()
    };
    
    // 显示供应商推荐
    showSuppliers();
    goToStep(2);
}

// 收集股东信息（可选）
function collectShareholders() {
    const shareholders = [];
    document.querySelectorAll('.shareholder-item').forEach(item => {
        const name = item.querySelector('[name="shareholderName[]"]').value.trim();
        const type = item.querySelector('.shareholderType').value;
        
        // 只收集填写了名称的股东
        if (name) {
            shareholders.push({
                type: type || 'individual',
                name: name,
                nationality: item.querySelector('[name="shareholderNationality[]"]').value.trim(),
                percentage: item.querySelector('[name="shareholderPercentage[]"]').value,
                address: item.querySelector('[name="shareholderAddress[]"]').value.trim()
            });
        }
    });
    return shareholders;
}

// 收集董事信息（可选）
function collectDirectors() {
    const directors = [];
    document.querySelectorAll('.director-item').forEach(item => {
        const name = item.querySelector('[name="directorName[]"]').value.trim();
        
        // 只收集填写了名称的董事
        if (name) {
            directors.push({
                name: name,
                nationality: item.querySelector('[name="directorNationality[]"]').value.trim(),
                address: item.querySelector('[name="directorAddress[]"]').value.trim(),
                email: item.querySelector('[name="directorEmail[]"]').value.trim()
            });
        }
    });
    return directors;
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

// 显示供应商列表
function showSuppliers() {
    const suppliers = matchSuppliers(formData.jurisdiction);
    const container = document.querySelector('.suppliers-container');
    
    const jurisdictionInfo = JURISDICTIONS[formData.jurisdiction];
    
    let html = `
        <div class="suppliers-header">
            <h2>🏆 推荐供应商 - ${jurisdictionInfo.flag} ${jurisdictionInfo.name}</h2>
            <p>已为您匹配 <strong>${suppliers.length}</strong> 家专业服务商</p>
        </div>
    `;
    
    suppliers.forEach((supplier, index) => {
        const isRecommended = index === 0;
        html += `
            <div class="supplier-card ${isRecommended ? 'recommended' : ''}">
                ${isRecommended ? '<div class="recommended-badge">⭐ 推荐首选</div>' : ''}
                <div class="supplier-header">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-rating">
                        ${'★'.repeat(Math.floor(supplier.rating))}${'☆'.repeat(5-Math.floor(supplier.rating))}
                        <span>${supplier.rating}</span>
                    </div>
                </div>
                <div class="supplier-info">
                    <div class="info-item">
                        <span class="label">从业经验</span>
                        <span class="value">${supplier.experience} 年</span>
                    </div>
                    <div class="info-item">
                        <span class="label">完成案例</span>
                        <span class="value">${supplier.completedCases.toLocaleString()} 家</span>
                    </div>
                    <div class="info-item">
                        <span class="label">服务费</span>
                        <span class="value price">${formatPrice(supplier.price.service)}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">政府费用</span>
                        <span class="value">${formatPrice(supplier.price.government)}</span>
                    </div>
                    <div class="info-item total">
                        <span class="label">总费用</span>
                        <span class="value price-total">${formatPrice(supplier.price.total)}</span>
                    </div>
                </div>
                <div class="supplier-advantages">
                    <h4>服务优势：</h4>
                    <div class="tags">
                        ${supplier.advantages.map(adv => `<span class="tag">${adv}</span>`).join('')}
                    </div>
                </div>
                <div class="supplier-certifications">
                    <strong>资质认证：</strong>
                    ${supplier.certifications.map(cert => `<span class="cert">${cert}</span>`).join(' | ')}
                </div>
                <div class="supplier-contact">
                    <span>📞 ${supplier.contact.phone}</span>
                    <span>📧 ${supplier.contact.email}</span>
                </div>
                <button class="btn-select" onclick="selectSupplier('${supplier.id}')">
                    查看详细流程
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

// 显示流程时间线
function showTimeline() {
    const timeline = generateTimeline(
        formData.jurisdiction,
        selectedSupplier,
        { 
            toCountry: formData.deliveryCountry, 
            subRegion: formData.subRegion 
        }
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
            <h2>📅 设立流程时间线 - ${jurisdictionDisplay}</h2>
            <div class="timeline-summary">
                <div class="summary-item">
                    <span class="label">总工作日</span>
                    <span class="value">${timeline.totalWorkingDays} 天</span>
                </div>
                <div class="summary-item">
                    <span class="label">预计自然日</span>
                    <span class="value">${timeline.totalCalendarDays} 天</span>
                </div>
                <div class="summary-item">
                    <span class="label">预计完成日期</span>
                    <span class="value">${calculateCompletionDate(timeline.totalWorkingDays, formData.jurisdiction).toLocaleDateString('zh-CN')}</span>
                </div>
            </div>
        </div>
        
        <div class="timeline-steps">
            ${timeline.steps.map((step, index) => `
                <div class="timeline-step">
                    <div class="step-marker">
                        <div class="step-number">${step.step}</div>
                        <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                        <div class="step-header">
                            <h3>${step.name}</h3>
                            <span class="step-duration">${step.actualDuration} 工作日</span>
                        </div>
                        <p class="step-description">${step.description}</p>
                        
                        ${step.documents && step.documents.length > 0 ? `
                            <div class="step-documents">
                                <strong>📄 所需文件：</strong>
                                <ul>
                                    ${step.documents.map(doc => `<li>${doc}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${step.requirements && step.requirements.length > 0 ? `
                            <div class="step-requirements">
                                <strong>✅ 要求：</strong>
                                <ul>
                                    ${step.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${step.risks && step.risks.length > 0 ? `
                            <div class="step-risks">
                                <strong>⚠️ 风险提示：</strong>
                                <ul>
                                    ${step.risks.map(risk => `<li>${risk}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${step.deliverables && step.deliverables.length > 0 ? `
                            <div class="step-deliverables">
                                <strong>📦 交付物：</strong>
                                ${step.deliverables.map(del => `<span class="deliverable">${del}</span>`).join(' ')}
                            </div>
                        ` : ''}
                        
                        ${step.fromCountry ? `
                            <div class="express-info">
                                <strong>🚚 快递信息：</strong>
                                <span>从 ${step.fromCountry} 寄往 ${formData.deliveryCountry}</span>
                                <span class="express-duration">预计 ${step.actualDuration} 工作日</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="risk-alerts">
            <h3>⚠️ 重要提示</h3>
            ${timeline.risks.map(risk => `
                <div class="alert alert-${risk.level}">
                    <strong>${risk.title}</strong>
                    <p>${risk.content}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="documents-checklist">
            <h3>📋 文件准备清单</h3>
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
                            <th>文件名称</th>
                            <th>说明</th>
                            <th>是否必须</th>
                            <th>公证认证</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categoryData.documents.map(doc => `
                            <tr>
                                <td>${doc.name}</td>
                                <td>${doc.description}</td>
                                <td>${doc.required ? '<span class="required">必须</span>' : '<span class="optional">可选</span>'}</td>
                                <td>${doc.certify ? '需要' : '不需要'}</td>
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
                <h4>股东 #${index + 1}</h4>
                <button type="button" class="btn-remove" onclick="removeShareholder(this)">删除</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>股东类型</label>
                    <select name="shareholderType[]" class="shareholderType">
                        <option value="individual">个人</option>
                        <option value="corporate">公司</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>姓名/公司名</label>
                    <input type="text" name="shareholderName[]" placeholder="Full Name / Company Name">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>国籍/注册地</label>
                    <input type="text" name="shareholderNationality[]" placeholder="China">
                </div>
                <div class="form-group">
                    <label>持股比例 (%)</label>
                    <input type="number" name="shareholderPercentage[]" min="0" max="100" step="0.01">
                </div>
            </div>
            <div class="form-group">
                <label>地址</label>
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
                <h4>董事 #${index + 1}</h4>
                <button type="button" class="btn-remove" onclick="removeDirector(this)">删除</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>姓名</label>
                    <input type="text" name="directorName[]" placeholder="Full Name">
                </div>
                <div class="form-group">
                    <label>国籍</label>
                    <input type="text" name="directorNationality[]" placeholder="China">
                </div>
            </div>
            <div class="form-group">
                <label>地址</label>
                <input type="text" name="directorAddress[]" placeholder="Complete Address">
            </div>
            <div class="form-group">
                <label>联系方式</label>
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
