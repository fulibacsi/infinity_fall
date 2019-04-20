

// tiers
var tiers = ['tier1'];

// resources
var resource_names = {
    'tier1': 'dB'
}
var resource = {
    'tier1': 0
};
var resource_produced = {
    'tier1': 0
};
var altogether_productivity = {
    'tier1': 0
};

var resource_display = {
    'tier1': document.getElementById("dBs")
};
var resources_produced_display = {
    'tier1': document.getElementById("dBs_shouted")
};
var altogether_productivity_display = {
    'tier1': document.getElementById("tier1_altogether_productivity")
};

var improvement_elements = {
    'tier1': document.getElementById("tier1_improvements")
};
var generator_elements = {
    'tier1': document.getElementById("tier1_generators")
};


// tick times
var generator_tick_time = 1000;
var logic_tick_time = 500;
var anim_tick_time = 100;