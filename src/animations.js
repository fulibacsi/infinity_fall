var animations = new function() {
    this.load_imgs = function () {
        var man = {
            'id': 'man-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 22,
            'width': 32,
            'height': 32
        };
        man.source.src = './assets/imgs/falling_man.png'

        var wall =  {
            'id': 'wall-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 13,
            'width': 200,
            'height': 200
        };
        wall.source.src = './assets/imgs/wall.png'

        var mute = {
            'id': 'mute-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 1,
            'width': 8,
            'height': 8
        }
        mute.source.src = './assets/imgs/mute.png'

        var subtitle = {
            'id': 'sub-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 1,
            'width': 8,
            'height': 8
        }
        subtitle.source.src = './assets/imgs/subtitle.png'

        var eyes = {
            'id': 'eye-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 32,
            'width': 64,
            'height': 32
        }
        eyes.source.src = './assets/imgs/eyes.png'

        // TIER 2a
        var winged_man = {
            'id': 'imp-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 16,
            'width': 32,
            'height': 32
        };
        winged_man.source.src = './assets/imgs/winged_man.png'

        // TIER 2b
        var burning_man = {
            'id': 'burn-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 28,
            'width': 32,
            'height': 32
        };
        burning_man.source.src = './assets/imgs/burning_man.png'

        var pit =  {
            'id': 'pit-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 18,
            'width': 200,
            'height': 200
        };
        pit.source.src = './assets/imgs/pit.png'

        // TIER 3a
        var minion = {
            'id': 'minion-img',
            'source': new Image(),
            'current': 0,
            'total_frames': 8,
            'width': 16,
            'height': 16
        };
        minion.source.src = './assets/imgs/minion.png'


        return {
            'wall': [wall, [0, 0]],
            'man': [man, [70, 70]],
            'mute': [mute, [190, 190]],
            'sub':  [subtitle, [180, 190]],
            'eyes': [eyes, [60, 50]],
            'winged': [winged_man, [70, 70]],
            'pit': [pit, [0, 0]],
            'burning': [burning_man, [70, 168]],
            'minion': [minion, [0, 0]],

        };
    }

    this.draw_anim = function(context, pos, iobj) {
        var x = pos[0];
        var y = pos[1];

        if (iobj.source != null) {
            context.drawImage(iobj.source, iobj.current * iobj.width, 0,
                            iobj.width, iobj.height,
                            x, y, iobj.width, iobj.height);
        }
        iobj.current = (iobj.current + 1) % iobj.total_frames;
    }

    this.write_text = function(context, pos, text, color) {
        var x = pos[0];
        var y = pos[1];

        context.fillStyle = color;
        context.font = 'Arial, 10px';
        context.fillText(text, x, y);
        // console.log('attempting to write:', text, 'to', x, y);
    }

    this.vprogressbar = function(canvas, context, tier, target) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        height = Math.max(0, canvas.height - Math.floor(canvas.height * resource[tier] / target));
        context.fillRect(0, height, canvas.width, canvas.height);
    }

    this.hprogressbar = function(canvas, context, tier, target) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        width = Math.min(300, Math.floor(canvas.width * resource_produced[tier] / target));
        // border
        context.globalAlpha = 1.0;
        context.fillStyle = "#000";
        context.rect(0, 10, canvas.width-1, 20);
        context.stroke();
        // bar
        context.fillStyle = "#ff0000";
        context.globalAlpha = 0.95;
        context.fillRect(0, 10, width, 20);
        // highlight
        context.globalAlpha = 0.5;
        context.fillStyle = "#ffff00";
        context.fillRect(canvas.width / 2 - 20, 0, 40, canvas.height);
        // reset
        context.globalAlpha = 1.0;
        context.fillStyle = "#000";
    }

    this.flip = function(canvas, context, imgs, texts) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        imgs.forEach(element => {
            var img = element[0];
            var pos = element[1];

            animations.draw_anim(context, pos, img);
        });

        texts.forEach(element => {
            var text = element[0];
            var color = element[1];
            var pos = element[2];

            animations.write_text(context, pos, text, color);
        });
    }
};

var images = animations.load_imgs();
var texts = {
    'A': ['AAAAAAA', '#FFFFFF', [60, 60]]
}


// TIER 1 CANVAS

// main canvas setup
var fallingman_canvas = document.getElementById('fallingman_canvas');
var fallingman_context = fallingman_canvas.getContext("2d");

// initally only the falling man and the wall can be seen
var fallingman_image_list = [images['wall'], images['man'],];
var fallingman_text_list = [];

// progressbar canvas setup
var sound_canvas = document.getElementById('sound_canvas');
var sound_context = sound_canvas.getContext("2d");


// TIER 2 CANVAS

// main canvas
var wingedman_canvas = document.getElementById('wingedman_canvas');
var wingedman_context = wingedman_canvas.getContext('2d');

// initally only the falling man and the wall can be seen
var wingedman_image_list = [images['pit'], images['winged'],];
var wingedman_text_list = [];

// progressbar canvas
var soul_canvas = document.getElementById('soul_canvas');
var soul_context = soul_canvas.getContext('2d');


// TIER 2b CANVAS

// main canvas
var burningman_canvas = document.getElementById('burningman_canvas');
var burningman_context = burningman_canvas.getContext('2d');

// initally only the falling man and the wall can be seen
var burningman_image_list = [images['pit'], images['burning'],];
var burningman_text_list = [];


// TIER 3 CANVAS

// main canvas
var follower_summon_canvas = document.getElementById('follower_summon_canvas');
var follower_summon_context = follower_summon_canvas.getContext('2d');

// initally only the falling man and the wall can be seen
var follower_summon_image_list = [images['pit'],];
var follower_summon_text_list = [];
