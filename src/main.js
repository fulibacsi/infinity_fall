

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
        'id': 'Earplug',
        'obj': new Improvement("Earplug", 1, 10, 1.15, false, utils.mute),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Subtitles',
        'obj': new Improvement("Subtitles", 1, 50, 1.15, clicker, utils.add_subtitle),
        'threshold': 50,
        'req_improvements': ['Earplug'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Loudspeaker',
        'obj': new Improvement("Loudspeaker", false, 20, 1.25, clicker, utils.improve),
        'threshold': 20,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    }
]


var generators = [
    {
        'id': 'Echo',
        'obj': new Generator("Echo", 1, 20, 1.15),
        'threshold': 20,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Repeater',
        'obj': new Generator("Repeater", 10, 200, 1.15),
        'threshold': 200,
        'req_improvements': [],
        'req_generators': ['Echo'],
        'enabled': 0
    },
    {
        'id': 'Feedback Loop',
        'obj': new Generator("Feedback Loop", 100, 2000, 1.15),
        'threshold': 2000,
        'req_improvements': [],
        'req_generators': ['Repeater'],
        'enabled': 0
    },
    {
        'id': 'Delusions',
        'obj': new Generator("Delusions", 1000, 20000, 1.15),
        'threshold': 20000,
        'req_improvements': [],
        'req_generators': ['Feedback Loop'],
        'enabled': 0
    },
    {
        'id': 'Imaginary Friend',
        'obj': new Generator("Imaginary Friend", 10000, 199999, 1.15),
        'threshold': 200000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
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
