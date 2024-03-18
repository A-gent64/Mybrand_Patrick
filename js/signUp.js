var emailError = document.getElementById('emailError');
var pwdError = document.getElementById('pwdError');
var submitError = document.getElementById('submitError');

function validateEmail() {
    var email = document.getElementById('email').value;
    if (email.trim() === "") {
        emailError.innerHTML = "Email is required";
        setTimeout(function () { emailError.innerHTML = ''; }, 3000);
        return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.innerHTML = 'Invalid email format';
        setTimeout(function () { emailError.innerHTML = ''; }, 3000);
        return false;
    }

    emailError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    return true;
}

function validatePassword() {
    var password = document.getElementById('password').value;
    if (password.trim() === "") {
        pwdError.innerHTML = "Password is required";
        setTimeout(function () { pwdError.innerHTML = ''; }, 3000);
        return false;
    }
    pwdError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    return true;
}

function validateAndSubmit() {
    if (!validateEmail() || !validatePassword()) {
        submitError.innerHTML = "<i class='bx bx-error-alt' id='danger'></i>";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.json();
    })
    .then(data => {
        var role = data.role;
        var token = data.token;
        var email = data.email;

        localStorage.setItem('token', token);
        localStorage.setItem('currentUserEmail', email);

        if (role === 'admin') {
            localStorage.setItem('adminIsLoggedIn', true);
            window.location.href = "dashboard.html";
        } else {
            localStorage.setItem('userIsLoggedIn', true);
            window.location.href = "userdashboard.html";
        }
    })
    .catch(error => {
        submitError.innerHTML = "Invalid email or password";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
    });
}

window.onload = function () {
    var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
    var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

    if (userIsLoggedIn) {
        window.location.href = "userdashboard.html";
    } else if (adminIsLoggedIn) {
        window.location.href = "dashboard.html";
    }
};
