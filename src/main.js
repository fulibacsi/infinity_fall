

// resources
var resource = 0;
var resource_produced = 0;
var altogether_productivity = 0; // counts productivity of buildings except clicker

var cookies_display = document.getElementById("dBs");
var cookies_produced_display = document.getElementById("dBs_shouted");
var altogether_productivity_display = document.getElementById("altogether_productivity");

var improvement_elements = document.getElementById("improvements");
var generator_elements = document.getElementById("generators");

// tick times
var generator_tick_time = 1000;
var interface_tick_time = 500;
var anim_tick_time = 100;


// clickers
var clickers = [];
var clicker = new Clicker();

// events
var events = [
    // TIER 0
    {
        'id': 'init_click',
        'obj': new Event('init game', [{'variable': 'resource_produced', 'relation': '>=', 'value': 1}], utils.reveal, 'interface'),
        'enabled': 0
    }
]

// improvements
var improvements = [
    // TIER 0
    {
        'id': 'Earplug',
        'obj': new Improvement("Earplug", 1, 10, 1.15, clicker, utils.mute),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    // TIER 1
    {
        'id': 'Subtitles',
        'obj': new Improvement("Subtitles", 1, 50, 1.15, clicker, utils.add_subtitle),
        'threshold': 20,
        'req_improvements': ['Earplug'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Loudspeaker',
        'obj': new Improvement("Loudspeaker", false, 20, 1.25, clicker, utils.improve),
        'threshold': 70,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    // TIER 2
    {
        'id': 'Time distortion',
        'obj': new Improvement("Time distortion", 1, 2000000000, 1.25, false, utils.speed_up_time),
        'threshold': 2000000000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
    },
    // TIER 3
    {
        'id': 'Speed up time',
        'obj': new Improvement("Speed up time", 1, 2000000000000, 1.25, false, utils.speed_up_time),
        'threshold': 2000000000000,
        'req_improvements': ['Time distortion'],
        'req_generators': ['Imaginary Friend'],
        'enabled': 0
    },
]


// generators
var generators = [
    // TIER 1
    {
        'id': 'Echo',
        'obj': new Generator("Echo", 1, 20, 1.15),
        'threshold': 20,
        'req_improvements': ['Loudspeaker'],
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
        'obj': new Generator("Imaginary Friend", 10000, 200000, 1.15),
        'threshold': 200000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
    },
    // TIER 2
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

// sounds
var shouts = sounds.load_sounds();

// clicking loop
setInterval(renew_resources, 500);
// animation loop
setInterval(animations.flip, 100, context, image_list, text_list);
