

// cookies
var resource = 0;
var resource_produced = 0;
var altogether_productivity = 0; // counts productivity of buildings except clicker

var cookies_display = document.getElementById("dBs");
var cookies_produced_display = document.getElementById("dBs_shouted");

var improvement_elements = document.getElementById("improvements");
var generator_elements = document.getElementById("generators");

clicker = new Clicker();

var improvements = [
    {
        'obj': new Improvement("Earplug", 1, 9, 1.15, false, utils.mute),
        'threshold': 10,
        'enabled': 0 
    },
    {
        'obj': new Improvement("Subtitles", 1, 49, 1.15, clicker, utils.add_subtitle),
        'threshold': 50,
        'enabled': 0 
    },
    {
        'obj': new Improvement("Loudspeaker", false, 19, 1.25, clicker, utils.improve),
        'threshold': 20,
        'enabled': 0 
    }
]


var generators = [
    {
        'obj': new Generator("Repeater", 1, 19, 1.15),
        'threshold': 20,
        'enabled': 0
    },
    {
        'obj': new Generator("Feedback loop", 10, 199, 1.15),
        'threshold': 200,
        'enabled': 0 
    },
    {
        'obj': new Generator("Factory", 100, 1999, 1.15),
        'threshold': 2000,
        'enabled': 0
    },
    {
        'obj': new Generator("Cookie Tesla", 1000, 19999, 1.15),
        'threshold': 20000,
        'enabled': 0
    },
    {
        'obj': new Generator("Cookie Gigant", 10000, 199999, 1.15),
        'threshold': 200000,
        'enabled': 0
    },
]


// animations
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

// click event
canvas.addEventListener("click", clicked, false);
canvas.onselectstart = function () { return false; }
function clicked(e){
    e.preventDefault();
    clicker.click();
}

// initally only the falling man and the wall can be seen
var images = animations.load_imgs();
var image_list = [images['wall'], images['man']];

var texts = {
    'A': ['AAAAAAA', '#FFFFFF', [60, 60]]
}
var text_list = [];

// clicking loop
setInterval(renew_resources, 500);
// animation loop
setInterval(animations.flip, 100, context, image_list, text_list);
