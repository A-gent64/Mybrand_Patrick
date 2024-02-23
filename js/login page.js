document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;  
    const password = document.getElementById("pass").value; 
    const errorDiv = document.getElementById("error");

    if (email === "" || !email.includes('@')) { 
        errorDiv.innerHTML = "Please enter a valid e-mail address."; 
        return false; 
    } 

    if (password === "") { 
        errorDiv.innerHTML = "Please enter your password"; 
        return false; 
    } 

    if (password.length < 8) { 
        errorDiv.innerHTML = "Password should be at least 8 characters long"; 
        return false; 
    } 

    // Clear error message if there are no errors
    errorDiv.innerHTML = "";

    // Process login here (not implemented in this example)
});
