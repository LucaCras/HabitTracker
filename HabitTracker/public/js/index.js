var main = function(){
    $('#signup-form').submit(function (e) {
        window.alert("Successfully signed up!\n you can now log in :)");
    });
    // $('#login-form').submit(function (e) {
    //     e.preventDefault();
    //     window.location.href = "dashboard.html";
    // });
}

$(document).ready(main);