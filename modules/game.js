var Game = {
    // Settings
    debugMode: 2, // 0: none, 1: error, 2: debug, 3: trace
    locations: {},

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
        return $('<p />', { class: 'text', text });
    },

    // Takes a jQuery element and the current location. Removes the original
    // text from the element and replaces it with new p elements for each
    // keyword and each text segment between keywords.
    makeKeywords: function (el, loc) {
        this.trace('Game.makeKeywords()');
        var keys = loc.items
                .concat(loc.movement)
                .concat(loc.props);

        if (!keys) {
            this.error(`There are no keys for ${loc.name}`);
        } else {
            var self = this,
                keywords = [],
                foundKeywords = [],
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
                    foundKeywords.push(words[i]);
                    var splitText = text.split(words[i]);
                    textFragments.push(splitText[0]);
                    text = splitText[1];
                }
            }

            // If keywords were found, add the last piece of text
            // Should always occur, but check just in case
            if (foundKeywords.length > 0) {
                textFragments.push(text);
            }

            // Remove the single string of text prior to replacing it
            textEl.remove();

            // Loop through each piece of text including keywords
            for (i = 0; i < textFragments.length; i++) {
                var kw = foundKeywords[i];
                el.append(this.createText(textFragments[i]));

                if (kw) {
                    var keywordEl,
                        findKeyword = function (key, type) {
                            var keysList = type === 'movement' ? loc.movement : (  // if movement
                                    type === 'prop' ? loc.props : (  // else if prop
                                        type === 'item' ? loc.items : null  // else if item, else null
                                    )
                                ),
                                found = keysList.filter(k => {
                                    return k.keyword === kw;
                                });

                            if (found.length > 1) {
                                this.error(`Something went wrong.  There are too many keywords called ${key}.`);
                            } else if (found.length === 1) {
                                found = found[0];
                            } else {
                                found = null;
                            }

                            return found;
                        }

                    var foundMovement = findKeyword(kw, 'movement'),
                        foundProp = findKeyword(kw, 'prop'),
                        foundItem = findKeyword(kw, 'item');

                    // Create the keyword element
                    keywordEl = $('<button />', {
                        class: 'text keyword',
                        text: kw
                    });

                    if (foundMovement) {
                        keywordEl[0].id = foundMovement.location.name;  // [0] gets the button itself
                        keywordEl[0].onclick = function () {
                            self.moveCurrentToHistory();
                            Game.locations[this.id].enter();
                        };
                    } else if (foundProp) {
                        // keywordEl.attr('id', foundProp.prop.name);
                        keywordEl.click(foundProp.prop.view);
                    // } else if (foundItem){
                    //    keywordEl.attr('id', foundItem.item.name);
                    //     keywordEl.click(function () {
                    //         self.moveCurrentToHistory();
                    //         foundItem.item.pickUp();
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
        current.addClass('historyDiv');
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
        return { keyword, item };
    },

    newPropKeyword: function (keyword, prop) {
        this.trace('Game.newPropKeyword()');
        return { keyword, prop };
    },

    newMovementKeyword: function (keyword, location) {
        this.trace('Game.newMovementKeyword()');
        return { keyword, location };
    }
};
