var emailError = document.getElementById('error'); 
var pwdError = document.getElementById('error');
var submitError = document.getElementById('error');

    function validateEmail() {
        var email = document.getElementById('email').value;
        if (email.trim() === "") {
            emailError.innerHTML = "Email is required";
            setTimeout(function(){ emailError.innerHTML = ''; }, 3000);
            return false;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.innerHTML = 'Invalid format';
            setTimeout(function(){ emailError.innerHTML = ''; }, 3000);
            return false;
        }

        emailError.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
    }

    function validatepwd() {
        var password = document.getElementById('pass').value;
        if (password.trim() === "") {
            pwdError.innerHTML = "can't be empty";
            setTimeout(function(){ pwdError.innerHTML = ''; }, 3000);
            return false;
        }
        pwdError.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
    }

    // Validating the submission
    function validateAndSubmit() {
        if (!validateEmail() || !validatepwd()) {
            submitError.innerHTML = "<i class='bx bx-error-alt' id='danger'></i>";
            setTimeout(function(){ submitError.innerHTML = ''; }, 3000);
            return false; // Prevent form submission
        }
        
        var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        var email = document.getElementById('email').value;
        var password = document.getElementById('pass').value;

        var foundUser = storedUsers.find(function(user) {
            return user.email === email && user.password === password;
        });

        if (foundUser) {
            localStorage.setItem('currentUserEmail', email);
            // If user is found, proceed to login
            handleLogin();
        } else {
            // If user is not found, show error message
            submitError.innerHTML = "Invalid email or password";
            setTimeout(function(){ submitError.innerHTML = ''; }, 3000);
        }
    }

    // Function to handle the login process
    function handleLogin() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('pass').value;
        if (email === 'rwpatrick@admin.com' && password === 'Admin@123') {
            window.location.href = "dashboard.html";
            localStorage.setItem('adminIsLoggedIn', true);
        } else {
            // Redirect to userdashboard.html for general users
            window.location.href = "index.html";
            localStorage.setItem('userIsLoggedIn', true);
        }
    }

    window.onload = function() {
        var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
        var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

        if (userIsLoggedIn) {
            window.location.href = "/dashboard/user-dashboard.html";
        } else if (adminIsLoggedIn) {
            window.location.href = "/dashboard/dashboard.html";
        }
    }