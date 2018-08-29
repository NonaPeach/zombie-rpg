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
        console.log('Player init');
        this.hp = 10;
        this.warmth = 3;
        this.setLocation(FarmBedroom);
    },

    wakeUp: function () {
        console.log('Waking up');
        // var game = Game.getGame(),
        //     start = Game.createCurrentText('You wake up.  You should stand.');

        // start = Game.makeKeyword(start, 'stand');
        // game.append(start);
        this.location.enter();
    },

    setLocation: function (loc) {
        this.location = loc;
    }
};