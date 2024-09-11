const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const rememberMeCheckbox = document.getElementById('rememberMe');
//Switching to Registration Listener
switchToRegister.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});
//Switching to Login Listener
switchToLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});
//Adding Event Listener for Remembering the User
document.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
});

document.getElementById('loginSubmit').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const error = document.getElementById('loginError');

    error.classList.add('hidden');
//Validating The Email
    if (!validateEmail(email)) {
        showError('Please enter a valid email.', error);
        return;
    }
//Checking the lenghth of the Password
    if (password.length < 6) {
        showError('Password must be at least 6 characters long.', error);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful');
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        } else {
            showError(result.message, error);
        }
    } catch (err) {
        showError('An error occurred during login.', error);
    }
});
//Submitting The Registrartion
document.getElementById('registerSubmit').addEventListener('click', async () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const error = document.getElementById('registerError');

    error.classList.add('hidden');

    if (!validateEmail(email)) {
        showError('Please enter a valid email.', error);
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long.', error);
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match.', error);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful');
            registerForm.reset();
        } else {
            showError(result.message, error);
        }
    } catch (err) {
        showError('An error occurred during registration.', error);
    }
});
//Validating the Email ID
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message, errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}
