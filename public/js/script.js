/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

/*----- event listeners -----*/
// Check for click events on the navbar burger icon
$('.navbar-burger').on('click', classToggle);
$(window).on('resize', fixedNav);
$('.userAvatar').on('click', activateModal);
$('.modal').on('click', closeModal);


/*----- functions -----*/
function closeModal(e) {
    $('.modal').removeClass('is-active');
}

function activateModal(e) {
    $('.modal').addClass('is-active');
}

function classToggle(e) {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
};
// Function to add or remove fixed nav on resize
function fixedNav(e) {
    if($(window).width() <= 768) {
        $('#nav-target').addClass('is-fixed-top');
        $('.hero').css("margin-top","5rem");
    }
    if($(window).width() > 768) {
        $('#nav-target').removeClass('is-fixed-top');
        $('.hero').css("margin-top","0px");
    }
}
// Function to add a fixed nav on load or assign active to the user page
$(function() {
    if($(window).width() <= 768) {
        $('#nav-target').addClass('is-fixed-top');
        $('.hero').css("margin-top","5rem");
    }
    if (document.URL.includes('users')) {
         $('#userPage').addClass('active');
    }
});


//How do I use this here rather than in my partial?
function isVowel(letter) {
    return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(letter.toLowerCase()) !== -1
}