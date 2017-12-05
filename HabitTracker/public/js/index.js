var main = function(){

    var username = document.getElementById("username")

    function checkUsernameAvailability() {
        var userdatabase = $.getJSON('/users', users => { userdatabase = users; console.log(userdatabase) })

        for(var i = 0; i < userdatabase.users.length; i++) {
            if (userdatabase.users[i] == username) {
                return false;
            }
        }
        return true;
    }

    function validateUsername() {
        if(!checkUsernameAvailability) {
            username.setCustomValidity("Username already taken");
            console.log('1');
        } else {
            username.setCustomValidity('');
            console.log('1');
        }
    }

    var password = document.getElementById("password"), confirmPassword = document.getElementById("confirmPassword");

    function validatePassword() {
        if (password.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords Don't Match");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    username.onkeyup = checkUsernameAvailability;
    username.onchange = checkUsernameAvailability;
    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;

    $('#signup-form').submit(function (e) {
        window.alert("Successfully signed up!\n you should now be able to log in :)");
    });
}

$(document).ready(main);

