// Client-side registration simulation
const regForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const formNotice = document.getElementById('formNotice');
const submitBtn = document.getElementById('submitBtn');

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors(){
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
    formNotice.textContent = '';
}

regForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if(!name){
        nameError.textContent = 'Full name is required.';
        valid = false;
    }

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

    if(password !== confirm){
        confirmError.textContent = 'Passwords do not match.';
        valid = false;
    }

    if(!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating...';

    setTimeout(()=>{
        // Simulate success
        formNotice.style.color = 'green';
        formNotice.textContent = 'Account created. Redirecting to sign in...';
        setTimeout(()=>{
            window.location.href = 'index.html';
        }, 900);
    }, 800);
});
