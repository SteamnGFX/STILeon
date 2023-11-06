$(window).on("load", function () {
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
        document.getElementById('body').classList.remove("hidden");
    }, 500);
});

