// User registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        game: document.getElementById('game').value
    };
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (formData.password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }
    
    try {
        // In a real app, you would send this to your backend API
        // const response = await fetch('/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // For demo, we'll simulate a successful registration
        localStorage.setItem('prismatch_user', JSON.stringify({
            username: formData.username,
            email: formData.email,
            game: formData.game
        }));
        
        alert('Registration successful! Redirecting to your profile...');
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
});

// User login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        remember: document.getElementById('remember').checked
    };
    
    try {
        // In a real app, you would send this to your backend API
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // For demo, we'll simulate a successful login
        localStorage.setItem('prismatch_user', JSON.stringify({
            username: 'DemoUser',
            email: formData.email,
            game: 'BGMI'
        }));
        
        alert('Login successful! Redirecting...');
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
});

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('prismatch_user');
    if (!user && (window.location.pathname.includes('profile.html') || 
                 window.location.pathname.includes('dashboard.html'))) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('prismatch_user');
    window.location.href = 'index.html';
}

// Initialize auth check
document.addEventListener('DOMContentLoaded', checkAuth);