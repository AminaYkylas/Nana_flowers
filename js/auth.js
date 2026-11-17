function registerUser(userData) {
    localStorage.setItem('nanaUser', JSON.stringify(userData));
    localStorage.setItem('nanaLoggedIn', 'true');
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

function loginUser(email, password) {
    const storedUser = JSON.parse(localStorage.getItem('nanaUser'));
    
    if (!storedUser) {
        return { success: false, message: 'Account not found. PLZ registate.' };
    }
    
    if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('nanaLoggedIn', 'true');
        return { success: true };
    } else {
        return { success: false, message: 'Wrong email or password.' };
    }
}

function logoutUser() {
    localStorage.removeItem('nanaLoggedIn');
    window.location.href = 'login.html';
}

function checkAuth() {
    if (localStorage.getItem('nanaLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(localStorage.getItem('nanaUser'));
}
