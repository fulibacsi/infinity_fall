// main loop
function main_loop() {
	tiers.forEach(name => {
		resource_display[name].innerHTML = resource[name];
		resources_produced_display[name].innerHTML = resource_produced[name];
		altogether_productivity_display[name].innerHTML = altogether_productivity[name];
	})
	
	events.forEach(event => {
		if (event.triggered == 0) {
			console.log('Checking', event.id);
			if (event.obj.check()) {
				event.obj.trigger();
				event.triggered = 1;
			}
		}
	})

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
}

// click event
function clicked(e){
    e.preventDefault();
    clickers['tier1'].click();
}
fallingman_canvas.addEventListener("click", clicked, false);


// main loop
main_loop_ticker = setInterval(main_loop, logic_tick_time);
// animation loops
animation_tickers = {
    'tier1': setInterval(animations.flip, anim_tick_time, 
                         fallingman_canvas, fallingman_context,
                         fallingman_image_list, fallingman_text_list),
}
