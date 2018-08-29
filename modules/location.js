var Location = {
    // Settings
    items: [],
    // keywords: [],
    movement: [],
    name: null,
    npc: null,
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

var FarmBedroom = Object.create(Location);
var FarmHall = Object.create(Location);

// Farmhouse bedroom - starting location
FarmBedroom.name = 'Farm Bedroom';
FarmBedroom.items = [
    Game.newItemKeyword('backpack', 'backpack'),
    Game.newItemKeyword('jacket', 'jacket'),
    Game.newItemKeyword('window', 'window')
];
FarmBedroom.movement = [Game.newMovementKeyword('door', FarmHall)];
FarmBedroom.visit1 = 'You wake up, cold, groggy from sleep, and find yourself in a bedroom.  You can see your breath as you yawn.  Your jacket is on the floor by your backpack.  There is a large window above the bed and a door in the opposite wall.';
FarmBedroom.visitN = 'You are back in the bedroom where you woke up this morning.  The window is letting in a bright, white light.  There is a door.';

// Farmhouse upstairs hallway
FarmHall.name = 'Farm Hall';
FarmHall.movement = [Game.newMovementKeyword('bedroom', FarmBedroom)];
FarmHall.visit1 = 'You leave the bedroom and find yourself in a hallway at the top of a set of stairs.  There are two other doors.'
FarmHall.visitN = 'You are outside the bedroom where you woke up this morning.  There are two other doors.'