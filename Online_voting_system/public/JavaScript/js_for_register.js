$(document).ready(() => {
    var emailval, idval, passval, authval = false;
    $("#regemail").on("input", () => {
        $("#emailerr").show();
        var value = $('#regemail').val().length;
        if (value === 6) {
            $("#emailerr").hide();
            $("#submiterr").hide();
            emailval = true;
        }
    });
    $("#idtextbox").on("input", () => {
        $("#emailerr2").show();
        var value = $('#idtextbox').val();
        if ((value.length === 9) && ($.isNumeric(value))) {
            $("#emailerr2").hide();
            $("#submiterr").hide();
            idval = true;
        }
    });
    $("#authbox").on("input", () => {
        $("#emailerr4").show();
        var value = $('#authbox').val();
        if (value.length === 14) {
            $("#emailerr4").hide();
            $("#submiterr").hide();
            authval = true;
        }
    });
    $("#InputconfirmPassword").on("input", () => {
        passval = false;
        $("#emailerr3").show();
        var value1 = $('#InputPassword').val();
        var value2 = $('#InputconfirmPassword').val();
        if ((value1 === value2) && (value2 != 0 )){
            $("#emailerr3").hide();
            $("#submiterr").hide();
            passval = true;
        }
    });
    $("#InputPassword").on("input", () => {
        passval = false;
        $("#emailerr3").show();
        var value1 = $('#InputPassword').val();
        var value2 = $('#InputconfirmPassword').val();
        if ((value1 === value2) && (value1 != 0 )){
            $("#emailerr3").hide();
            $("#submiterr").hide();
            passval = true;
        }
    });

    $("#Regbutt").on("click", (event) => {
        event.preventDefault();
        if ((emailval === true) && (idval === true) && (passval === true) && (authval === true)) {
            $("#regform").submit();
        }
        else{
            $("#submiterr").show();
        }
    });

});

