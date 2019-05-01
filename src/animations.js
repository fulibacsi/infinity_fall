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


        return {
            'wall': [wall, [0, 0]],
            'man': [man, [70, 70]],
            'mute': [mute, [190, 190]],
            'sub':  [subtitle, [180, 190]],
            'eyes': [eyes, [60, 50]]
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
        width = Math.max(0, canvas.width - Math.floor(canvas.width * resource[tier] / target));
        context.rect(0, 10, 300, 20);
        context.fillRect(0, 10, width, canvas.height - 10);
        ccontexttx.globalAlpha = 0.5;
        context.fillStyle = "#ffff00";
        context.fillRect(canvas.width / 2 - 10, 0, 20, canvas.height);
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
// canvas setup
var fallingman_canvas = document.getElementById('fallingman_canvas');
var fallingman_context = fallingman_canvas.getContext("2d");

// initally only the falling man and the wall can be seen
var fallingman_image_list = [images['wall'], images['man'],];
var fallingman_text_list = [];

//TIER 2 CANVAS
// canvas setup
var sound_canvas = document.getElementById('sound_canvas');
var sound_context = sound_canvas.getContext("2d");

