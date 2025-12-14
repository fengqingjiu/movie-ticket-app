// 函数实现在页面上显示临时提示消息
function showmsg(message, type = 'info') {
    // 找到页面上显示消息的区域i：message
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        // 设置消息内容
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        
        // 设置3s后自动清除消息
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 3000);
    }
}

// 显示弹窗对话框
function showModal(title, message, type = 'info', callback = null) {
    // 创建弹窗的HTML
    const modalHTML = `
        <div class="modal show">
            <div class="modal-content modal-${type}">
                <div class="modal-icon">
                    <!-- 成功和失败的不同图标 -->
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </div>
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="modal-btn">确定</button>
            </div>
        </div>
    `;
    
    // 把弹窗HTML代码添加到页面的最后面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 绑定弹窗和按钮
    const modal = document.querySelector('.modal:last-child');
    const confirmBtn = modal.querySelector('.modal-btn');
    
    // 点击确定按钮关闭弹窗
    confirmBtn.onclick = function() {
        modal.remove();
        if (callback) callback();
    };
    
    // 点击背景关闭
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
            if (callback) callback();
        }
    };
}

// 实现密码验证函数
// 检验密码是否满足要求：至少8位且包含字母和数字
function validpwd(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber;
}

// 检查用户的登录状态
function isLoggedIn() {
    return localStorage.getItem('login') === 'true';
}

// 实现用户退出登录
function logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    // 跳转到首页
    window.location.href = 'index.html';
}