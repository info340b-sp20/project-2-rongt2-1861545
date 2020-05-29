"use strict"
// Typewriter Greeter
let app = document.getElementById('greeter');
let typewriter = new Typewriter(app, {
    loop: true,
    delay: 40,
    deleteSpeed: 20
});


typewriter.typeString('What\'s your main focus for today?')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Get started on new project?')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Do more of what makes you happy!')
    .pauseFor(2500)
    .deleteAll()
    .typeString('It takes courage to grow up and become what you really are.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('It doesn\'s matter how slow you go as long as you do not stop.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('If you are not doing what you love, you\'re wasting your time.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('To reach your greatest potential, you\'ll have to fight your greatest fear.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Yesterday you said tomorrow.')
    .pauseFor(2500)
    .start();



// Greet according to time in the day
let today = new Date()
let hour = today.getHours()
let str = '';
if (hour >= 18 && hour < 3) {
    str = 'Good evening, '
} else if (hour >= 3 && hour < 12) {
    str = 'Good morning, '
} else {
    str = 'Good afternoon, ';
}
let firstname = document.getElementById('profile_name').textContent.split(" ")[0];

document.querySelector('.hero h1.title').textContent = str + firstname + '.';


// Tab Switcher
function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " is-active";
}