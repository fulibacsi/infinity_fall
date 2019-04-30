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
		
		this.caption = document.createElement("span");
		this.caption.append(document.createTextNode("Buy ("));
		this.caption.append(this.price_display);
		this.caption.append(document.createTextNode(")"));

		this.button = document.createElement("div");
		this.button.classList.add('button');
		this.button.id = this.name + '_button';
		this.button.onclick = this.improve.bind(this);
		this.button.append(this.caption);

		this.interactive_area.append(this.button);
		
		// put together
		this.area.append(document.createTextNode(name + " Level: "));
		this.area.append(this.level_display);
		this.area.append(this.interactive_area);
		this.area.append(document.createElement("br"));
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
    {
        'id': 'Time distortion',
        'tier': 'tier1',
        'obj': new Improvement("tier1", "Time distortion", 1, 100000000, 1.25, false, utils.speed_up_time),
        'threshold': 75000000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
	},
	
	// TIER 2
    {
        'id': 'Wings',
		'tier': 'tier2a',
        'obj': new Improvement("tier2a", "Wings", 1, 10, 1.25, clickers['tier2a'], utils.improve),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Scythe',
		'tier': 'tier2a',
        'obj': new Improvement("tier2a", "Scythe", 2, 100, 1.25, clickers['tier2a'], utils.improve),
        'threshold': 75,
        'req_improvements': ['Wings'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Harvest power',
		'tier': 'tier2a',
        'obj': new Improvement("tier2a", "Harvest power", false, 1000, 1.25, clickers['tier2a'], utils.improve),
        'threshold': 750,
        'req_improvements': ['Scythe'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Demon control',
		'tier': 'tier2a',
        'obj': new Improvement("tier2a", "Demon control", 1, 1000000, 1.25, false, clickers['tier2a'], utils.improve),
        'threshold': 7500000,
        'req_improvements': ['Harvest power'],
        'req_generators': ['Demon Overlords'],
        'enabled': 0
	},
    {
        'id': 'Speed up time',
        'tier': 'tier2a',
        'obj': new Improvement("tier2a", "Speed up time", 1, 100000000, 1.25, false, utils.speed_up_time),
        'threshold': 75000000,
        'req_improvements': ['Demon control'],
        'req_generators': [],
        'enabled': 0
    }
]
