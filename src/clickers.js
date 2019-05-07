class Clicker
{
	constructor(tier, multiplier=1.0, cost=false, mute=true, subtitle=false) {
		this.tier = tier;
        this.level = 1;
        this.multiplier = multiplier;
		this.cost = cost;
		this.mute = mute;
		this.subtitle = subtitle;
		this.productivity_display = document.getElementById(this.tier + "_clicker_productivity");

		this.renew_display();
	}

	click() {
		if (this.has_funds()) {
            ga('send', 'event', 'Clicker', 'click', this.tier, 1);
			this.update_funds();
			resource[this.tier] += this.get_production_value();
			resource_produced[this.tier] += this.get_production_value();
			if (!this.mute) {
				sounds.play_random_sound(shouts);
			}
			if (this.subtitle) {
				console.log('A'.repeat(this.level));
				utils.show_subtitle('A'.repeat(this.level));
			}
	    }
		this.renew_display();
	}

	has_funds() {
		if (this.cost === false) return true;
		else return (resource[this.cost.tier] >= this.cost.value);
	}

	update_funds() {
		if (this.cost !== false) {
			resource[this.cost.tier] -= this.cost.value;
			resource_display[this.cost.tier].innerHTML = utils.formatWithCommas(resource[this.cost.tier]);
			resources_produced_display[this.cost.tier].innerHTML = utils.formatWithCommas(resource_produced[this.cost.tier]);
		}
	}

	get_production_value() {
		return this.multiplier * this.level;
	}

	improve() {
		this.level += 1;
		this.renew_display();
	}

	renew_display() {
        resource_display[this.tier].innerHTML = utils.formatWithCommas(resource[this.tier]);
        resources_produced_display[this.tier].innerHTML = utils.formatWithCommas(resource_produced[this.tier]);
        this.productivity_display.innerHTML = utils.formatWithCommas(this.get_production_value());
	}
}

var clickers = {
	'tier1':  new Clicker('tier1', 1.0, false, false, false), // shouts
	'tier2a': new Clicker('tier2a', 1.0, false, true, false), // souls
    'tier3a': new Clicker('tier3a', 1.0, {'tier': 'tier2a', 'value': 1}, true, false), // summoned minions
    'tier2b': new Clicker('tier2b', 1.0, false, true, false), // souls
};
