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
    hp: 0,
    inv: [],
    kills: 0,
    location: null,
    warmth: 0,

    // Event tracking
    drankBeer: false,
    fixedHeater: false,
    fixedRadio: false,
    metWoman: false,

    init: function () {
        Game.trace('Player init');
        this.hp = 10;
        this.warmth = 3;
        this.setLocation(FarmBedroom);
    },

    wakeUp: function () {
        Game.trace('Player.wakeUp()');
        this.location.enter();
    },

    setLocation: function (loc) {
        Game.trace('Player.setLocation()');
        this.location = loc;
    }
};