const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
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

    if (isValidate) {
      alert("Login successful!");
      window.location.href = "index.html";
    }
  }, 1000);
});
