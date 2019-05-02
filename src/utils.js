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

    this.turn_on_population_progress = function(target=100) {
        utils.reveal('soul_canvas');
        animation_tickers['tier2a_population_progress'] = setInterval(animations.vprogressbar, anim_tick_time,
                                                                      soul_canvas, soul_context, 'tier2a', target)
    }

    this.filleventmodal = function(header, content, button) {
        var modal = document.getElementById('event_modal');
        modal.style.display = "block";

        var modalheader = document.getElementById('event_modal_h1');
        modalheader.innerHTML = header;

        var modalcontent = document.getElementById('event_modal_content');
        modalcontent.innerHTML = content;

        var modalbutton = document.getElementById('event_modal_close_button');
        modalbutton.innerHTML = button;
        modalbutton.onclick = function() {
            modal.style.display = "none";
        };
    }

    this.contextmenu_open = function(event) {
        event.preventDefault();
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = (event.pageX - 10) + "px";
        ctxMenu.style.top = (event.pageY - 10) + "px";
    }

    this.contextmenu_click = function(event) {
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "";
        ctxMenu.style.left = "";
        ctxMenu.style.top = "";
    }

    this.tier1_transition_to_tier2 = function() {
        // disable + hide sound progress bar
        clearInterval(animation_tickers['tier1_tier2_transition']);
        utils.hide('sound_canvas');

        // create modal question
        var modal = document.getElementById('question_modal');
        modal.style.display = "block";

        // register hidden context menu
        modal.addEventListener("contextmenu", utils.contextmenu_open, false);
        modal.addEventListener("click", utils.contextmenu_click, false);

        // register button functions
        var yesbutton = document.getElementById('question_yes_button');
        yesbutton.onclick = utils.tier1_tier2_yes_button;
        var nobutton = document.getElementById('question_no_button');
        nobutton.onclick = utils.tier1_tier2_no_button;
        var otherbutton = document.getElementById('question_other_button');
        otherbutton.onclick = utils.tier1_tier2_rightclick;
    }

    this.tier1_tier2_yes_button = function() {
        // close modal
        var modal = document.getElementById('question_modal');
        modal.style.display = "none";

        // remove eventlisteners
        modal.removeEventListener("contextmenu", utils.contextmenu_open);
        modal.removeEventListener("click", utils.contextmenu_click);
        fallingman_canvas.removeEventListener("click", clicked);

        // stop animations
        clearInterval(animation_tickers['tier1']);

        // remove modal
        modal.parentNode.removeChild(modal);

        // activate event
        utils.filleventmodal("Good-good", "Now collect me souls!", "As you wish... Master");
        wingedman_canvas.addEventListener("click", clicked, tier='tier2a');
        utils.hide('tier1');
        utils.reveal('tier2a');
    }

    this.tier1_tier2_no_button = function() {
        // close modal
        var modal = document.getElementById('question_modal')
        modal.style.display = "none";
        // remove eventlisteners
        modal.removeEventListener("contextmenu", utils.contextmenu_open);
        modal.removeEventListener("click", utils.contextmenu_click);
        // remove modal
        modal.parentNode.removeChild(modal);
        // activate event
        console.log('NO!');
        var modal = document.getElementById('game_over_modal');
        modal.style.display = "block";
    }

    this.tier1_tier2_rightclick = function() {
        // destruct game by removing main window
        var main_window = document.getElementById('main_window');
        main_window.innerHTML = '';
        // removing previous modal
        var modal = document.getElementById('question_modal')
        modal.style.display = "none";
        // game over modal
        setTimeout(function() {
            var modal = document.getElementById('game_over_modal');
            modal.style.display = "block";
            setTimeout(function() {
                var endingspan = document.getElementById('ending');
                endingspan.innerHTML = "It must've been a bad dream.<br/>That must be it...";
                setTimeout(function() {
                    var button = document.createElement('div');
                    button.append(document.createTextNode("Start over"));
                    button.classList.add('button');
                    button.onclick = utils.reset;
                    var endingspan = document.getElementById('ending');
                    endingspan.innerHTML = "It must've been a bad dream.<br/>That must be it... Or is it?<br/>";
                    endingspan.append(button);
                }, 10000)
            }, 1000)
        }, 2000);
    }

    this.unlock_tier3a_resource = function() {
        console.log('REVEAL FOLLOWERS');
        utils.filleventmodal('Convert souls to followers',
                             'You can use souls to summon followers',
                             'OK')

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

    this.unlock_achievement = function(id) {
        utils.reveal(id);
    }

    this.reset = function() {
        alert('RESET!');
        // hide everything

        // set everything to init

        // reveal achievements
        achievements.forEach(achievement => {
            utils.reveal(achievement);
        });
        // reveal tier1

    }

    this.formatWithCommas = function(num, decimal) {
        var hasDot = false;
        var base = num.toString();
        if (base.indexOf("e+") !== -1) {
            var splittedExponentNum = base.split("e+"),
            exponent = splittedExponentNum[1],
            str = '';
            if (base.indexOf(".") !== -1) {
                base = splittedExponentNum[0].split(".");
                exponent -= base[1].length;
                base = base.join("");
            }
            while (exponent--) {
                str = str + '0';
            }
            base = base + str;
        }
        if (base.indexOf(".") !== -1) {
            hasDot = true;
        }
        if (decimal === 0) {
            if (base.length <= 3 && !hasDot) return base;
        }
        if (typeof (decimal) === "undefined") {
            decimal = 0;
        }
        var leftNum = hasDot ? base.substr(0, base.indexOf(".")) : base;
        if (decimal === 0) {
            if (num <= 999) return leftNum;
            else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
        var dec = hasDot ? base.substr(base.indexOf("."), decimal + 1) : ".";
        while (dec.length < decimal+1) {
            dec += "0";
        }
        if (num <= 999) return leftNum + dec;
        else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + dec;
    }

    this.numberCruncher = function(number, decimals){
        var suffix = "";
        if (decimals == undefined){decimals = 2;}
        var precision = decimals;
        if (number>999999999999999999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000000000000000000;
            suffix = "sexdecillion";
        } else if (number>999999999999999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000000000000000;
            suffix = "quindecillion";
        } else if (number>999999999999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000000000000;
            suffix = "quattuordecillion";
        } else if (number>999999999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000000000;
            suffix = "tredecillion";
        } else if (number>999999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000000;
            suffix = "duodecillion";
        } else if (number>999999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000000;
            suffix = "undecillion";
        } else if (number>999999999999999999999999999999999){
            number = number/1000000000000000000000000000000000;
            suffix = "decillion";
        } else if (number>999999999999999999999999999999){
            number = number/1000000000000000000000000000000;
            suffix = "nonillion";
        } else if (number>999999999999999999999999999){
            number = number/1000000000000000000000000000;
            suffix = "octillion";
        } else if (number>999999999999999999999999){
            number = number/1000000000000000000000000;
            suffix = "septillion";
        } else if (number>999999999999999999999){
            number = number/1000000000000000000000;
            suffix = "sextillion";
        } else if (number>999999999999999999){
            number = number/1000000000000000000;
            suffix = "quintillion";
        } else if (number>999999999999999){
            number = number/1000000000000000;
            suffix = "quadrillion";
        } else if (number>999999999999){
            number = number/1000000000000;
            suffix = "trillion";
        } else if (number>999999999){
            number = number/1000000000;
            suffix = "billion";
        } else if (number>999999){
            number = number/1000000;
            suffix = "million";
        } else if (number>999){
            number = number/1000;
            suffix = "thousand";
        }  else if (number<1000){
            precision = 0;
        }
        return number.toFixed(precision) + " " + suffix;
    }

};

// var dom = new function() {};
// var transitions = new function() {};
// var utils = new function() {};
