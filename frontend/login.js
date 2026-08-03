const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginButton = document.getElementById("login");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  emailError.textContent = "";
  passwordError.textContent = "";
  loginButton.textContent = "Processing...";

  setTimeout(() => {
    let isValidate = true;

    if (!email) {
      emailError.textContent = "Email is required";
      isValidate = false;
    } else if (!password) {
      passwordError.textContent = "Password is required";
      isValidate = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      isValidate = false;
    }

    loginButton.textContent = "Login";

    if (!isValidate) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email);

    if (!user) {
      emailError.textContent = "Email not found";
      return;
    }

    if (user.password !== password) {
      passwordError.textContent = "Password doesn't match";
      return;
    }

    localStorage.setItem("loggedInUser", user.username);
    alert("Login successful!");
    window.location.href = "index.html";

  }, 1000);
});