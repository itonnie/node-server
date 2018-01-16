$(document).ready(function() {
    $("#logoutbtn").click(function() {
        $.get('/auth/logout');
        window.localStorage.removeItem("username");
        window.location.assign("/auth/login");
    });
});