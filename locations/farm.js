var FarmBedroom = Object.create(Location);
var FarmHall = Object.create(Location);
var FarmMaster = Object.create(Location);

// Farmhouse bedroom - starting location
FarmBedroom.name = 'Farmhouse Bedroom';
FarmBedroom.items = [
    Game.newItemKeyword('backpack', 'backpack'),
    Game.newItemKeyword('jacket', 'jacket')
];
FarmBedroom.props = [Game.newPropKeyword('window', BedroomWindow)];
FarmBedroom.movement = [Game.newMovementKeyword('door', FarmHall)];
FarmBedroom.visit1 = 'You wake up, cold and groggy from sleep, and find yourself in a bedroom.  You can see your breath as you yawn.  Your jacket is on the floor by your backpack.  There is a large window above the bed and a door in the opposite wall.';
FarmBedroom.visitN = 'You are back in the bedroom where you woke up this morning.  The window is letting in the bright, white light.  There is a door.';

// Farmhouse upstairs hallway
FarmHall.name = 'Farmhouse Hallway';
FarmHall.props = [Game.newPropKeyword('door', FarmLockedBedroom)];
FarmHall.movement = [
    Game.newMovementKeyword('bedroom', FarmBedroom),
    Game.newMovementKeyword('other', FarmMaster)
];
FarmHall.visit1 = 'You exit the bedroom into a hallway at the top of a set of **stairs**.  You pause, listening for a sign that the owners are home.  You hear nothing.  The **bathroom** is across the hall.  Another door is next to the room you woke up in.  The other, you assume, belongs to your hosts.';
FarmHall.visitN = 'You are outside the bedroom where you woke up this morning.  There is a **bathroom** here.  The door next to your room is firmly shut, but the other one at the end of the hall is not.';

// Farmhouse master bedroom
FarmMaster.name = 'Farmhouse Master Bedroom';
FarmMaster.props = [Game.newPropKeyword('bed', FarmMasterBed)];
FarmMaster.movement = [Game.newMovementKeyword('hall', FarmHall)];
FarmMaster.visit1 = 'You knock on the closed door, but there is no answer.  You nudge the door, and it opens with a squeak.  A double bed against the far wall takes up most of the space in this small room.  The curtains are drawn shut, but some light is coming in from the hall.';
FarmMaster.visitN = 'You are back in the master bedroom at the end of the hall.';
