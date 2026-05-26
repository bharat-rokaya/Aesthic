const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeatPassword');
const registerButton = document.getElementById('signupButton');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const repeatPasswordError = document.getElementById('repeatPasswordError');

registerButton.addEventListener('click', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();

  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  repeatPasswordError.textContent = '';
  registerButton.textContent = 'Processing...';

  setTimeout(() => {
    let isValid = true;

    if(!username) {
      usernameError.textContent = 'Username is required';
      isValid = false;
    } else if(username.length < 3) {
      usernameError.textContent = 'Username must be at least 3 characters';
      isValid = false;
    } else if(username.length > 20) {
      usernameError.textContent = 'Username must be less than 20 characters';
      isValid = false;
    } else if(!/^[a-zA-Z0-9_]+$/.test(username)) {
      usernameError.textContent = 'Username can only contain letters, numbers, and underscores';
      isValid = false;
    } else if(!email) {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = 'Email is not valid';
      isValid = false;
    } else if(!password) {
      passwordError.textContent = 'Password is required';
      isValid = false;
    } else if(password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      isValid = false;
    } else if(password.length > 20) {
      passwordError.textContent = 'Password must be less than 20 characters';
      isValid = false;
    } else if(!/[A-Z]/.test(password)) {
      passwordError.textContent = 'Password must contain at least one uppercase letter';  
      isValid = false;
    } else if(!/[a-z]/.test(password)) {
      passwordError.textContent = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if(!/[0-9]/.test(password)) {
      passwordError.textContent = 'Password must contain at least one number';
      isValid = false;
    } else if(!/[!@#$%^&*]/.test(password)) {
      passwordError.textContent = 'Password must contain at least one special character (!@#$%^&*)';
      isValid = false;
    } else if(!repeatPassword) {
      repeatPasswordError.textContent = 'Please repeat your password';
      isValid = false;  
    } else if(password !== repeatPassword) {
      repeatPasswordError.textContent = 'Passwords do not match';
      isValid = false;
    }

    registerButton.textContent = 'Sign Up';


    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.username === username);

    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = { username, password, email };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Registration successful!")
    window.location.href = 'login.html';

  },1000);
});