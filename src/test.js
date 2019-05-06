// TESTING FUNCTIONALITY
function enable_test() {
	utils.getitem(events, 'initial_click', 'id').obj.trigger();
	utils.getitem(events, 'tier1_improvement_unlock', 'id').obj.trigger();
	utils.getitem(events, 'tier1_generator_unlock', 'id').obj.trigger();
	utils.reveal('test');
}

// tier1
var test_tier2_transition_button = document.getElementById('test_tier2_transition');
test_tier2_transition_button.onclick = function() {
	utils.getitem(events, 'tier1_transition_to_tier2', 'id').obj.trigger();
	utils.getitem(events, 'tier2a_improvement_unlock', 'id').obj.trigger();
	utils.getitem(events, 'tier2a_generator_unlock', 'id').obj.trigger();
}

var test_generator = new Generator("tier1", "TEST1", 1, false, 1, 1.0);
var test_db_prod_set_button = document.getElementById('test_db_prod_set');
test_db_prod_set_button.onclick = function() {
	var value = parseInt(document.getElementById('test_db_prod_input').value);
	test_generator.productivity = value;
	test_generator.set_visible();
}

// tier2a
var test_tier3_transition_button = document.getElementById('test_tier3_transition');
test_tier3_transition_button.onclick = function() {
	utils.getitem(events, 'tier2a_tier3a_resource_intro', 'id').obj.trigger();
	utils.getitem(events, 'tier3a_resource_unlock', 'id').obj.trigger();
	utils.getitem(events, 'tier3a_improvements_unlock', 'id').obj.trigger();
	utils.getitem(events, 'tier3a_generators_unlock', 'id').obj.trigger();
}

var test_generator2 = new Generator("tier2a", "TEST2", 1, false, 1, 1.0);
var test_soul_prod_set_button = document.getElementById('test_soul_prod_set');
test_soul_prod_set_button.onclick = function() {
	var value = parseInt(document.getElementById('test_soul_prod_input').value);
	test_generator2.productivity = value;
	test_generator2.set_visible();
}

// tier3a
var test_tier4_transition_button = document.getElementById('test_tier4_transition');
test_tier4_transition_button.onclick = function() {
	utils.getitem(events, 'tier4_unlock', 'id').obj.trigger();
	utils.getitem(events, 'tier4_stats_unlock', 'id').obj.trigger();
}

var test_generator3 = new Generator("tier3a", "TEST3", 1, {'tier': 'tier2a', 'value': 1}, 1, 1.0);
var test_follower_prod_set_button = document.getElementById('test_follower_prod_set');
test_follower_prod_set_button.onclick = function() {
	var value = parseInt(document.getElementById('test_follower_prod_input').value);
	test_generator3.productivity = value;
	test_generator3.set_visible();
}
