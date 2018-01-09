$('document').ready(function () {

    // fold out menu

    var hamburgerIcon = $('.hamburger');
    var menuList = $('header nav ul');

    hamburgerIcon.click(function () {
        $(this).toggleClass('active');

        menuList.slideToggle();
        setTimeout(function () {
            menuList.addClass('column-menu');
        }, 0);
    });

    function mobileViewUpdate() {
        var viewportWidth = $(window).width();
        if (viewportWidth > 768) {
            hamburgerIcon.removeClass('active');
            menuList.removeClass('column-menu').css('display', 'block');
        } else {
            menuList.css('display', 'none');
        }
    }

    $(window).load(mobileViewUpdate);
    $(window).resize(mobileViewUpdate);

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

    // scroll smoothly between sections

    $('nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 1000, 'swing');
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