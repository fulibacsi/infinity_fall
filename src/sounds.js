var sounds = new function() {

    this.load_sounds = function() {
        var sounds = []
        for (var i = 1; i < 8; i++) {
            sounds.push(new Audio('./assets/sounds/shout_' + i + '.mp3'));
        }
        return sounds
    }

    this.play_random_sound = function(sounds) {
        audio = sounds[utils.randint(0, sounds.length)];
        audio.play();
    }
}
