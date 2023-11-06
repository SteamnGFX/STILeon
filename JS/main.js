(function ($) {

    "use strict";

    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="Nombre"]');
    var email = $('.validate-input input[name="Correo"]');
    var subject = $('.validate-input input[name="Tema"]');
    var message = $('.validate-input textarea[name="Mensaje"]');

    $('.validate-form').on('submit',function(){
        var check = true;
        var response = grecaptcha.getResponse();

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;

        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;

        }


        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        if(response.length == 0){
            check=false;
        }
        
        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);

$(window).on("load", function () {
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
        document.getElementById('body').classList.remove("hidden");
    }, 500);
});

submitUserForm();
function submitUserForm() {
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span error="error" style="color:red;">CAPTCHA es requerido</span>';
        return false;
    }
    return true;
}

function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
}

