var Player = {
    // Settings
    clothing: {
        boots: false,
        chefHat: false,
        gloves: false,
        heavyCoat: false,
        helmet: false,
        labCoat: false,
        scarf: false,
        socks: false,
        toque: false
    },
    difficulty: null,
    grabbed: false,
    hp: 10,
    kills: 0,
    location: null,
    warmth: 3,

    // Event tracking
    drankBeer: false,
    fixedHeater: false,
    fixedRadio: false,
    metWoman: false,

    init: function () {
        var self = this;
        console.log('Player init');
        self.wakeUp();
    },

    wakeUp: function() {
        console.log('Waking up');
    }
};