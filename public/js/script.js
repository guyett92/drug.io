// Check for click events on the navbar burger icon
$(".navbar-burger").on('click', classToggle);

function classToggle(e) {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
};