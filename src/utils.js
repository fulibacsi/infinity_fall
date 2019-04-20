var utils = new function() {
    this.randint = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    this.pass = function(param) {
        console.log(param);
    }

    this.mute = function(obj) {
        obj.mute = true;
        fallingman_image_list.push(images['mute']);

    }

    this.remove = function(from, item) {
        for (var i = 0; i < from.length; i++) {
            if (from[i] == item) {
                from.splice(i, 1);
            }
        }
    }

    this.add_subtitle = function(obj) {
        obj.subtitle = true;
        fallingman_image_list.push(images['sub']);
    }

    this.show_subtitle = function(text, timeout=300) {
        var subtitle =  [text, '#FFFFFF', [60, 60]];
        fallingman_text_list.push(subtitle);
        setTimeout(function() {
            utils.remove(fallingman_text_list, subtitle);
        }, timeout);
    }

    this.add_eyes = function() {
        fallingman_image_list.splice(0, 0, images['eyes']);
    }

    this.change_imaginary_to_misterious = function() {
        node = utils.getitem(generators, 'Imaginary Friend',  'id').obj.area;
        node.childNodes[0].replaceWith(document.createTextNode('Misterious Friend Level: '));
    }

    this.turn_on_sound_progress = function(target=100) {
        utils.reveal('sound_canvas');
        animation_tickers['tier1_tier2_transition'] = setInterval(animations.vprogressbar, anim_tick_time, 
                                                                  sound_canvas, sound_context, 'tier1', target)
    }

    this.speed_up_time = function() {
        generator_tick_time = Math.floor(generator_tick_time / 2);
        generators.forEach(generator => {
            clearInterval(generator.obj.tick);
            generator.obj.set_tick(generator.obj, generator_tick_time)
        });   
    }

    this.improve = function(obj) {
        obj.improve();
        obj.renew_display();
    }

    this.getitem = function(list, val, key) {
        // returns listitem[key] == val from list if it can be found, otherwise false
        for (item of list) {
            if (item[key] == val) {
                return item;
            }
        };
        return false;
    }

    this.getlevel = function(list, val) {
        for (item of list) {
            if (item['id'] == val) {
                return item.obj.level;
            }
        };
        return 0;
    }

    this.check_preqs = function(req_improvements, req_generators) {
        var cond = true;
        for (req of req_improvements) {
            req_item = utils.getitem(improvements, req, 'id');
            cond = cond && (req_item !== false && req_item.enabled == 1 && req_item.obj.level > 0);
        }

        for (req of req_generators) {
            req_item = utils.getitem(generators, req, 'id');
            cond = cond && (req_item !== false && req_item.enabled == 1 && req_item.obj.level > 0);
        };

        return cond;
    }

    this.check_event_triggered = function(req_events) {
        var cond = true;
        for (req of req_events) {
            req_item = utils.getitem(events, req, 'id');
            cond = cond && (req_item !== false && req_item.triggered == 1);
        }
        return cond;
    }

    this.reveal = function(id) {
        var element = document.getElementById(id);
        if (element !== 'undefined' && element !== null) {
            element.classList.remove("hidden");
        }
    }

    this.hide = function(id) {
        var element = document.getElementById(id);
        if (element !== 'undefined' && element !== null) {
            element.classList.add("hidden");
        }
    }

    this.enable = function(id) {
        var element = document.getElementById(id);
        if (element !== 'undefined' && element !== null) {
            element.classList.remove("disabled");
        }
    }

    this.disable = function(id) {
        var element = document.getElementById(id);
        if (element !== 'undefined' && element !== null) {
            element.classList.add("disabled");
        }
    }
};
