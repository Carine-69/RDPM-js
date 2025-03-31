// Function to register a user
async function registration(event) {
    event.preventDefault(); // Prevent form refresh

    // Collect form inputs
    const first_name = document.getElementsByName("first_name")[0].value.trim();
    const last_name = document.getElementsByName("last_name")[0].value.trim();
    const email = document.getElementsByName("email")[0].value.trim();
    const location = document.getElementsByName("location")[0].value.trim();
    const location1 = document.getElementsByName("location1")[0].value.trim();
    const location2 = document.getElementsByName("location2")[0].value.trim();
    const phonenumber = document.getElementsByName("Phone_Number")[0].value.trim();
    const password = document.getElementsByName("password")[0].value.trim();
    const confirm_password = document.getElementsByName("confirm_password")[0].value.trim();

    // Validation checks
    if (!first_name || !last_name || !email || !location || !location1 || !location2 || !phonenumber || !password || !confirm_password) {
        alert("Please fill all fields.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phonenumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match!");
        return;
    }

    // Get stored users from localStorage (or initialize empty array)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email or phone is already registered
    const existingUser = users.find(user => user.email === email || user.phonenumber === phonenumber);
    if (existingUser) {
        alert("Email or phone number already registered. Use a different one or login.");
        return;
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    // Create a new user object
    const newUser = {
        first_name,
        last_name,
        email,
        location,
        location1,
        location2,
        phonenumber,
        password: hashedPassword
    };

    // Store user in localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html"; // Redirect to login page
}

// Function to login user
async function login(event) {
    event.preventDefault();

    const email = document.getElementsByName("email")[0].value.trim();
    const password = document.getElementsByName("password")[0].value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Retrieve stored users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Hash the entered password
    const hashedPassword = await hashPassword(password);

    // Find the user in localStorage
    const user = users.find(user => user.email === email && user.password === hashedPassword);

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    // Store logged-in user in session storage
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");
    window.location.href = "disasterAlerts.html"; 
}

// Function to hash password 
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Attach event listeners
document.getElementById("registerBtn")?.addEventListener("click", registration);
document.getElementById("loginBtn")?.addEventListener("click", login);
