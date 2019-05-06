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
        animation_tickers['tier2a_population_progress'] = setInterval(animations.hprogressbar, anim_tick_time,
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
        if (animation_tickers.hasOwnProperty('tier1_tier2_transition')){
            clearInterval(animation_tickers['tier1_tier2_transition']);
        }
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
        fallingman_canvas.removeEventListener("click", clicked);

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // activate event
        utils.filleventmodal("Good-good", "Now collect me souls!", "As you wish... Master");
        wingedman_canvas.addEventListener("click", clicked);
        utils.hide('tier1');
        utils.reveal('tier2a');
    }

    this.tier1_tier2_no_button = function() {
        // close modal
        var modal = document.getElementById('question_modal')
        modal.style.display = "none";

        // remove eventlisteners
        fallingman_canvas.removeEventListener("click", clicked);

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // activate event
        console.log('NO!');
        utils.tier3b_lose_ending();
    }

    this.tier1_tier2_rightclick = function() {
        utils.secret_ending();
    }

    this.unlock_tier3a_resource = function() {
        console.log('REVEAL MINIONS');
        utils.filleventmodal('Use souls to summon minions',
                             'You can use souls to populate earth.',
                             'OK');
        utils.reveal('tier3a');
        follower_summon_canvas.addEventListener("click", clicked);
    }

    this.tier3a_start_countdown = function() {
        var real_balance_seconds = Math.floor(req_balance_time / 2);
		timer_display.innerHTML = utils.format_time(real_balance_seconds);
        utils.reveal('time_req_box');
    }

    this.tier3a_win_ending = function() {
        console.log('DEVIL WIN');
        // destruct game by removing main window
        utils.hide('main_window');

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // popup ending modal
        var modal = document.getElementById('game_over_modal');
        modal.style.display = "block";

        var button = document.createElement('div');
        button.append(document.createTextNode("Start over"));
        button.classList.add('button');
        button.onclick = utils.reset;

        var endingspan = document.getElementById('ending');
        endingspan.innerHTML = "Even when siding with the devil, you found the balance.";
        endingspan.append(button);

        // unlock achievement
        utils.unlock_achievement('devil_good_ending');
    }

    this.tier3a_lose_ending = function() {
        console.log('DEVIL LOST');
        // destruct game by removing main window
        utils.hide('main_window');

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // popup ending modal
        var modal = document.getElementById('game_over_modal');
        modal.style.display = "block";

        var button = document.createElement('div');
        button.append(document.createTextNode("Start over"));
        button.classList.add('button');
        button.onclick = utils.reset;

        var endingspan = document.getElementById('ending');
        endingspan.innerHTML = "Congratulations!<br>You wiped out the human race from earth!";
        endingspan.append(button);

        // unlock achievement
        utils.unlock_achievement('devil_bad_ending');
    }

    this.tier3b_lose_ending = function() {
        console.log('DEVIL LOST');
        // destruct game by removing main window
        utils.hide('main_window');

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // popup ending modal
        var modal = document.getElementById('game_over_modal');
        modal.style.display = "block";

        var button = document.createElement('div');
        button.append(document.createTextNode("Start over"));
        button.classList.add('button');
        button.onclick = utils.reset;

        var endingspan = document.getElementById('ending');
        endingspan.innerHTML = "Then suffer till the end of time!";
        endingspan.append(button);

        // unlock achievement
        utils.unlock_achievement('resistance_bad_ending');
    }

    this.secret_ending = function() {
        // destruct game by removing main window
        utils.hide('main_window');

        // stop animations
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
        }

        // removing previous modals / contents
        var modal = document.getElementById('question_modal')
        modal.style.display = "none";

        var endingspan = document.getElementById('ending');
        endingspan.innerHTML = '';

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
                    utils.unlock_achievement('wake_up_ending');
                }, 10000)
            }, 1000)
        }, 2000);
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
        achievements.push(id);
        utils.reveal(id);
        utils.save();
    }

    this.reset = function() {
        // hide everything
        var dom_elements_to_hide = [
            'header',
            'devil_good_ending',
            'devil_bad_ending',
            'resistance_good_ending',
            'resistance_bad_ending',
            'wake_up_ending',
            'sound_canvas',
            'tier1_interface',
            'tier1_improvements_box',
            'tier1_generators_box',
            'tier2a',
            'tier2a_improvements_box',
            'tier2a_generators_box',
            'soul_canvas',
            'tier3a',
            'convert_followers_button',
            'tier3a_improvements_box',
            'tier3a_generators_box',
            'time_req_box',
        ]
        dom_elements_to_hide.forEach( element => {
            utils.hide(element);
        });

        var modal = document.getElementById('game_over_modal');
        modal.style.display = "none";

        // set everything to init
        test_generator.level = 0;
        test_generator2.level = 0;
        test_generator3.level = 0;

        for (generator of generators) {
            generator.obj.level = 0;
            generator.enabled = 0;
        }

        for (improvement of improvements) {
            improvement.obj.level = 0;
            improvement.enabled = 0;
        }

        for (tier of tiers) {
            clickers[tier].level = 1;
            resource[tier] = 0;
            resource_produced[tier] = 0;
            altogether_productivity[tier] = 0;
        }

        generator_tick_time = 1000;
        logic_tick_time = 500;

        generators.forEach(generator => {
            clearInterval(generator.obj.tick);
            generator.obj.set_tick(generator.obj, generator_tick_time)
        });

        for (event of events) {
            event.obj.triggered = 0;
            event.triggered = 0;
        }

        fallingman_image_list = [images['wall'], images['man'],];

        req_balance_time = 10 * 60 * 2;
        var real_balance_seconds = Math.floor(req_balance_time / 2);
        timer_display = document.getElementById('time_req');
		timer_display.innerHTML = utils.format_time(real_balance_seconds);

        // reveal achievements
        if (achievements.length > 0) {
            utils.reveal('header');
            achievements.forEach(achievement => {
                utils.reveal(achievement);
            });
        }

        utils.reveal('main_window');
        utils.reveal('tier1');
        animation_tickers['tier1'] = setInterval(animations.flip, anim_tick_time,
                                                 fallingman_canvas, fallingman_context,
                                                 fallingman_image_list, fallingman_text_list)
        fallingman_canvas.addEventListener("click", clicked);
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

    this.bake_cookie = function(name, value) {
        var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
    }

    this.read_cookie = function(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }

    this.save = function() {
        utils.bake_cookie('achievements', achievements);
    }

    this.load = function() {
        cookie = utils.read_cookie('achievements');
        if (cookie !== undefined && cookie !== null && cookie.length > 0) {
            achievements = cookie;
            if (achievements.length > 0) {
                utils.reveal('header');
                achievements.forEach(achievement => {
                    utils.reveal(achievement);
                });
            }
        }
    }

    this.format_time = function(sec_num) {
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;

    }
};

// var dom = new function() {};
// var transitions = new function() {};
// var utils = new function() {};
