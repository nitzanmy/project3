
document.addEventListener("DOMContentLoaded", function () {

    // Select placeholder elements
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Initialize array to track loading promises
    const loadPromises = [];

    // Load Navbar
    if (navbarPlaceholder) {
        const navPromise = fetch("navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading navbar:", error));


        // Add navbar promise to tracking array
        loadPromises.push(navPromise);
    }

    // Load Footer
    if (footerPlaceholder) {
        const footerPromise = fetch("footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));


        // Add footer promise to tracking array
        loadPromises.push(footerPromise);
    }

    // Final Execution (Wait for ALL components)
    Promise.all(loadPromises).then(() => {


        updateAuthButton();
        if (window.location.hash) {
            // Small delay to ensure rendering completion
            setTimeout(() => {
                const element = document.querySelector(window.location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        document.body.classList.add("page-loaded");
    })
})

/* Update Authentication Button Based on User Status */
function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn) return;


    const pageId = document.body.id;


    // Default state: Visible
    authBtn.style.display = 'inline-block';

    // Login Page - Hide button
    if (pageId === 'page_login') {
        authBtn.style.display = 'none';
        return;
    }

    //Registration Page - Change text to "Login"
    if (pageId === 'page_registration') {
        authBtn.textContent = 'התחברות';
    }

    // Check User Login Status
    const userName = localStorage.getItem('userName');
    const isLoggedIn = localStorage.getItem('isLoggedIn');


    if (userName && isLoggedIn === 'true') {
        // Logged in state: Show user name
        authBtn.style.display = 'inline-block';
        authBtn.textContent = 'שלום, ' + userName;

        // Change styling to outline
        authBtn.classList.remove('btn-brand');
        authBtn.classList.add('btn-outline-brand');
        authBtn.href = "#";

        // Logout logic
        authBtn.onclick = function (event) {
            event.preventDefault();
            if (confirm('האם ברצונך להתנתק?')) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = "login.html";
            }
        };
    }
}