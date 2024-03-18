var submitError = document.getElementById('error');

function validateEmail() {
    var email = document.getElementById('email').value;
    if (email.trim() === "") {
        submitError.innerHTML = "Email is required";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        submitError.innerHTML = 'Invalid email format';
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }

    submitError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    return true;
}

function validatepwd() {
    var password = document.getElementById('pass').value;
    if (password.trim() === "") {
        submitError.innerHTML = "Password is required";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }
    submitError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    return true;
}

function validate2pwd() {
    var password1 = document.getElementById('pass').value;
    var password2 = document.getElementById('pass1').value;
    if (password1 !== password2) {
        submitError.innerHTML = "Passwords must be the same";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }
    submitError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    return true;
}

function validateAndSubmit() {
    if (!validateEmail() || !validatepwd()) {
        submitError.innerHTML = "<i class='bx bx-error-alt' id='danger'></i>";
        setTimeout(function () { submitError.innerHTML = ''; }, 3000);
        return false;
    }

    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    fetch('https://mybrand-shebelle-api.onrender.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful registration response from the server
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('name').value='';
        submitError.innerHTML = "<div class='success-message'><i class='bx bxs-check-circle' id='success'></i> User registered successfully.</div>";
        setTimeout(function () { submitError.innerHTML = ''; }, 4000);
    })
    .then(data => {
        var role = data.role;
        var token = data.token;
        var email = data.email;

        localStorage.setItem('token', token)
        localStorage.setItem('currentUserEmail', email);

        if (role === 'admin') {
            localStorage.setItem('adminIsLoggedIn', true);
            window.location.href = "dashboard.html";
        } else {
            localStorage.setItem('userIsLoggedIn', true);
            window.location.href = "login.html";
        }
    }).catch(error => {
        submitError.innerHTML = "<div class='error-message'><i class='bx bx-error-alt' id='danger'></i> " + error.message + "</div>";
        setTimeout(function () { submitError.innerHTML = ''; }, 4000);
    
}
