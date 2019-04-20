class Generator
{
	constructor(tier, name, productivity, price, price_groth_rate) {
		this.tier = tier;
		this.name = name;
		this.level = 0;
		this.price = price;
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

		this.button = document.createElement("div");
		this.button.classList.add('button');
		this.button.id = this.name + '_button'
		this.button.innerHTML = "Improve";
	    this.button.onclick = this.improve.bind(this);

		// put together
		this.area.append(document.createTextNode(name + " Level: "));
		this.area.append(this.level_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode(resource_names[this.tier] + " per Second: "));
		this.area.append(this.productivity_display);
		this.area.append(document.createElement("br"));

		this.interactive_area.append(document.createTextNode("Improvement Price: "));
		this.interactive_area.append(this.price_display);
		this.interactive_area.append(document.createElement("br"));

		this.interactive_area.append(this.button);
		this.interactive_area.append(document.createElement("br"));
		this.interactive_area.append(document.createElement("br"));

		this.area.append(this.interactive_area);

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
			console.log(this.name, 'levelled up [', this.get_price(), 'cost /', resource[this.tier], 'resource]: ', this.level + 1);
			resource[this.tier] -= this.get_price();
			this.level += 1;
			altogether_productivity[this.tier] += this.productivity;
			this.renew_display();
			// clickers[this.tier].renew_display();
		}
	}

	renew_display() {
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = this.get_production_value();
		this.price_display.innerHTML = this.get_price();
	}

	set_visible() {
		generator_elements[this.tier].append(this.area);
		this.renew_display();
	}

	produce() {
		resource[this.tier] += this.get_production_value();
		resource_produced[this.tier] += this.get_production_value();
	}

	get_production_value() {
		return this.level * this.productivity;
	}
}


var generators = [
    // TIER 1
    {
        'id': 'Echo',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Echo", 1, 20, 1.13),
        'threshold': 20,
        'req_improvements': ['Loudspeaker'],
        'req_generators': [],
        'enabled': 0
    },
    {
        'id': 'Repeater',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Repeater", 10, 200, 1.15),
        'threshold': 200,
        'req_improvements': [],
        'req_generators': ['Echo'],
        'enabled': 0
    },
    {
        'id': 'Feedback Loop',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Feedback Loop", 100, 2000, 1.17),
        'threshold': 2000,
        'req_improvements': [],
        'req_generators': ['Repeater'],
        'enabled': 0
    },
    {
        'id': 'Delusions',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Delusions", 1000, 20000, 1.19),
        'threshold': 20000,
        'req_improvements': [],
        'req_generators': ['Feedback Loop'],
        'enabled': 0
    },
    {
        'id': 'Imaginary Friend',
        'tier': 'tier1',
        'obj': new Generator("tier1", "Imaginary Friend", 10000, 200000, 1.27),
        'threshold': 200000,
        'req_improvements': [],
        'req_generators': ['Delusions'],
        'enabled': 0
    },
    // TIER 2
]