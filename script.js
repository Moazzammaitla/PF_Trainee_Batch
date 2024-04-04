class Authentication {
  constructor() {
    this.container = document.querySelector(".container");
    this.signUpLink = document.querySelector(".signup-link");
    this.loginLink = document.querySelector(".login-link");
    this.signUpForm = document.getElementById("signupForm");
    this.loginForm = document.getElementById("loginForm");

    this.signUpLink.addEventListener("click", this.activateSignUp.bind(this));
    this.loginLink.addEventListener("click", this.activateLogin.bind(this));
    this.signUpForm.addEventListener("submit", this.handleSignUp.bind(this));
    this.loginForm.addEventListener("submit", this.handleLogin.bind(this));
  }

  activateSignUp() {
    this.container.classList.add("active");
  }

  activateLogin() {
    this.container.classList.remove("active");
  }

  handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem(email, JSON.stringify(userData));
    alert("Signup successful!");
  }

  handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUserData = localStorage.getItem(email);

    if (!storedUserData) {
      alert("Email not registered!");
      return;
    }

    const userData = JSON.parse(storedUserData);

    if (userData.password !== password) {
      alert("Incorrect password!");
      return;
    }

    window.location.href = "table.html";
  }
}

const auth = new Authentication();
