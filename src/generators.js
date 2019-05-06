class Generator
{
	constructor(tier, name, productivity, production_cost, price, price_groth_rate) {
		this.tier = tier;
		this.name = name;
		this.level = 0;
		this.price = price;
		this.production_cost = production_cost;
		this.price_groth_rate = price_groth_rate;
		this.productivity = productivity;

		// variables for displaying
		// definition of areas
		this.area = document.createElement("span");
		this.area.id = name;

		this.level_display = document.createElement("span");
		this.level_display.id = this.name + "_level";

		this.productivity_display = document.createElement("span");
		this.productivity_display.id = this.name + "_productivity";

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
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode(resource_names[this.tier] + " per Second: "));
		this.area.append(this.productivity_display);

		this.area.append(this.interactive_area);
		this.area.append(document.createElement("br"));

		// keep producing
        this.set_tick(this, generator_tick_time);
	}

	set_tick(self, interval) {
		self.tick = setInterval(self.produce.bind(self), interval);
	}

	get_price() {
		return Math.floor(this.price * Math.pow(this.price_groth_rate, this.level))
	}

	improve() {
		if(resource[this.tier] >= this.get_price()) {
			console.log(this.name, 'levelled up [', utils.formatWithCommas(this.get_price()), 'cost /', resource[this.tier], 'resource]: ', this.level + 1);
			resource[this.tier] -= this.get_price();
			this.level += 1;
            altogether_productivity[this.tier] += this.productivity;
            if (this.get_cost() > 0) {
                altogether_cost[this.production_cost.tier] += this.get_cost();
            }
			this.renew_display();
		}
	}

	renew_display() {
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = utils.formatWithCommas(this.get_production_value());
		this.price_display.innerHTML = utils.formatWithCommas(this.get_price());
	}

	set_visible() {
		generator_elements[this.tier].append(this.area);
		this.renew_display();
	}

	produce() {
		if (this.has_funds()) {
			this.update_funds();
			resource[this.tier] += this.get_production_value();
			resource_produced[this.tier] += this.get_production_value();
		}

	}

	get_production_value() {
		return this.level * this.productivity;
	}

	has_funds() {
		if (this.production_cost === false) {
			return true;
		}
		else {
			var actual_cost = this.get_production_value() * this.production_cost.value;
			return (resource[this.production_cost.tier] >= actual_cost);
		}
	}

    get_cost() {
        if (this.production_cost === false) {
            return 0;
        }
        var actual_cost = this.get_production_value() * this.production_cost.value;
        return actual_cost;
    }

	update_funds() {
		if (this.production_cost !== false) {
            resource[this.production_cost.tier] -= this.get_cost();
            resource_produced[this.production_cost.tier] -= this.get_cost();
			resource_display[this.production_cost.tier].innerHTML = utils.formatWithCommas(resource[this.production_cost.tier]);
			resources_produced_display[this.production_cost.tier].innerHTML = utils.formatWithCommas(resource_produced[this.production_cost.tier]);
		}
	}
}


