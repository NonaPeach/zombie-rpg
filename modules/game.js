var Game = {
    // Settings

    init: function () {
        console.log('Game init');

        // Create game div
        var game = $('<div />', { id: 'game' });
        $('body').append(game);

        // Create history div
        var history = $('<div />', { id: 'history' });
        game.prepend(history);
    },

    getGame: function () {
        return $('#game');
    },

    getCurrent: function () {
        return $('#current');
    },

    getHistory: function () {
        return $('#history');
    },

    createCurrentText: function (text) {
        var newDiv = $('<div />', { id: 'current' }),
            newText = this.createTextEl(text);

        newDiv.append(newText);
        return newDiv;
    },

    createTextEl: function (text) {
        return $('<p />', { class: 'text', text: text });
    },

    // Takes a jQuery element and the word to make into a link.
    // Removes the original text from the element and replaces
    // it with new p elements containing the text and keyword.
    makeKeyword: function (el, keyword) {
        var self = this,
            textEl = el.find('p:first'),
            textFragments = textEl.text().split(keyword);
            keywordEl = $('<p />', {
                class: 'text keyword',
                text: keyword
            });

        keywordEl.click(function () {
            self.moveCurrentToHistory();
            self.newCurrent();
        });

        textEl.remove();
        el.append(this.createTextEl(textFragments[0]));
        el.append(keywordEl);
        el.append(this.createTextEl(textFragments[1]));
        return el
    },

    moveCurrentToHistory: function () {
        var game = this.getGame(),
            history = this.getHistory(),
            current = this.getCurrent();

        current.remove();
        current.removeAttr('id');
        current.off('click');
        history.append(current);
    },

    newCurrent: function () {
        var game = this.getGame(),
            newThing = this.createCurrentText('You are standing in a bedroom.');

        newThing = this.makeKeyword(newThing, 'bedroom');
        newThing.attr('id', 'current');
        game.append(newThing);
    }
};