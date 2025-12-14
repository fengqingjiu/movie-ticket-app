// 模拟用户数据库，从浏览器的本地存储中获取用户数据，如果没有数据就使用空数组
let users = JSON.parse(localStorage.getItem('users') || '[]');

// 用户注册函数
function register(email, password, pwd2) {
    // 验证输入是否完整：要满足邮箱、密码和确认密码都不能为空才能继续执行
    if (!email || !password || !pwd2) {
        showModal('输入错误', '请填写所有字段', 'error');
        return;
    }

    if (password !== pwd2) {
        showModal('输入错误', '两次输入的密码不一致', 'error');
        return;
    }

    // 检查密码长度不少于8位且密码必须含有字母数字
    if (password.length < 8) {
        showModal('密码太短', '密码长度至少8位', 'error');
        return;
    }

    if (!validpwd(password)) {
        showModal('密码不符合要求', '密码必须包含字母和数字', 'error');
        return;
    }


    // 检查邮箱是否已被注册
    if (users.find(user => user.email === email)) {
        showModal('注册失败', '该邮箱已被注册', 'error');
        return;
    }

    // 注册成功后把新用户信息添加到用户数组中
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showModal('注册成功', '注册成功！即将跳转到登录页面', 'success', () => {
        window.location.href = 'login.html';
    });
}


// 用户登录函数
function login(email, password) {
    // 验证输入是否完整：要满足邮箱和密码都不能为空才能继续执行
    if (!email || !password) {
        showModal('输入错误', '请填写邮箱和密码', 'error');
        return;
    }

    // 在用户数组中查找用户是否存在，并匹配密码
    const user = users.find(user => user.email === email);
    
    if (!user) {
        showModal('登录失败', '邮箱未注册，请先注册账号', 'error');
        return;
    }

    if (user.password !== password) {
        showModal('登录失败', '密码错误，请重新输入', 'error');
        return;
    }

    // 用户登录成功
    localStorage.setItem('login', 'true');
    localStorage.setItem('email', email);
    
    // 弹出成功提示，并在3s后跳转页面
    showModal('登录成功', '登录成功！即将跳转到首页', 'success', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl') || 'index.html';
        window.location.href = returnUrl;
    });
}