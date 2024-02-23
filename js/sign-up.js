let meme = document.getElementById('error');

function valid() { 
    // Removed redundant meme assignment
    // let meme = document.getElementById('error');

    const email = 
        document.getElementById("email").value;  
    const password = 
        document.getElementById("pass1").value; 
    const password1 = 
        document.getElementById("pass").value; 
    console.log(password); 

    if (email === "" || !email.includes('@')) { 
        // Changed innerHTML assignment
        meme.innerHTML = 'Please enter a valid e-mail address.';
        return false; 
    } 

    if (password === "" || password1==="") { 
        // Changed innerHTML assignment
        meme.innerHTML = "Please enter your password";
        // Removed password.focus(), focus is not available for a string
        // password.focus(); 
        return false; 
    } 

    if (password.length < 8) { 
        // Changed innerHTML assignment
        meme.innerHTML = "Password should be at least 8 characters long"; 
        // Removed password.focus(), focus is not available for a string
        // password.focus(); 
        return false; 
    } 
    if (password !== password1) { 
        // Changed innerHTML assignment
        meme.innerHTML = "You re-entered a wrong password";
        
        return false; 
    }
    return true; 
}
