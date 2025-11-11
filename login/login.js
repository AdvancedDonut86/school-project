// Simple client-side login simulation
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formNotice = document.getElementById('formNotice');
const submitBtn = document.getElementById('submitBtn');

function validateEmail(email){
    // basic RFC-like regex (not perfect but fine for client-side)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors(){
    emailError.textContent = '';
    passwordError.textContent = '';
    formNotice.textContent = '';
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearErrors();
    let valid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if(!email){
        emailError.textContent = 'Email is required.';
        valid = false;
    } else if(!validateEmail(email)){
        emailError.textContent = 'Please enter a valid email.';
        valid = false;
    }

    if(!password){
        passwordError.textContent = 'Password is required.';
        valid = false;
    } else if(password.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
    }

    if(!valid) return;

    // Simulate async auth
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    formNotice.textContent = '';

    setTimeout(()=>{
        // Simple fake check: email contains "user" and password "password" => success
        if(email.toLowerCase().includes('user') && password === 'password'){
            formNotice.style.color = 'green';
            formNotice.textContent = 'Login successful — redirecting...';
            // Redirect to deep-talking.html if exists, otherwise stay
            const target = 'deep-talking.html';
            window.location.href = target;
        } else {
            formNotice.style.color = 'var(--danger)';
            formNotice.textContent = 'Invalid credentials. Try email containing "user" and password "password".';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign in';
        }
    }, 900);
});

// Optional: live validation on blur
emailInput.addEventListener('blur', ()=>{
    const v = emailInput.value.trim();
    emailError.textContent = v && !validateEmail(v) ? 'Invalid email format.' : '';
});
passwordInput.addEventListener('blur', ()=>{
    const v = passwordInput.value;
    passwordError.textContent = v && v.length < 6 ? 'Minimum 6 characters.' : '';
});
