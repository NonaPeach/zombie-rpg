var Game = {
    // Settings
    debugMode: 2, // 0: none, 1: error, 2: debug, 3: trace

    init: function () {
        console.log(`Debug mode: ${this.debugMode}`);
        this.trace('Game init');

        // Create game and history divs
        var game = $('<div />', { id: 'game' }),
            history = $('<div />', { id: 'history' });
        $('body').append(game);
        game.prepend(history);
    },

    trace: function (msg) {
        if (this.debugMode > 2) {
            console.log(`Trace: ${msg}`);
        }
    },

    debug: function (msg) {
        if (this.debugMode > 1) {
            console.log(`Debug: ${msg}`);
        }
    },

    error: function (msg) {
        if (this.debugMode > 0) {
            console.log(`Error: ${msg}`);
            alert(`Error: ${msg}`);
        }
    },

    getGame: function () {
        this.trace('Game.getGame()');
        return $('#game');
    },

    getCurrent: function () {
        this.trace('Game.getCurrent()');
        return $('#current');
    },

    getHistory: function () {
        this.trace('Game.getHistory()');
        return $('#history');
    },

    createCurrentText: function (text) {
        this.trace('Game.createCurrentText()');
        var newDiv = $('<div />', { id: 'current' }),
            newText = this.createText(text);

        newDiv.append(newText);
        return newDiv;
    },

    createText: function (text) {
        this.trace('Game.createText()');
        return $('<p />', { class: 'text', text: text });
    },

    // Takes a jQuery element and the current location. Removes the original
    // text from the element and replaces it with new p elements for each
    // keyword and each text segment between keywords.
    makeKeywords: function (el, loc) {
        this.trace('Game.makeKeywords()');
        var keys = loc.items.concat(loc.movement);

        if (!keys) {
            this.error(`There are no keys for ${loc.name}`);
        } else {
            var self = this,
                keywords = [],
                textEl = el.find('p:first'),
                text = textEl.text(),
                words = text.split(/[\s,.]+/),
                word,
                keywordEl,
                textFragments = [];

            for (i = 0; i < keys.length; i++) {
                keywords.push(keys[i].keyword);
            }

            // Get the text fragments between keywords
            for (i = 0; i < words.length; i++) {
                if (keywords.includes(words[i])) {
                    var splitText = text.split(words[i]);
                    textFragments.push(splitText[0]);
                    text = splitText[1];

                    // If that's the last keyword, exit loop
                    if (textFragments.length === keywords.length) {
                        textFragments.push(text);
                        break;
                    }
                }
            }

            // Remove the single string of text prior to replacing it
            textEl.remove();

            for (i = 0; i < textFragments.length; i++) {
                var kw = keywords[i];
                el.append(this.createText(textFragments[i]));

                if (kw) {
                    keywordEl = $('<p />', {
                        class: 'text keyword',
                        text: kw
                    });

                    // Find the location keyword that corresponds to what was clicked
                    var clickedLocation = loc.movement.filter(key => {
                            return key.keyword === kw;
                        });

                    // Confirm no more than one keyword was found
                    if (clickedLocation.length > 1) {
                        this.error('Something went wrong.  There are too many locations for the keyword ${kw}.');
                    } else if (clickedLocation.length === 1) {
                        clickedLocation = clickedLocation[0];
                    } else {
                        clickedLocation = null;
                    }

                    // Find the item keyword that corresponds to what was clicked
                    var clickedItem = loc.items.filter(key => {
                        return key.keyword === kw;
                    });

                    // Confirm no more than one keyword was found
                    if (clickedItem.length > 1) {
                        this.error('Something went wrong.  There are too many items for the keyword ${kw}.');
                    } else if (clickedItem.length === 1) {
                        clickedItem = clickedItem[0];
                    } else {
                        clickedItem = null;
                    }

                    if (clickedLocation){
                        keywordEl.click(function () {
                            self.moveCurrentToHistory();
                            clickedLocation.location.enter();
                        });
                    // } else if (clickedItem){
                    //     keywordEl.click(function () {
                    //         self.moveCurrentToHistory();
                    //         clickedLocation.enter();
                    //     });
                    }

                    el.append(keywordEl);
                }
            }
        }
        return el;
    },

    moveCurrentToHistory: function () {
        this.trace('Game.moveCurrentToHistory()');
        var game = this.getGame(),
            history = this.getHistory(),
            current = this.getCurrent();

        current.remove();
        current.removeAttr('id');
        current.off('click');
        history.append(current);
    },

    newCurrent: function (location) {
        this.trace('Game.newCurrent()');
        var game = this.getGame(),
            current = this.createCurrentText(location.getText()),
            keywords = [];
        current = this.makeKeywords(current, location);
        current.attr('id', 'current');
        game.append(current);
    },

    newItemKeyword: function (keyword, item) {
        this.trace('Game.newItemKeyword()');
        return  { keyword, item };
    },

    newMovementKeyword: function (keyword, location) {
        this.trace('Game.newMovementKeyword()');
        return { keyword, location };
    }
};