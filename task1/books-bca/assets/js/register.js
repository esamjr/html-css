$(document).ready(function () {
    function registerUser() {
        const fname = $("#fullname-input").val();
        const email = $("#email-input").val();
        const password = $("#password-input").val();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find((user) => user.email === email);
        console.log(email, password);
        if (existingUser) {
            console.log("User with this email already exists. Please login.");
            return;
        }
        const newUser = {
            fname,
            email,
            password,
        };
        console.log(newUser);
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = "./login.html";
    }

    $("#register-button").click(registerUser);
});
