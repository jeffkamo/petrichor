var Combat = require('./Combat');
var typewriter = require('node-typewriter');

// STATES
// ===

var states = {};
var actions = {};
var commands = {};


// Default
// ---

states.default = 'default';

actions[states.default] = {
    story: 'story',
    combat: 'combat',
    exit:   'exit',
};

commands[states.default] = function(response, game) {
    switch (response.input) {
        case actions.default.story:
            game.currentState = states.story;
            break;
        case actions.default.combat:
            // Instantiate a new Combat
            game.combat = new Combat(game);

            // Initialize a new combat
            game.combat.init(
                ['kamina', 'basch'],
                ['plebe', 'augurKnight']
            );

            break;
        case actions.default.exit:
            game.endProcess = true;
            break;
        default:
            console.log('No command provided...');
        break;
    }
};


// Combat
// ---

states.combat = 'combat';

actions[states.combat] = {
    offensive: 'offensive',
    defensive: 'defensive',
    secondary: 'secondary', // i.e. "secondary" abilities
    tertiary:  'tertiary',  // swap – character only ability?
    summon:    'summon',    // character only ability?
    back:      'back',
};

commands[states.combat] = function(response, game) {
    switch (response.input) {
        case actions.combat.offensive:
        case actions.combat.defensive:
        case actions.combat.secondary:
            // record that player made this choices
            // this.playerAction = response.input;
            game.combat.pickPlayerCommand(response.input);

            // determine enemy action
            game.combat.pickEnemyCommand();

            // determine initiative
            game.combat.initiative();

            // perform actions in initiative order
            game.combat.fight();

            break;
        case actions.combat.party:
            console.log(game.combat.party[0].getHp());
            break;
        case actions.combat.enemies:
            console.log(game.combat.NPCs);
            break;
        case actions.combat.back:
            game.currentState = states.default;
            break;
        default:
            console.log('No command provided...');
        break;
    }
};


// Story
// ===

states.story = 'story'

actions[states.story] = {
    continue: 'continue',
    back: 'back',
};

commands[states.story] = function(response, game) {
    switch (response.input) {
        case actions.story.continue:
            game.skipPrompt = true;

            var currentDialogue = game.script.dialogue.shift();
            var line = currentDialogue.text;
            var speed = currentDialogue.speed || 2000;

            console.log(currentDialogue.name + ':');

            typewriter(line, speed).then(function() {
                console.log('\n');

                game.skipPrompt = false;

                if (game.script.dialogue.length === 0) {
                    // Instantiate a new Combat
                    game.combat = new Combat(game);

                    // Initialize a new combat
                    game.combat.init(
                        ['kamina', 'basch'],
                        ['plebe', 'augurKnight']
                    );
                }

                game.executor();
            });

            break;
        case actions.story.back:
            game.currentState = states.default;
            break;
        default:
            console.log('No command provided...');
        break;
    }
};


// Export All Actions and Commands
// ---

module.exports = {
    STATES: states,
    ACTIONS: actions,
    COMMANDS: commands
};
