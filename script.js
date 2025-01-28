// Mock user data
const users = [
    { username: "spo1", password: "spo123", role: "SPO" },
    { username: "sspo1", password: "sspo123", role: "SSPO" },
    { username: "se1", password: "se123", role: "SE/ASM" },
    { username: "sm1", password: "sm123", role: "SM" },
    { username: "nsm1", password: "nsm123", role: "NSM" },
    { username: "spm1", password: "spm123", role: "SPM" },
    { username: "dmm1", password: "dmm123", role: "DMM" },
    { username: "gm1", password: "gm123", role: "GM" },
    { username: "hod1", password: "hod123", role: "HOD/Director" },
    { username: "gmd1", password: "gmd123", role: "GMD" }
];

// Form submit event listener
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Find user in mock data
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        errorMessage.textContent = ""; // Clear error

        // Save user information to localStorage or sessionStorage
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
