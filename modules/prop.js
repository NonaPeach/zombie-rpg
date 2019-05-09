var Prop = {
    // Settings
    desc: null,

    init: function () {
        Game.trace('Prop init');
    },

    getDesc: function () {
        return '<br><br>' + this.desc;
    },

    view: function () {
        Game.trace('Prop.view()');
        var current = Game.getCurrent(),
            propEl = Game.createText(this.getDesc());
        current.append(propEl);
    }
};

var BedroomWindow = Object.create(Prop);
// FarmBedroom
BedroomWindow.desc = 'Your warm breath fogs the dingy glass as you gaze out at the world below. It looks as though a thick blanket of snow settled over the land while you slept.  The sky is a solid sheet of gray threatening to unload even more snow at any moment.  An empty field stretches away from the farmhouse, the very field you stumbled through last night as you walked toward the light of the farmhouse.  There is something large on the far side of the field, but you cannot tell what it is due to the distance and the snow cover.';

// FarmHall
var FarmLockedBedroom = Object.create(Prop);
FarmLockedBedroom.desc = 'You reach out and grab the doorknob, but it does not turn.  You do not recall the farmer and his wife mentioning there was anyone else living here.  Perhaps they keep this door locked.';

// FarmMaster
var FarmMasterBed = Object.create(Prop);
FarmMasterBed.desc = 'It looks well used.  The brass bedframe is scratched and dull.  You swear you can see impressions in the mattress made by the farmer and his wife, even though the thick flannel blankets.  You kneel and peek under the bed.  The dust has been disturbed recently, as if something stored under the bed had been dragged out.';
