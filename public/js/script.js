/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

/*----- event listeners -----*/
// Check for click events on the navbar burger icon
$('.navbar-burger').on('click', classToggle);

/*----- functions -----*/
function classToggle(e) {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
};

//How do I use this here rather than in my partial?
function isVowel(letter) {
    return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(letter.toLowerCase()) !== -1
}