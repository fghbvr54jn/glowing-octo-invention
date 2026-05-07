function createCard() {
    const name = document.getElementById('userName').value;
    const type = document.getElementById('passType').value;
    const trainer = document.getElementById('trainerSelect').value;
    const card = document.getElementById('visualCard');

    if (name.trim().length < 2) {
        alert("Будь ласка, введіть ваше ім'я!");
        return;
    }
    document.getElementById('cardName').innerText = name.toUpperCase();
    let tariffName = "FULL UNLIMITED";
    if (type === 'morning') tariffName = "MORNING PASS";
    if (type === 'weekend') tariffName = "WEEKEND PASS";
    document.getElementById('cardTariff').innerText = tariffName;
    document.getElementById('cardTrainer').innerText = trainer.toUpperCase();
    card.style.display = 'block';
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}
window.onload = function() {
    const savedUser = localStorage.getItem('vigorUser');
    // Якщо ми на головній сторінці і користувач є
    if (savedUser && document.getElementById('userProfile')) {
        showProfile(JSON.parse(savedUser));
    }
};

function toggleAuth(type) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('regForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabReg = document.getElementById('tabReg');

    if (type === 'login') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabLogin.style.color = '#f39c12';
        tabReg.style.color = '#555';
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabLogin.style.color = '#555';
        tabReg.style.color = '#f39c12';
    }
}

function handleRegister() {
    const name = document.getElementById('regName').value;
    const pass = document.getElementById('regPass').value;
    const type = document.getElementById('passType').value;
    const trainer = document.getElementById('trainerSelect').value;

    if (name.length < 2 || pass.length < 3) {
        alert("Заповніть дані!");
        return;
    }

    const newUser = { name, pass, type, trainer };

    let users = JSON.parse(localStorage.getItem('vigorUsersDB')) || [];
    
    // Перевіряємо чи не зайняте ім'я
    if (users.find(u => u.name === name)) {
        alert("Користувач з таким ім'ям вже існує!");
        return;
    }

    users.push(newUser);
    localStorage.setItem('vigorUsersDB', JSON.stringify(users));
    localStorage.setItem('vigorCurrentUser', JSON.stringify(newUser)); // Автоматичний вхід після реєстрації

    alert("Вітаємо у команді!");
    window.location.href = "index.html#cabinet";
}

function handleLogin() {
    const name = document.getElementById('loginName').value;
    const pass = document.getElementById('loginPass').value;

    let users = JSON.parse(localStorage.getItem('vigorUsersDB')) || [];
    
    // Шукаємо користувача в "базі"
    const user = users.find(u => u.name === name && u.pass === pass);

    if (user) {
        localStorage.setItem('vigorCurrentUser', JSON.stringify(user));
        window.location.href = "index.html#cabinet";
    } else {
        alert("Невірне ім'я або пароль!");
    }
}

window.onload = function() {
    const activeUser = localStorage.getItem('vigorCurrentUser');
    if (activeUser && document.getElementById('userProfile')) {
        const user = JSON.parse(activeUser);
        document.getElementById('authBlock').style.display = 'none';
        document.getElementById('userProfile').style.display = 'block';
        
        document.getElementById('userNameDisplay').innerText = user.name;
        document.getElementById('cardName').innerText = user.name.toUpperCase();
        
        let tariffMap = { 'morning': 'MORNING PASS', 'unlimited': 'FULL UNLIMITED', 'weekend': 'WEEKEND PASS' };
        document.getElementById('cardTariff').innerText = tariffMap[user.type] || user.type;
        document.getElementById('cardTrainer').innerText = user.trainer.toUpperCase();
    }
};

function handleLogout() {
    localStorage.removeItem('vigorCurrentUser');
    location.reload();
}


