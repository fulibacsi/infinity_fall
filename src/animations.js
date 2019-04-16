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

        return {
            'wall': [wall, [0, 0]],
            'man': [man, [70, 70]],
            'mute': [mute, [190, 190]],
            'sub':  [subtitle, [180, 190]]
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

    this.flip = function(context, imgs, texts) {
        context.clearRect(0, 0, 200, 200);

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
