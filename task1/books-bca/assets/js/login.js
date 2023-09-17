$(document).ready(function () {
    function loginUser() {
        const email = $("#email-input").val();
        const password = $("#password-input").val();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            window.location.href = "../index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }

    $("#login-button").click(loginUser);
});