var generators = [
    // TIER 1
    {
        'id': 'Echo',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Echo", 1, false, 20, 1.13),
        'threshold': 20,
        'req_improvements': ['Loudspeaker'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Repeater',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Repeater", 10, false, 200, 1.15),
        'threshold': 200,
        'req_improvements': [],
        'req_generators': ['Echo'],
        'enabled': 0
    },
    {
        'id': 'Feedback Loop',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Feedback Loop", 100, false, 2000, 1.17),
        'threshold': 2000,
        'req_improvements': [],
        'req_generators': ['Repeater'],
        'enabled': 0
    },
    {
        'id': 'Delusions',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Delusions", 1000, false, 20000, 1.19),
        'threshold': 20000,
        'req_improvements': [],
        'req_generators': ['Feedback Loop'],
        'enabled': 0
    },
    {
        'id': 'Imaginary Friend',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Imaginary Friend", 10000, false, 200000, 1.27),
        'threshold': 200000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
    },

	// TIER 2a
	{
        'id': 'Imp',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Imp", 1, false, 66, 1.13),
        'threshold': 33,
        'req_improvements': ['Wings'],
        'req_generators': [],
        'enabled': 0
	},
    {
        'id': 'Demon',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Demon", 6, false, 333, 1.15),
        'threshold': 99,
        'req_improvements': ['Scythe'],
        'req_generators': ['Imp'],
        'enabled': 0
    },
    {
        'id': 'Winged demon',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Winged demon", 66, false, 3333, 1.17),
        'threshold': 999,
        'req_improvements': [],
        'req_generators': ['Demon'],
        'enabled': 0
    },
    {
        'id': 'Balrog',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Balrog", 666, false, 6666, 1.19),
        'threshold': 3333,
        'req_improvements': ['Harvest power'],
        'req_generators': ['Winged demon'],
        'enabled': 0
    },
    {
        'id': 'Hell Lords',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Hell Lords", 6666, false, 33333, 1.27),
        'threshold': 20000,
        'req_improvements': [],
        'req_generators': ['Balrog'],
        'enabled': 0
    },
    {
        'id': 'Demon Overlords',
        'tier': 'tier2a',
        'obj': new Generator("tier2a", "Demon Overlords", 66666, false, 666666, 1.27),
        'threshold': 333333,
        'req_improvements': [],
        'req_generators': ['Hell Lords'],
        'enabled': 0
    },

    // TIER 3a
    {
        'id': 'Convince',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Convince power", 1, {'tier': 'tier2a', 'value': 1}, 100, 1.20),
        'threshold': 50,
        'req_improvements': ['Public speech'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Liberate',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Liberate", 2, {'tier': 'tier2a', 'value': 1}, 200, 1.13),
        'threshold': 50,
        'req_improvements': ['Leadership'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Trick',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Trick", 100, {'tier': 'tier2a', 'value': 1.02}, 1000, 1.20),
        'threshold': 700,
        'req_improvements': ['Propaganda'],
        'req_generators': ['Convince'],
        'enabled': 0
    },
    {
        'id': 'Lead',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Lead", 1000, {'tier': 'tier2a', 'value': 1.05}, 5000, 1.21),
        'threshold': 2500,
        'req_improvements': ['Propaganda'],
        'req_generators': ['Convince', 'Trick'],
        'enabled': 0
    },
    {
        'id': 'Command',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Command", 10000, {'tier': 'tier2a', 'value': 1.06}, 50000, 1.23),
        'threshold': 25000,
        'req_improvements': ['Propaganda'],
        'req_generators': ['Convince', 'Trick'],
        'enabled': 0
    },
    {
        'id': 'Force',
        'tier': 'tier3a',
        'obj': new Generator("tier3a", "Force", 100000, {'tier': 'tier2a', 'value': 1.04}, 150000, 1.25),
        'threshold': 75000,
        'req_improvements': ['Propaganda'],
        'req_generators': ['Convince', 'Trick', 'Command'],
        'enabled': 0
    },

    // TIER 2b
    {
        'id': 'Asceticism',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Asceticism", 2, false, 20, 1.25),
        'threshold': 50,
        'req_improvements': ['Whip'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Nailing',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Nailing", 12, false, 200, 1.13),
        'threshold': 50,
        'req_improvements': ['Nails'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Impaling',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Impaling", 42, false, 2000, 1.13),
        'threshold': 1000,
        'req_improvements': ['Stake'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Crusifiction',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Crusifiction", 444, false, 20000, 1.17),
        'threshold': 10000,
        'req_improvements': ['Cross'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Posession',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Posession", 44444, false, 200000, 1.19),
        'threshold': 100000,
        'req_improvements': ['Demons'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Burning',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "Burning", 444444, false, 2000000, 1.13),
        'threshold': 1000000,
        'req_improvements': ['Demons', 'Eternal Fire'],
        'req_generators': ['Posession'],
        'enabled': 0
    },
    {
        'id': 'More Pain',
        'tier': 'tier2b',
        'obj': new Generator("tier2b", "More Pain", 4444444, false, 20000000, 1.19),
        'threshold': 10000000,
        'req_improvements': ['Eternal Fire'],
        'req_generators': ['Burning'],
        'enabled': 0
	},
]
