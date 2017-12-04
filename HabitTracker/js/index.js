var main = function(){
    $('#signup-form').submit(function (e) {
        window.alert("Successfully signed up!\n you can now log in :)");
    });
}

$(document).ready(main);