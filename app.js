// 主应用逻辑

let currentStep = 1;
let formData = {};
let selectedSupplier = null;

// 页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
});

// 初始化表单
function initializeForm() {
    const jurisdiction = document.getElementById('jurisdiction');
    
    // 监听注册地变化
    jurisdiction.addEventListener('change', function() {
        const stateGroup = document.getElementById('stateGroup');
        if (this.value === 'US') {
            stateGroup.style.display = 'block';
        } else {
            stateGroup.style.display = 'none';
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
        state: document.getElementById('state').value,
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

// 收集股东信息
function collectShareholders() {
    const shareholders = [];
    document.querySelectorAll('.shareholder-item').forEach(item => {
        const index = item.dataset.index;
        shareholders.push({
            type: item.querySelector('.shareholderType').value,
            name: item.querySelector('[name="shareholderName[]"]').value,
            nationality: item.querySelector('[name="shareholderNationality[]"]').value,
            percentage: item.querySelector('[name="shareholderPercentage[]"]').value,
            address: item.querySelector('[name="shareholderAddress[]"]').value
        });
    });
    return shareholders;
}

// 收集董事信息
function collectDirectors() {
    const directors = [];
    document.querySelectorAll('.director-item').forEach(item => {
        directors.push({
            name: item.querySelector('[name="directorName[]"]').value,
            nationality: item.querySelector('[name="directorNationality[]"]').value,
            address: item.querySelector('[name="directorAddress[]"]').value,
            email: item.querySelector('[name="directorEmail[]"]').value
        });
    });
    return directors;
}

// 收集服务
function collectServices() {
    const services = [];
    document.querySelectorAll('[name="services[]"]:checked').forEach(cb => {
        services.push(cb.value);
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
        { toCountry: formData.deliveryCountry, state: formData.state }
    );
    
    const container = document.querySelector('.timeline-container');
    
    let html = `
        <div class="timeline-header">
            <h2>📅 设立流程时间线 - ${timeline.jurisdiction.flag} ${timeline.jurisdiction.name}</h2>
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
