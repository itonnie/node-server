$(document).ready(function() {
    
    //Listen to Tab Clicks
    $('.tab').on("click", function() {
        $('.tab').removeClass("active-tab");
        $(this).addClass("active-tab");

        var panelname = $(this).attr("data-tab");
        var id = '#' + panelname;

        $(".panel").removeClass("active-panel");
        $(id).addClass("active-panel");
    });

    $("#loginForm").submit(function(e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var url = $(this).attr("action");

        $.post(url, { username: username, password: password }).done(function(data) {
            if(data.ok == true) {
                window.localStorage.setItem("username", data.data.username);
                window.location.assign("/");
            } else if(data.ok == false) {
                alert(data.message);
            }  
        });
    });

    $("#signinForm").submit(function(e) {
        e.preventDefault();

        var username = $('#susername').val();
        var password = $('#spassword').val();
        var url = $(this).attr("action");

        $.post(url, { username: username, password: password }).done(function(data) {
            console.log(data);
            if(data.ok == true) {
                window.localStorage.setItem("username", data.data.username);
                window.location.assign("/");
            } else if(data.ok == false) {
                alert(data.message);
            }
        });
    });
})