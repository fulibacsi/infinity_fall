

// tiers
var tiers = ['tier1', 'tier2a', 'tier3a']; // , tier2b', 'tier3b'];

// resources
var resource_names = {
    'tier1': 'dB',
    'tier2a': 'soul',
    'tier2b': 'pain',
    'tier3a': 'follower',
    'tier3b': 'follower',
}
var resource = {
    'tier1': 0,
    'tier2a': 0,
    'tier2b': 0,
    'tier3a': 0,
    'tier3b': 0,
};
var resource_produced = {
    'tier1': 0,
    'tier2a': 0,
    'tier2b': 0,
    'tier3a': 0,
    'tier3b': 0,
};
var altogether_productivity = {
    'tier1': 0,
    'tier2a': 0,
    'tier2b': 0,
    'tier3a': 0,
    'tier3b': 0,
};
var altogether_cost = {
    'tier2a': 0,
    'tier3a': 0
}


var resource_display = {
    'tier1': document.getElementById("dBs"),
    'tier2a': document.getElementById("souls"),
    // 'tier2b': document.getElementById("pain"),
    'tier3a': document.getElementById("summoned_followers"),
    // 'tier3b': document.getElementById("followers")
};
var resources_produced_display = {
    'tier1': document.getElementById("dBs_shouted"),
    'tier2a': document.getElementById("souls_collected"),
    // 'tier2b': document.getElementById("pain_suffered"),
    'tier3a': document.getElementById("followers_summoned"),
    // 'tier3b': document.getElementById("followers_gathered"),
};
var altogether_productivity_display = {
    'tier1': document.getElementById("tier1_altogether_productivity"),
    'tier2a': document.getElementById("tier2a_altogether_productivity"),
    // 'tier2b': document.getElementById("tier2b_altogether_productivity"),
    'tier3a': document.getElementById("tier3a_altogether_productivity"),
    // 'tier3b': document.getElementById("tier3b_altogether_productivity")
};
var altogether_cost_display = {
    'tier2a': document.getElementById("tier3a_soul_cost"),
    // 'tier3a': document.getElementById("tier4_follower_cost"),
}


var improvement_elements = {
    'tier1': document.getElementById("tier1_improvements"),
    'tier2a': document.getElementById("tier2a_improvements"),
    // 'tier2b': document.getElementById("tier2b_improvements"),
    'tier3a': document.getElementById("tier3a_improvements"),
    // 'tier3b': document.getElementById("tier3b_improvements")
};
var generator_elements = {
    'tier1': document.getElementById("tier1_generators"),
    'tier2a': document.getElementById("tier2a_generators"),
    // 'tier2b': document.getElementById("tier2b_generators"),
    'tier3a': document.getElementById("tier3a_generators")
    // 'tier3b': document.getElementById("tier3b_generators")
};


// achievements
var achievements = [];
utils.load();


// tick times
var generator_tick_time = 1000;
var logic_tick_time = 500;
var anim_tick_time = 100;


// final time resource for devil story branch 10 minutes * 60 / logic_tick_time
var req_balance_time = 10 * 60 * 2;
var timer_display = document.getElementById('time_req');
