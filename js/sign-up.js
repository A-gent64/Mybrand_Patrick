

 var nameError=document.getElementById('error');
 var emailError = document.getElementById('error'); 
 var pwdError = document.getElementById('error');
 var pwd2Error = document.getElementById('error');
 var submitError = document.getElementById('error');
 function validateEmail() {
     var email = document.getElementById('email').value;
     if (email.trim() === "") {
         emailError.innerHTML = "Email is required";
         setTimeout(function(){ emailError.innerHTML = ''; }, 3000);
         return false;
     }

     if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
         emailError.innerHTML = 'Invalid email format';
         setTimeout(function(){ emailError.innerHTML = ''; }, 3000);
         return false;
     }

     emailError.innerHTML = "<i class='bx bxs-check-circle'></i>";
     return true;
 }

 function validatepwd() {
     var password = document.getElementById('pass1').value;
     if (password.trim() === "") {
         pwdError.innerHTML = "Password can't be empty";
         setTimeout(function(){ pwdError.innerHTML = ''; }, 3000);
         return false;
     }
     if(password.trim().length < 8){ 
         pwdError.innerHTML="password must be at least 8 characters"; 
         setTimeout(function(){ pwdError.innerHTML = ''; }, 3000);
         return false;
     }
     pwdError.innerHTML = "<i class='bx bxs-check-circle'></i>";
     return true;
 }
 function validate2pwd(){
     var password1=document.getElementById('pass').value;
     var password2=document.getElementById('pass1').value;
     if(password1 !== password2){ 
         pwd2Error.innerHTML="Passwords must be the same";
         setTimeout(function(){ pwd2Error.innerHTML = ''; }, 3000);
         return false;
     }
     pwd2Error.innerHTML="<i class='bx bxs-check-circle'></i>";
     return true;
 }

 function validateAndSubmit(event) {
if (!validateEmail() || !validatepwd() || !validate2pwd()) {
 submitError.innerHTML = "<i class='bx bx-error-alt' id='danger'></i>";
 setTimeout(function(){ submitError.innerHTML = ''; }, 4000); 
 return false;
}


var email = document.getElementById('email').value;
var password = document.getElementById('pass').value;

var users = JSON.parse(localStorage.getItem('users')) || [];

var existingUser = users.find(function(user) {
 return user.email === email;
});

if (existingUser) {
 meme.innerHTML='User already exists with this email.';
 return false; 
}

users.push({ email: email, password: password });

localStorage.setItem('users', JSON.stringify(users));

document.getElementById('email').value = '';
document.getElementById('pass').value = '';

meme.innerHTML='User registered successfully.';
return true; 
}
window.onload = function() {
var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

if (userIsLoggedIn) {
 window.location.href = "login.html";
} else if (adminIsLoggedIn) {
 window.location.href = "login.html";
}}
