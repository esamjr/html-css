$(document).ready(function () {
    function loginUser() {
        const email = $("#email-input").val();
        const password = $("#password-input").val();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex((u) => u.email === email && u.password === password);

        if (userIndex !== -1) {
            users[userIndex].isLogged = true;
            localStorage.setItem('users', JSON.stringify(users));

            window.location.href = "../index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }

    $("#login-button").click(loginUser);
});

