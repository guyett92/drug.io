/*----- constants -----*/

/*----- app's state (variables) -----*/
let dangerCount = 1;
/*----- cached element references -----*/

/*----- event listeners -----*/
// Check for click events on the navbar burger icon
$('.navbar-burger').on('click', classToggle);
$(window).on('resize', fixedNav);
$('.userAvatar').on('click', activateModal);
$('.reg-modal').on('click', closeModal);
$('#edit').on('click', activateCard);
$('.delete').on('click', closeCard);
$('.close-modal').on('click', closeCard);
$('input').on('invalid', addDanger);
$('input').on('keyup', removeDanger);
$('#clear-fields').on('click', clearFields);
$('form').on('submit', formSuccess);

/*----- functions -----*/
function formSuccess(e) {
    bulmaToast.toast({
        message: 'Successful Submission',
        position: 'bottom-left',
        type: 'is-success',
        opacity: 0.7
    });
}

function clearFields(e) {
    $('input').val('');
    $('textarea').val('');
}

//Add visual cue for inaccurate inputs
function removeDanger(e) {
    e.target.classList.remove('is-danger');
}

function addDanger(e) {
    e.target.classList.add('is-danger');
    while (dangerCount === 1) {
        bulmaToast.toast({
            message: 'Oops! Something is wrong...',
            position: 'bottom-left',
            type: 'is-danger',
            duration: '10000',
            dismissable: true
        });
        dangerCount -= 1;
    }
}
// For card modals
function closeCard(e){
    $('.cardModal').removeClass('is-active');
}

function activateCard(e) {
    $('.cardModal').addClass('is-active');
}

function closeModal(e) {
    $('.reg-modal').removeClass('is-active');
}

function activateModal(e) {
    $('.reg-modal').addClass('is-active');
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