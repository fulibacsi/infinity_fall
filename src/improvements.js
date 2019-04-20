class Improvement
{
	constructor(tier, name, maxlevel, price, price_groth_rate, target, effect) {
		this.tier = tier;
		this.name = name;
		this.level = 0;
		this.maxlevel = maxlevel;

		this.price = price;
		this.price_groth_rate = price_groth_rate;

		this.target = target;
		this.effect = effect;

		// DOM representation
		this.area = document.createElement("span");
		this.area.id = name;

		this.level_display = document.createElement("span");
		this.level_display.id = this.name + "_level";

		this.interactive_area = document.createElement('span');
		this.interactive_area.id = this.name + '_interactive_area';

		this.price_display = document.createElement("span");
		this.price_display.id = this.name + "_price";

		this.button = document.createElement("div");
		this.button.classList.add('button');
		this.button.id = this.name + '_button'
		this.button.innerHTML = "Improve";
		this.button.onclick = this.improve.bind(this);

		// put together
		this.area.append(document.createTextNode(name + " Level: "));
		this.area.append(this.level_display);
		this.area.append(document.createElement("br"));

		this.interactive_area.append(document.createTextNode("Improvement Price: "));
		this.interactive_area.append(this.price_display);
		this.interactive_area.append(document.createElement("br"));

		this.interactive_area.append(this.button);
		this.interactive_area.append(document.createElement("br"));
		this.interactive_area.append(document.createElement("br"));

		this.area.append(this.interactive_area);
	}

	get_price() {
		return Math.floor(this.price * Math.pow(this.price_groth_rate, this.level));
	}

	improve() {
		if(resource[this.tier] >= this.get_price() && this.not_maxed()) {
			console.log(this.name, 'levelled up [', this.get_price(), 'cost /', resource[this.tier], 'resource]: ', this.level + 1);
			resource[this.tier] -= this.get_price();
			this.level += 1;
			this.effect(this.target);
			this.renew_display();
		}

		if (this.is_maxed()) {
			utils.disable(this.button);
		}
	}

	renew_display() {
		if  (this.is_maxed()) {
			this.level_display.innerHTML = 'MAX';
			utils.hide(this.interactive_area.id);
		} else {
			this.level_display.innerHTML = this.level;
			this.price_display.innerHTML = this.get_price();
		}
	}

	set_visible() {
		improvement_elements[this.tier].append(this.area);
		this.renew_display();
	}

	is_maxed() {
		return (this.maxlevel !== false && this.level == this.maxlevel);
	}

	not_maxed() {
		return (this.maxlevel === false || this.level < this.maxlevel);
	}
}

var improvements = [
    // TIER 0
    {
        'id': 'Earplug',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Earplug", 1, 10, 1.25, clickers['tier1'], utils.mute),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    // TIER 1
    {
        'id': 'Subtitles',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Subtitles", 1, 50, 1.25, clickers['tier1'], utils.add_subtitle),
        'threshold': 20,
        'req_improvements': ['Earplug'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Loudspeaker',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Loudspeaker", false, 20, 1.25, clickers['tier1'], utils.improve),
        'threshold': 70,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
    },
    // TIER 2
    {
        'id': 'Time distortion',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Time distortion", 1, 500000000, 1.25, false, utils.speed_up_time),
        'threshold': 500000000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
    },
    // TIER 3
    {
        'id': 'Speed up time',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Speed up time", 1, 1500000000, 1.25, false, utils.speed_up_time),
        'threshold': 1000000000,
        'req_improvements': ['Time distortion'],
        'req_generators': ['Imaginary Friend'],
        'enabled': 0
    },
]
