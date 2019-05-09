var Location = {
    // Settings
    items: [],
    movement: [],
    name: null,
    npc: null,
    props: [],
    visited: false,
    visit1: null,
    visitN: null,
    z: {
        alive: null,
        dead: null
    },

    init: function () {
        Game.trace('Location init');
    },

    getText: function () {
        Game.trace('Location.getText()');
        return this.visited ? this.visitN : this.visit1
    },

    enter: function () {
        Game.trace('Location.enter()');
        Game.debug(`Entering ${this.name}`);
        Game.moveCurrentToHistory();
        Game.newCurrent(this);
        Player.setLocation(this);
        this.visited = true;
    }
};
