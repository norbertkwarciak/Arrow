$('document').ready(function () {

    // close/open ham icon 

    var Closed = false;

    $('.hamburger').click(function () {
        if (Closed == true) {
            $(this).removeClass('open');
            $(this).addClass('closed');
            Closed = false;
        } else {
            $(this).removeClass('closed');
            $(this).addClass('open');
            Closed = true;
        }
    });

    // scroll smoothly to about-us on button click

    $("#scroll-icon").click(function () {
        $('html,body').animate({
            scrollTop: $("#services").offset().top
        },
            'slow');
    });

    // arrow top

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 100) {        // If page is scrolled more than 100px
            $('#return-to-top').removeClass('hide');    // Fade in the arrow
        } else {
            $('#return-to-top').addClass('hide');   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });
});