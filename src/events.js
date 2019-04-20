
class Event {

	constructor(name, conditions, handler, params) {
		this.name = name;
		this.conditions = conditions;
		this.handler = handler;
		this.params=params;
	}

	check() {
		var cond = true;
		this.conditions.forEach( condition => {
			console.log('[Evaluating]', condition.tier, condition.variable, condition.relation, condition.key, condition.value);
			if (condition.tier !== false && condition.tier !== undefined) {
				var variable = window[condition.variable][condition.tier];	
			} else {
				var variable = window[condition.variable];
			}
			var local_cond = false;
			switch(condition.relation) {
				case '==': 
					local_cond = variable == condition.value;
					break;
				case '!=':
					local_cond = variable != condition.value;
					break;
				case '<':
					local_cond = variable < condition.value;
					break;
				case '<=':
					local_cond = variable <= condition.value;
					break;
				case '>':
					local_cond = variable > condition.value;
					break;
				case '>=':
					local_cond = variable >= condition.value;
					break;
				case 'is':
					local_cond = variable === condition.value;
					break;
				case 'is not':
					local_cond = variable !== condition.value;
					break;
				case 'has improvement':
					local_cond = utils.check_preqs([condition.key], []);
					break;
				case 'has generator':
					local_cond = utils.check_preqs([], [condition.key]);
                    break;
                case 'min improvement level':
                    local_cond = utils.getlevel(improvements, condition.key) >= condition.value;
                    break;
                case 'min generator level':
                    local_cond = utils.getlevel(generators, condition.key) >= condition.value;
                    break;
                case 'triggered':
                    local_cond = utils.check_event_triggered([condition.key]);
                    break;
			}
			console.log('[Result]', local_cond);
			cond = cond && local_cond;
		}) 	
		return cond;
	}

	trigger() {
		console.log(this.name, 'event triggered.');
		this.handler.apply(this, this.params);
	}
}


var events = [
    // TIER 0
    {
        'id': 'initial_click',
        'tier': 'tier1',
        'obj': new Event('init click', [{'tier': 'tier1', 'variable': 'resource_produced', 'relation': '>=', 'value': 1}], utils.reveal, ['tier1_interface']),
        'triggered': 0
    },
    // TIER 1
    {
        'id': 'tier1_improvement_unlock',
        'tier': 'tier1',
        'obj': new Event('tier 1 improvements unlock', [{'tier': 'tier1', 'variable': 'resource_produced', 'relation': '>=', 'value': 10}], utils.reveal, ['tier1_improvement_separator']),
        'triggered': 0
    },
    {
        'id': 'tier1_generator_unlock',
        'tier': 'tier1',
        'obj': new Event('tier 1 generator unlock', [{'tier': 'tier1', 'variable': 'resource_produced', 'relation': '>=', 'value': 70}], utils.reveal, ['tier1_generator_separator']),
        'triggered': 0
    },
    {
        'id': 'tier1_delusional_texts',
        'tier': 'tier1',
        'obj': new Event('tier 1 delusional texts', [{'key': 'Delusions', 'relation': 'has generator'}], utils.show_subtitle, ['Hello there!', 3000]),
        'triggered': 0
    },
    {
        'id': 'tier1_misterious_rename',
        'tier': 'tier1',
        'obj': new Event('tier 1 misterious renaming', [{'key': 'Imaginary Friend', 'relation': 'has generator'}, 
                                                        {'key': 'Imaginary Friend', 'relation': 'min generator level', 'value': 5}], utils.change_imaginary_to_misterious, []),
        'triggered': 0
    },
    {
        'id': 'tier1_misterious_eyes',
        'tier': 'tier1',
        'obj': new Event('tier 1 misterious eyes', [{'key': 'tier1_misterious_rename', 'relation': 'triggered'}, 
                                                    {'key': 'Imaginary Friend', 'relation': 'min generator level', 'value': 10,}], utils.add_eyes, []),
        'triggered': 0
    },
    {
        'id': 'tier1_transition_to_tier2_start',
        'tier': 'tier1',
        'obj': new Event('tier1 transition to tier2 start', [{'key': 'tier1_misterious_eyes', 'relation': 'triggered'}], utils.turn_on_sound_progress, [100]),
        'triggered': 0
    }
]