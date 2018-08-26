var Game = {
    // Settings

    init: function () {
        console.log('Game init');

        // Create game div
        var game = $('<div />', { id: 'game' })[0];
        $('body').append(game);

        // Create history div
        var history = $('<div />', { id: 'history' })[0];
        game.prepend(history);
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
    },

    createTextEl: function (text) {
        return $('<p />', { class: 'text', text: text })[0];
    },

    makeKeyword: function(jqEl, keyword) {
        var textEl = jqEl.find('p:first')[0],
            textFragments = textEl.innerText.split(keyword);
            keywordEl = $('<p />', {
                class: 'text keyword',
                text: keyword
            });

        jqEl.empty();
        jqEl.append(this.createTextEl(textFragments[0]));
        jqEl.append(keywordEl);
        jqEl.append(this.createTextEl(textFragments[1]));
        return jqEl
    }
};