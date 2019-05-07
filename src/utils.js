var utils = new function() {

    // GENERAL FUNCTIONS

    this.randint = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    this.pass = function(param) {
        console.log(param);
    }

    this.remove = function(from, item) {
        for (var i = 0; i < from.length; i++) {
            if (from[i] == item) {
                from.splice(i, 1);
            }
        }
    }

    this.in_list = function(value, list) {
        return list.includes(value);
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

    this.format_time = function(sec_num) {
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;

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

    this.unlock_achievement = function(id) {
        achievements.push(id);
        utils.reveal(id);
        utils.save();
    }

    // FACTORIES

    this.improvement_factory = function(level) {
        var name = 'Very '.repeat(level) + "Painful Device";
        var price = 1000000 * Math.pow(10, level);
        var rate = 1.17;
        var imp = new Improvement("tier2b", name, 1, price, rate, clickers['tier2b'], utils.improve);

        if (level == 0) {
            var imp_req = 'Eternal Fire';
            var gen_req = 'More Pain';
        } else {
            var imp_req = 'Very '.repeat(level-1) + "Painful Device";
            var gen_req = 'Much '.repeat(level-1) + "More Pain";
        }

        var threshold = price / 2;
        var result = {
            'id': name,
            'tier': 'tier2b',
            'obj': imp,
            'threshold': threshold,
            'req_improvements': [imp_req],
            'req_generators': [gen_req],
            'enabled': 0
        }

        return result;
    }

    this.generator_factory = function(level) {
        var name = 'Much '.repeat(level) + "More Pain";
        var prod = parseInt('4'.repeat(7 + level));
        var price = 2000000 * Math.pow(10, level);
        var rate = 1.17;
        var gen = new Generator('tier2b', name, prod, false, price, rate);

        if (level == 0) {
            var imp_req = 'Eternal Fire';
            var gen_req = 'More Pain';
        } else {
            var imp_req = 'Very '.repeat(level-1) + "Painful Device";
            var gen_req = 'Much '.repeat(level-1) + "More Pain";
        }

        var threshold = price / 2;

        var result = {
            'id': name,
            'tier': 'tier2b',
            'obj': gen,
            'threshold': threshold,
            'req_improvements': [imp_req],
            'req_generators': [gen_req],
            'enabled': 0
        }

        return result;
    }

    this.event_factory = function(level) {
        var name = 'tier2b_generate_imps_gens_' + level;

        if (level == 0) {
            var imp_req = 'Eternal Fire';
            var gen_req = 'More Pain';
        } else {
            var imp_req = 'Very '.repeat(level-1) + "Painful Device";
            var gen_req = 'Much '.repeat(level-1) + "More Pain";
        }

        var result = {
            'id': name,
            'tier': 'tier2b',
            'obj': new Event(name,
                             [{'key': imp_req, 'relation': 'has improvement'},
                              {'key': gen_req, 'relation': 'has generator'},], utils.add_next_level, [level + 1]),
            'triggered': 0
        }

        return result;
    }

    this.tier3a_add_minion = function(level) {
        // add minion to anim
        utils.add_minions();

        // add next level event
        var name = 'tier3a_add_minion_' + level;
        var prev_event = 'tier3a_add_minion_' + (level - 1);
        var res_req = 10 * Math.pow(10, level);
        var event = {
            'id': name,
            'tier': 'tier3a',
            'obj': new Event(name,
                             [{'key': prev_event, 'relation': 'triggered'},
                              {'tier': 'tier3a', 'variable': 'resource_produced', 'relation': '>=', 'value': res_req}],
                             utils.tier3a_add_minion, [level + 1]),
            'triggered': 0
        }

        events.push(event);
    }


    this.add_next_level = function(level) {
        improvements.push(utils.improvement_factory(level));
        generators.push(utils.generator_factory(level));
        events.push(utils.event_factory(level));
    }

    // ANIMATION RELATED

    this.mute = function(obj) {
        obj.mute = true;
        fallingman_image_list.push(images['mute']);

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

    this.add_minions = function() {
        var minion = images['minion'][0];
        var img = [minion, [utils.randint(0, 192), utils.randint(0, 192)]];
        follower_summon_image_list.push(img);
    }

    // EVENT HANDLERS

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

    this.change_imaginary_to_misterious = function() {
        node = utils.getitem(generators, 'Imaginary Friend',  'id').obj;
        node.name = 'Misterious Friend';
        node.button.innerHTML = '';
        node.button.append(document.createTextNode(node.name));
        node.button.append(document.createTextNode(" ("));
        node.button.append(node.level_display);
        node.button.append(document.createTextNode(")"));
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

    // TRANSITIONS
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
        animation_tickers['winged'] = setInterval(animations.flip, anim_tick_time,
                                                  wingedman_canvas, wingedman_context,
                                                  wingedman_image_list, wingedman_text_list);
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
        utils.filleventmodal("Then suffer for all eternity!",
                             "", "You won't break me!");
        animation_tickers['burning'] = setInterval(animations.flip, anim_tick_time,
                                                  burningman_canvas, burningman_context,
                                                  burningman_image_list, burningman_text_list);
        burningman_canvas.addEventListener("click", clicked);
        utils.hide('tier1');
        utils.reveal('tier2b');
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
        animation_tickers['minion'] = setInterval(animations.flip, anim_tick_time,
                                                  follower_summon_canvas, follower_summon_context,
                                                  follower_summon_image_list, follower_summon_text_list);
        follower_summon_canvas.addEventListener("click", clicked);
    }

    this.tier3a_start_countdown = function() {
        var real_balance_seconds = Math.floor(req_balance_time / 2);
		timer_display.innerHTML = utils.format_time(real_balance_seconds);
        utils.reveal('time_req_box');
    }

    this.tier2b_bad_ending_question = function() {
        // create modal question
        var modal = document.getElementById('resistance_question_modal');
        modal.style.display = "block";

        // register button functions
        var yesbutton = document.getElementById('resistance_question_yes_button');
        yesbutton.onclick = utils.tier2b_bad_answer;

        var nobutton = document.getElementById('resistance_question_no_button');
        nobutton.onclick = utils.tier2b_good_answer;
    }

    this.tier2b_good_answer = function() {
        // close modal
        var modal = document.getElementById('resistance_question_modal');
        modal.style.display = "none";

        // popup info modal
        utils.filleventmodal("You fool!", "You'll suffer until infinity and beyond!", "You won't break me!");
    }

    this.tier2b_bad_answer = function() {
        // close modal
        var modal = document.getElementById('resistance_question_modal');
        modal.style.display = "none";

        // popup info modal
        utils.tier2b_lose_ending();
    }

    // MODALS

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

    // ENDINGS

    this.tier3a_win_ending = function() {
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'devil_good'
        });
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
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'devil_bad'
        });
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

    this.tier2b_win_ending = function() {
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'resist_good'
        });
        console.log('RESIST WIN');
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
        endingspan.innerHTML = "You managed to suffer until salvation!";
        endingspan.append(button);

        // unlock achievement
        utils.unlock_achievement('resistance_good_ending');
    }

    this.tier2b_lose_ending = function() {
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'resist_bad'
        });
        console.log('RESIST LOST');
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
        endingspan.innerHTML = "You failed to withstand the torture of the devil!";
        endingspan.append(button);

        // unlock achievement
        utils.unlock_achievement('resistance_bad_ending');
    }

    this.secret_ending = function() {
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'secret'
        });
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

    this.ultimate_ending = function() {
        gtag('event', 'click', {
            'event_category': 'Endings',
            'event_label': 'ultimate'
        });
        utils.filleventmodal('CONGRATULATIONS!',
                             'You found all endings!<br>Thanks for playing my game!',
                             'Whatever.');
        var event_modal_close_button = document.getElementById('event_modal_close_button');
        event_modal_close_button.onclick = function() {
            achievements = [];
            utils.save();
            document.getElementsByTagName("BODY")[0].innerHTML = '';
        }
    }

    // RESET

    this.reset = function() {
        gtag('event', 'click', {
            'event_category': 'Reset',
            'event_label': 'reset'
        });
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
            'tier2b',
            'tier2b_improvements_box',
            'tier2b_generators_box',
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
        test_generator2b.level = 0;

        for (generator of generators) {
            generator.obj.reset();
            generator.enabled = 0;
        }

        for (improvement of improvements) {
            improvement.obj.reset();
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

        // animation reset
        for (ticker in animation_tickers) {
            clearInterval(animation_tickers[ticker]);
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

};

// var dom = new function() {};
// var transitions = new function() {};
// var utils = new function() {};
