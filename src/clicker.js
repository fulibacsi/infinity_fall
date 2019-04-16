

class Clicker
{
	constructor(resource_type) {
		this.level = 1;
		this.mute = false;
		this.subtitle = false;
		this.resource = resource_type;
		this.productivity_display = document.getElementById("clicker_productivity");

		this.renew_display();
	}

	click() {
		resource += this.get_production_value();
		resource_produced += this.get_production_value();
		if (!this.mute) {
			sounds.play_random_sound(shouts);
		}
		if (this.subtitle) {
			console.log('A'.repeat(this.level));
			utils.show_subtitle('A'.repeat(this.level));
		}
		renew_resources();
	}

	get_production_value() {
		return this.level;
	}

	improve() {
		this.level += 1;
		this.renew_display();
	}

	renew_display() {
		this.productivity_display.innerHTML = this.get_production_value();
	}
}


class Improvement
{
	constructor(name, maxlevel, price, price_groth_rate, target, effect) {
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

		this.area.append(document.createTextNode("Improvement Price: "));
		this.area.append(this.price_display);
		this.area.append(document.createElement("br"));

		this.area.append(this.button);
		this.area.append(document.createElement("br"));
		this.area.append(document.createElement("br"));
	}

	get_price() {
		return Math.floor(this.price * Math.pow(this.price_groth_rate, this.level));
	}

	improve() {
		if(resource >= this.get_price() && this.not_maxed()) {
			console.log(this.name, 'levelled up [', this.price, 'cost /', resource, 'resource]: ', this.level + 1);
			resource -= this.get_price();
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
			utils.hide(this.price_display.id);
		} else {
			this.level_display.innerHTML = this.level;
			this.price_display.innerHTML = this.get_price();
		}
	}

	set_visible() {
		improvement_elements.append(this.area);
		this.renew_display();
	}

	is_maxed() {
		return (this.maxlevel !== false && this.level == this.maxlevel);
	}

	not_maxed() {
		return (this.maxlevel === false || this.level < this.maxlevel);
	}
}


class Generator
{
	constructor(name, productivity, price, price_groth_rate) {
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

		this.area.append(document.createTextNode("Cookies per Second: "));
		this.area.append(this.productivity_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Improvement Price: "));
		this.area.append(this.price_display);
		this.area.append(document.createElement("br"));

		this.area.append(this.button);
		this.area.append(document.createElement("br"));
		this.area.append(document.createElement("br"));

		// keep producing
        setInterval(this.produce.bind(this), 1000);
	}

	get_price() {
		return Math.floor(this.price * Math.pow(this.price_groth_rate, this.level))
	}

	improve() {
		if(resource >= this.get_price()) {
			console.log(this.name, 'levelled up [', this.price, 'cost /', resource, 'resource]: ', this.level + 1);
			resource -= this.get_price();
			this.level += 1;
			altogether_productivity += this.productivity;
			this.renew_display();
			clicker.renew_display();
		}
	}

	renew_display() {
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = this.get_production_value();
		this.price_display.innerHTML = this.get_price();
	}

	set_visible() {
		generator_elements.append(this.area);
		this.renew_display();
	}

	produce() {
		resource += this.get_production_value();
		resource_produced += this.get_production_value();
	}

	get_production_value() {
		return this.level * this.productivity;
	}
}


function renew_resources() {
	cookies_display.innerHTML = resource;
	cookies_produced_display.innerHTML = resource_produced;

	improvements.forEach(improvement => {
		if(this.resource_produced >= improvement.threshold
		   && improvement.enabled == 0
		   && utils.check_preqs(improvement.req_improvements, improvement.req_generators)) {
			improvement.obj.set_visible();
			improvement.enabled = 1;
		}

		if(resource < improvement.obj.get_price()) {
			utils.disable(improvement.obj.button.id);
		}

		if(resource >= improvement.obj.get_price() && improvement.obj.not_maxed()) {
			utils.enable(improvement.obj.button.id);
		}
	});

	generators.forEach(generator => {
		if(this.resource_produced >= generator.threshold
		   && generator.enabled == 0
		   && utils.check_preqs(generator.req_improvements, generator.req_generators)) {
			generator.obj.set_visible();
			generator.enabled = 1;
		}

		if(resource < generator.obj.get_price()) {
			utils.disable(generator.obj.button.id);
		}

		if(resource >= generator.obj.get_price()) {
			utils.enable(generator.obj.button.id);
		}
	});
}
