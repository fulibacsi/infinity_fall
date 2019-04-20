class Clicker
{
	constructor(tier) {
		this.tier = tier;
		this.level = 1;
		this.mute = false;
		this.subtitle = false;
		this.productivity_display = document.getElementById(this.tier + "_clicker_productivity");

		this.renew_display();
	}

	click() {
		resource[this.tier] += this.get_production_value();
		resource_produced[this.tier] += this.get_production_value();
		if (!this.mute) {
			sounds.play_random_sound(shouts);
		}
		if (this.subtitle) {
			console.log('A'.repeat(this.level));
			utils.show_subtitle('A'.repeat(this.level));
		}
		this.renew_display();
	}

	get_production_value() {
		return this.level;
	}

	improve() {
		this.level += 1;
		this.renew_display();
	}

	renew_display() {
        resource_display[this.tier].innerHTML = resource[this.tier];
		resources_produced_display[this.tier].innerHTML = resource_produced[this.tier];
		this.productivity_display.innerHTML = this.get_production_value();
	}
}

var clickers = {
    'tier1': new Clicker('tier1')
};