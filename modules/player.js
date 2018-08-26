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
    inv: [],
    kills: 0,
    location: null,
    warmth: 3,

    // Event tracking
    drankBeer: false,
    fixedHeater: false,
    fixedRadio: false,
    metWoman: false,

    init: function () {
        console.log('Player init');
        this.wakeUp();
    },

    wakeUp: function () {
        console.log('Waking up');
        var game = Game.getGame(),
            start = $('<div />', { id: 'current' }),
            text = Game.createTextEl('You wake up.  You should stand.');
        start.append(text);
        start = Game.makeKeyword(start, 'stand');
        game.append(start[0]);
    }
};