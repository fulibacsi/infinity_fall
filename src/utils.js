var utils = new function() {
    this.randint = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    this.pass = function(param) {
        console.log(param);
    }

    this.mute = function(param) {
        image_list.push(images['mute']);
    }

    this.add_subtitle = function(obj) {
        obj.subtitle = true;
        image_list.push(images['sub']);
    }

    this.show_subtitle = function(text) {
        var subtitle =  [text, '#FFFFFF', [60, 60]];
        text_list.push(subtitle);
        setTimeout(function() {
            text_list.pop();
        }, 300);
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

    this.check_preqs = function(req_improvements, req_generators) {
        for (req of req_improvements) {
            req_item = utils.getitem(improvements, req, 'id');
            return req_item !== false && req_item.enabled == 1 && req_item.obj.level > 0;
        }

        for (req of req_generators) {
            req_item = utils.getitem(generators, req, 'id');
            return req_item !== false && req_item.enabled == 1 && req_item.obj.level > 0;
        };

        return true;
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
