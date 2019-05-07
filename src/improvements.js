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
		this.price_area = document.createElement('span');
		this.price_area.id = this.name + "_price_area";
		this.price_area.append(document.createTextNode("Cost: "));
		this.price_area.append(this.price_display);
		this.price_area.append(document.createTextNode(" " + resource_names[this.tier]));
		this.price_area.append(document.createElement("br"));

		this.caption = document.createElement("span");
		this.caption.id = this.name + '_caption';
		var b = document.createElement('b');
		b.append(document.createTextNode("[" + this.name + "]"));
		this.caption.append(b);
		this.caption.append(document.createElement('br'));
		this.caption.classList.add('hidden');
		utils.hide(this.caption.id);

		this.button = document.createElement("div");
		this.button.classList.add('button');
		this.button.id = this.name + '_button';
		this.button.onclick = this.improve.bind(this);
		this.button.append(document.createTextNode(this.name));
		if (this.maxlevel === false) {
			this.button.append(document.createTextNode(" ("));
			this.button.append(this.level_display);
			this.button.append(document.createTextNode(")"));
		}


		this.interactive_area.append(this.button);
		this.interactive_area.append(document.createElement("br"));

		// put together
		this.area.append(this.caption);
		this.area.append(this.interactive_area);
		this.area.append(this.price_area);
	}

	get_price() {
		return Math.floor(this.price * Math.pow(this.price_groth_rate, this.level));
	}

	improve() {
		if(resource[this.tier] >= this.get_price() && this.not_maxed()) {
			console.log(this.name, 'levelled up [', this.get_price(), 'cost /', resource[this.tier], 'resource]: ', this.level + 1);
			gtag('event', 'click', {
                'event_category': 'Improvement',
                'event_label': this.tier
            });
			resource[this.tier] -= this.get_price();
			this.level += 1;
			this.effect(this.target);
			this.renew_display();
		}

		if (this.is_maxed()) {
			utils.disable(this.button.id);
			utils.hide(this.interactive_area.id);
			utils.hide(this.name + "_price_area");
			utils.reveal(this.caption.id);
		}
	}

	renew_display() {
		if  (this.is_maxed()) {
			utils.hide(this.interactive_area.id);
			utils.hide(this.name + "_price_area");
			utils.reveal(this.caption.id);
		} else {
			this.level_display.innerHTML = this.level;
			this.price_display.innerHTML = utils.formatWithCommas(this.get_price());
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

	reset() {
		this.level = 0;
		utils.hide(this.caption.id);
		utils.enable(this.button.id);
		utils.reveal(this.button);
		utils.reveal(this.interactive_area);
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

	// TIER 2a
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
        'obj': new Improvement("tier2a", "Demon control", 1, 1000000, 1.25, clickers['tier2a'], utils.improve),
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
	},

	// TIER 3a
	{
        'id': 'Summoning Ritual',
        'tier': 'tier3a',
        'obj': new Improvement("tier3a", "Summoning Ritual", false, 50, 1.25, clickers['tier3a'], utils.improve),
        'threshold': 0,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Book of Portal',
        'tier': 'tier3a',
        'obj': new Improvement("tier3a", "Book of Portal", false, 150, 1.20, clickers['tier3a'], utils.improve),
        'threshold': 0,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Book of Birth',
        'tier': 'tier3a',
        'obj': new Improvement("tier3a", "Book of Birth", false, 500, 1.15, clickers['tier3a'], utils.improve),
        'threshold': 0,
        'req_improvements': ['Summoning Ritual', 'Book of Portal'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Portal Enhancer',
        'tier': 'tier3a',
        'obj': new Improvement("tier3a", "Portal Enhancer", false, 1500, 1.25, clickers['tier3a'], utils.improve),
        'threshold': 0,
        'req_improvements': ['Book of Portal'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Book of Command',
        'tier': 'tier3a',
        'obj': new Improvement("tier3a", "Book of Command", 1, 150000, 1.25, clickers['tier3a'], utils.improve),
        'threshold': 0,
        'req_improvements': ['Book of Portal', 'Book of Birth'],
        'req_generators': [],
        'enabled': 0
	},

	// TIER 2b
	{
        'id': 'Whip',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Whip", 2, 50, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Nails',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Nails", false, 20, 1.13, clickers['tier2b'], utils.improve),
        'threshold': 10,
        'req_improvements': [],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Stake',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Stake", 1, 400, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 200,
        'req_improvements': ['Whip'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Cross',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Cross", 1, 4000, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 2000,
        'req_improvements': ['Stake', 'Nails'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Demons',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Demons", false, 40000, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 20000,
        'req_improvements': ['Cross'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Eternal Fire',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Eternal Fire", 1, 1000000, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 200000,
        'req_improvements': ['Demons'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Painful Device',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Painful Device", 1, 10000000, 1.25, clickers['tier2b'], utils.improve),
        'threshold': 2000000,
        'req_improvements': ['Eternal Fire'],
        'req_generators': [],
        'enabled': 0
	},
	{
        'id': 'Salvation',
		'tier': 'tier2b',
        'obj': new Improvement("tier2b", "Salvation", 1, 1000000000000000, 1.25, false, utils.tier2b_win_ending),
        'threshold': 2000000000000,
        'req_improvements': ['Eternal Fire'],
        'req_generators': [],
        'enabled': 0
	},
]
