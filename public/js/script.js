/*----- constants -----*/

/*----- app's state (variables) -----*/
let dangerCount = 1;
let showImageContainer;
let adjustCount = 1;
let arrowCount = 2;
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
$('th > button').on('click', changeSort);
window.onload = function () {makeAllSortable();};

/*----- functions -----*/

// Change the sorting arrow
function changeSort(e) {
    if(arrowCount % 2 === 0) {
        $(this)[0].innerHTML = '<button id="search-button"><span class="icon"><i class="fas fa-sort-down"></i></span></button>';
    } else {
        $(this)[0].innerHTML = '<button id="search-button"><span class="icon"><i class="fas fa-sort-up"></i></span></button>';
    }
    arrowCount += 1;
}

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // Ignore head and foot
        tr = Array.prototype.slice.call(tb.rows, 0), // Put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // Sort rows
        return reverse // -1 * for opposite order
            * (a.cells[col].textContent.trim() // Using for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // Append each row in order
}

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // If no thead, then do nothing 
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}

// When a form is submitted
function formSuccess(e) {
    bulmaToast.toast({
        message: 'Successful Submission',
        position: 'bottom-left',
        type: 'is-success',
        opacity: 0.7
    });
}

// Clear input fields with button
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
        if (adjustCount > 0) {
        showImageContainer = $('.show-image').detach();
        adjustCount -= 1;
        } else {
            $('.show-image').remove();
        }
        $('.card-target').append(showImageContainer);
    }
    if($(window).width() > 768) {
        $('#nav-target').removeClass('is-fixed-top');
        $('.hero').css("margin-top","0px");
        $('.show-image').remove()
        $('.added-image').append(showImageContainer);
    }
}
// Function to add a fixed nav on load or assign active to the user page
$(function() {
    if($(window).width() <= 768) {
        $('#nav-target').addClass('is-fixed-top');
        $('.hero').css("margin-top","5rem");
        if (adjustCount > 0) {
        showImageContainer = $('.show-image').detach();
        adjustCount -= 1;
        } else {
            $('.show-image').remove();
        }
        $('.card-target').append(showImageContainer);
    }
    if (document.URL.includes('users')) {
         $('#userPage').addClass('active');
    }
});

// $(document).ready( function () {
//     $('.drug-table').DataTable();
//     $('input[type=search]').addClass('input');
//     $('label').addClass('label');
//     $('select').addClass('select');
// } );