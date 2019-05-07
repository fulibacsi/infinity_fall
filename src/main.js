// main loop
function main_loop() {
	// resource update
	tiers.forEach(name => {
		resource_display[name].innerHTML = utils.formatWithCommas(resource[name]);
		resources_produced_display[name].innerHTML = utils.formatWithCommas(resource_produced[name]);
		altogether_productivity_display[name].innerHTML = utils.formatWithCommas(altogether_productivity[name]);
		if (altogether_cost_display.hasOwnProperty(name)) {
			altogether_cost_display[name].innerHTML = utils.formatWithCommas(altogether_cost[name]);
		}
	});

	// events
	events.forEach(event => {
		if (event.triggered == 0) {
			// console.log('Checking', event.id);
			if (event.obj.check()) {
				event.obj.trigger();
				event.triggered = 1;
			}
		}
	});

	// improvements
	improvements.forEach(improvement => {
		if(this.resource_produced[improvement.tier] >= improvement.threshold
		   && improvement.enabled == 0
		   && utils.check_preqs(improvement.req_improvements, improvement.req_generators)) {
			improvement.obj.set_visible();
			improvement.enabled = 1;
		}

		if(resource[improvement.tier] < improvement.obj.get_price()) {
			utils.disable(improvement.obj.button.id);
		}

		if(resource[improvement.tier] >= improvement.obj.get_price() && improvement.obj.not_maxed()) {
			utils.enable(improvement.obj.button.id);
		}
	});

    // generators
	generators.forEach(generator => {
		if(this.resource_produced[generator.tier] >= generator.threshold
		   && generator.enabled == 0
		   && utils.check_preqs(generator.req_improvements, generator.req_generators)) {
			generator.obj.set_visible();
			generator.enabled = 1;
		}

		if(resource[generator.tier] < generator.obj.get_price()) {
			utils.disable(generator.obj.button.id);
		}

		if(resource[generator.tier] >= generator.obj.get_price()) {
			utils.enable(generator.obj.button.id);
		}
	});

	// checking balance
	if (resource['tier2a'] > 3000000000 && resource['tier2a'] < 4500000000) {
		req_balance_time--;
		var real_balance_seconds = Math.floor(req_balance_time / 2);
		timer_display.innerHTML = utils.format_time(real_balance_seconds);
	}
}

// click event
function clicked(e){
	e.preventDefault();
	var tier = e.target.getAttribute('tier');
	clickers[tier].click();
}
fallingman_canvas.addEventListener("click", clicked);


// main loop
var main_loop_ticker = setInterval(main_loop, logic_tick_time);
// animation loops
var animation_tickers = {
    'tier1': setInterval(animations.flip, anim_tick_time,
                         fallingman_canvas, fallingman_context,
                         fallingman_image_list, fallingman_text_list),
}
