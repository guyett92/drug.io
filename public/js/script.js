/*----- constants -----*/

const { MongooseDocument } = require("mongoose");

/*----- app's state (variables) -----*/
let count = 0;

/*----- cached element references -----*/

/*----- event listeners -----*/
// Check for click events on the navbar burger icon
$('.navbar-burger').on('click', classToggle);
// When a user favorites a drug
$('.liked-container').on('click', likedToggle);

/*----- functions -----*/
// Add a class to toggle the heart on click
function likedToggle(e) {
    if (count === 0 || count % 2 === 0) {
        e.currentTarget.childNodes[1].classList.add('fas');
    } else {
        e.currentTarget.childNodes[1].classList.add('far');
    }
    count += 1;
};

function classToggle(e) {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
};

function timestamp(time) {
    return moment(time).format("DD-MM-YYYY")
}