var main = function(){

    var username = document.getElementById("username")
    // var userdatabase = $.getJSON('/users', users => { userdatabase = users; console.log(userdatabase) })


    var password = document.getElementById("password"), confirmPassword = document.getElementById("confirmPassword");

    function validatePassword() {
        if (password.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords Don't Match");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;

    $('#signup-form').submit(function (e) {
        window.alert("Successfully signed up!\n you should now be able to log in :)");
    });
}

$(document).ready(main);



