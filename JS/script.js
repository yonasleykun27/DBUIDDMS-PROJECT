const users = {
    student: {
        student1: { password: "student1", redirect: "dashboard.html" },
        student2: { password: "student2", redirect: "dashboard.html" },
        student3: { password: "student3", redirect: "dashboard.html" },
        student4: { password: "student4", redirect: "dashboard.html" },
        student5: { password: "student5", redirect: "dashboard.html" },
        student6: { password: "student6", redirect: "dashboard.html" },
        student7: { password: "student7", redirect: "dashboard.html" },
        student8: { password: "student8", redirect: "dashboard.html" },
        student9: { password: "student9", redirect: "dashboard.html" },

    },
    visitor: { visitor: { password: "12345", redirect: "map.html" } },
    staff: { staff: { password: "12345", redirect: "input_results.html" } },
    admin: { admin: { password: "12345", redirect: "manage_system.html" } }
};

function login() {
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const roleUsers = users[role];

    if (!roleUsers || !roleUsers[username]) {
        alert("Invalid username. Please try again or sign up.");
    } else if (roleUsers[username].password === password) {
        localStorage.setItem('userRole', role); // Store the user's role
        window.location.href = roleUsers[username].redirect;
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function signup() {
    const role = document.getElementById("signupRole").value;
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (role !== "student" && role !== "visitor") {
        alert("Only students and visitors can sign up.");
        return;
    }

    // Validation checks
    if (password.length < 5) {
        alert("Password must be at least 5 characters long.");
        return;
    }

    if (role === "student" && !username.startsWith("student")) {
        alert("Student usernames must start with 'student' followed by numbers.");
        return;
    }

    if (users[role] && users[role][username]) {
        alert("Username already exists. Please choose a different username or login.");
    } else {
        if (!users[role]) {
            users[role] = {};
        }
        users[role][username] = { password, redirect: getRedirect(role) };
        alert("Signup successful! You can now login.");
        showLoginForm();
    }
}

function getRedirect(role) {
    switch (role) {
        case "student": return "dashboard.html";
        case "visitor": return "map.html";
        case "staff": return "input_results.html";
        case "admin": return "manage_system.html";
        default: return "index.html";
    }
}

function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("password-eye");

    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
    passwordInput.type = eyeIcon.classList.contains("fa-eye") ? "password" : "text";
}

function togglePasswordVisibilitySignup() {
    const passwordInput = document.getElementById("signupPassword");
    const eyeIcon = document.getElementById("password-eye-signup");

    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
    passwordInput.type = eyeIcon.classList.contains("fa-eye") ? "password" : "text";
}