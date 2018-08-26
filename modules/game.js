var Game = {
    // Settings

    init: function () {
        console.log('Game init');

        // Create game div
        var game = $('<div />', { id: 'game' })[0];
        $('body').append(game);

        // Create history div
        var history = $('<div />', { id: 'history' })[0];
        game.append(history);
    },

    getGame: function () {
        return $('#game')[0];
    },

    getHistory: function () {
        return $('#history')[0];
    },

    doSomething: function () {
        var game = this.getGame(),
            history = this.getHistory();
    }
};