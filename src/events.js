
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
			// console.log('[Evaluating]', condition.tier, condition.variable, condition.relation, condition.key, condition.value);
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
                case 'in list':
                    local_cond = utils.in_list(condition.value, variable);
                    break;
			}
			// console.log('[Result]', local_cond);
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
        'obj': new Event('tier 1 improvements unlock', [{'tier': 'tier1', 'variable': 'resource_produced', 'relation': '>=', 'value': 10}], utils.reveal, ['tier1_improvements_box']),
        'triggered': 0
    },
    {
        'id': 'tier1_generator_unlock',
        'tier': 'tier1',
        'obj': new Event('tier 1 generator unlock', [{'tier': 'tier1', 'variable': 'resource_produced', 'relation': '>=', 'value': 70}], utils.reveal, ['tier1_generators_box']),
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
        'obj': new Event('tier1 transition to tier2 start', [{'key': 'tier1_misterious_eyes', 'relation': 'triggered'}], utils.turn_on_sound_progress, [200000000]),
        'triggered': 0
    },
    {
        'id': 'tier1_transition_to_tier2',
        'tier': 'tier1',
        'obj': new Event('tier1 transition to tier2',
                         [{'key': 'tier1_transition_to_tier2_start', 'relation': 'triggered'},
                          {'tier': 'tier1', 'variable': 'resource', 'relation': '>=', 'value': 200000000}],
                         utils.tier1_transition_to_tier2, []),
        'triggered': 0
    },

    // TIER 2a
    {
        'id': 'tier2a_improvement_unlock',
        'tier': 'tier2a',
        'obj': new Event('tier2a improvements unlock', [{'tier': 'tier2a', 'variable': 'resource_produced', 'relation': '>=', 'value': 10}], utils.reveal, ['tier2a_improvements_box']),
        'triggered': 0
    },
    {
        'id': 'tier2a_generator_unlock',
        'tier': 'tier2a',
        'obj': new Event('tier2a generator unlock',
                         [{'key': 'Wings', 'relation': 'has improvement'},
                          {'tier': 'tier2a', 'variable': 'resource_produced', 'relation': '>=', 'value': 33}], utils.reveal, ['tier2a_generators_box']),
        'triggered': 0
    },
    {
        'id': 'tier2a_population_progress_bar',
        'tier': 'tier2a',
        'obj': new Event('tier 2a population progressbar',
                         [{'tier': 'tier2a', 'variable': 'resource_produced', 'relation': '>=', 'value': 100000000}], utils.turn_on_population_progress, [7500000000]),
        'triggered': 0
    },
    {
        'id': 'tier2a_tier3a_resource_intro',
        'tier': 'tier2a',
        'obj': new Event('tier2a tier3a resource intro',
                         [{'key': 'Demon control', 'relation': 'has improvement'},
                          {'key': 'Demon Overlords', 'relation': 'min generator level', 'value': 10}], utils.unlock_tier3a_resource, []),
        'triggered': 0
    },
    // TIER 3a
    {
        'id': 'tier3a_resource_unlock',
        'tier': 'tier2a',
        'obj': new Event('tier3a resource unlock',
                         [{'key': 'tier2a_tier3a_resource_intro', 'relation': 'triggered'}], utils.reveal, ['tier3a_interface']),
        'triggered': 0
    },
    {
        'id': 'tier3a_improvements_unlock',
        'tier': 'tier3a',
        'obj': new Event('tier3a improvement unlock',
                         [{'key': 'tier3a_resource_unlock', 'relation': 'triggered'},
                          {'tier': 'tier3a', 'variable': 'resource_produced', 'relation': '>=', 'value': 10}], utils.reveal, ['tier3a_improvements_box']),
        'triggered': 0
    },
    {
        'id': 'tier3a_generators_unlock',
        'tier': 'tier3a',
        'obj': new Event('tier3a generator unlock',
                         [{'key': 'tier3a_improvements_unlock', 'relation': 'triggered'},
                         {'tier': 'tier3a', 'variable': 'resource_produced', 'relation': '>=', 'value': 60}], utils.reveal, ['tier3a_generators_box']),
        'triggered': 0
    },
    {
        'id': 'tier3a_countdown_unlock',
        'tier': 'tier3a',
        'obj': new Event('tier3a countdown unlock',
                         [{'tier': 'tier2a', 'variable': 'resource_produced', 'relation': '>=', 'value': 3000000000}], utils.tier3a_start_countdown, []),
        'triggered': 0
    },
    {
        'id': 'tier3a_win',
        'tier': 'tier3a',
        'obj': new Event('tier3a win',
                         [{'variable': 'req_balance_time', 'relation': '<=', 'value': 0}], utils.tier3a_win_ending, []),
        'triggered': 0
    },
    {
        'id': 'tier3a_lose',
        'tier': 'tier3a',
        'obj': new Event('tier3a lose',
                         [{'tier': 'tier2a', 'variable': 'resource', 'relation': '>=', 'value': 7500000000}], utils.tier3a_lose_ending, []),
        'triggered': 0
    },
    // TIER 2b
    {
        'id': 'tier2b_improvement_unlock',
        'tier': 'tier2b',
        'obj': new Event('tier2b improvements unlock',
                         [{'tier': 'tier2b', 'variable': 'resource_produced', 'relation': '>=', 'value': 10}], utils.reveal, ['tier2b_improvements_box']),
        'triggered': 0
    },
    {
        'id': 'tier2b_generator_unlock_a',
        'tier': 'tier2b',
        'obj': new Event('tier2b generator unlock',
                         [{'key': 'Whip', 'relation': 'has improvement'},
                          {'tier': 'tier2b', 'variable': 'resource_produced', 'relation': '>=', 'value': 5}], utils.reveal, ['tier2b_generators_box']),
        'triggered': 0
    },
    {
        'id': 'tier2b_generator_unlock_b',
        'tier': 'tier2b',
        'obj': new Event('tier2b generator unlock',
                         [{'key': 'Nails', 'relation': 'has improvement'},
                          {'tier': 'tier2b', 'variable': 'resource_produced', 'relation': '>=', 'value': 50}], utils.reveal, ['tier2b_generators_box']),
        'triggered': 0
    },
    {
        'id': 'tier2b_unlimited_chain_start',
        'tier': 'tier2b',
        'obj': new Event('tier2b unlimited chain start',
                         [{'key': 'Eternal Fire', 'relation': 'has improvement'},
                          {'key': 'More Pain', 'relation': 'has generator'},], utils.add_next_level, [0]),
        'triggered': 0
    },
    {
        'id': 'tier2b_bad_ending_init',
        'tier': 'tier2b',
        'obj': new Event('tier2b bad ending init',
                         [{'tier': 'tier2b', 'relation': '>=', 'variable': 'resource', 'value': 5000000000000}], utils.tier2b_bad_ending_question, []),
        'triggered': 0
    },
    {
        'id': 'ultimate_ending',
        'tier': 'tier2b',
        'obj': new Event('ultimate ending',
                         [{'relation': 'in list', 'variable': 'achievements', 'value': 'devil_good_ending'},
                          {'relation': 'in list', 'variable': 'achievements', 'value': 'devil_bad_ending'},
                          {'relation': 'in list', 'variable': 'achievements', 'value': 'resistance_good_ending'},
                          {'relation': 'in list', 'variable': 'achievements', 'value': 'resistance_bad_ending'},
                          {'relation': 'in list', 'variable': 'achievements', 'value': 'wake_up_ending'},], utils.ultimate_ending, []),
        'triggered': 0
    }
]
