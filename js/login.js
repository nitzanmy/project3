
// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Retrieve user input values
    const inputEmail = document.getElementById('email').value;
    const inputPassword = document.getElementById('password').value;

    // Retrieve data stored in memory during registration
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    // If no name is stored, use default
    const storedName = localStorage.getItem('userName') || 'משתמש';

    // Validation check
    if (inputEmail === storedEmail && inputPassword === storedPassword) {
        
        // Create "flag" indicating user is currently logged in
        localStorage.setItem('isLoggedIn', 'true');
        
        alert('היי ' + storedName + ', התחברת בהצלחה!');
        
        // Redirect to home page
        window.location.href = "home.html"; 
    } else {
        alert('שגיאה: אימייל או סיסמא לא נכונים (נסה להירשם קודם).');
    }
});
