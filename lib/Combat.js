var inquirer = require('inquirer');
var Order = require('./Order');
var roll = new require('chance')();

// Combat
// ===
//
// @param {Object} Expects the Game instance

function Combat(game) {
    this.ACTIONS = {
        'offensive': 'offensive',
        'defensive': 'defensive',
        'secondary': 'secondary', // i.e. "secondary" abilities
        'tertiary': 'tertiary', // swap – character only ability?
        'summon': 'summon' // character only ability?
    };

    this.game = game;
}


// Class Method: init
// ---
//
// @param {Array} Expects a list of character objects
// @param {Array} Expects a list of enemy objects

Combat.prototype.init = function(partyList, enemyList) {
    // Start the Combat executor loop.
    this.game.currentState = this.game.STATES.combat;

    // Start the party and enemy lists to empty
    this.party = [];
    this.opponents = [];

    // Add starting party members
    this.addParty(partyList);

    // Add starting enemies
    this.addEnemies(enemyList);
};


// Class Method: processCommands
// ---
//
// @param {Object} Expects the response from a call to `inquirer.prompt()`

Combat.prototype.processCommands = function(response) {
    console.log('\n');

    // Take in the Player's decision
    switch (response.input) {
        case 'offensive':
        case 'defensive':
        case 'secondary':
            // record that player made this choices
            // this.playerAction = response.input;
            this.pickPlayerCommand(response.input);

            // determine enemy action
            this.pickEnemyCommand();

            // determine initiative
            this.initiative();

            // perform actions in initiative order
            this.fight();

            // cleanup
            //

            // ??
            //

            break;
        case 'party':
            console.log(this.party[0].getHp());
            break;
        case 'enemies':
            console.log(this.opponents);
            break;
        case 'exit':
            this.game.currentState = this.game.STATES.default;
            break;
        default:
            console.log('No command provided...');
        break;
    }

    console.log('\n');
};


// Add Party
// ---
//
// This creates a party of characters and adds them to the combat state.
//
// @param {Array} Expects an array of character slugs

Combat.prototype.addParty = function(characters) {
    for(character in characters) {
        this.party[character] = this.game.characters.manufacture({'type': characters[character]});
    }
};


// Add Enemies
// ---
//
// This creates a group of enemies and adds them to the combat state.
//
// @param {Array} Expects an array of bestiary slugs

Combat.prototype.addEnemies = function(enemies) {
    for(enemy in enemies) {
        this.opponents[enemy] = this.game.bestiary.manufacture({'type': enemies[enemy]});
    }
};


// Class Method: pickPlayerCommand
// ---
//
// @param {String} Expects the name of the action that is to be performed by the
//                 player. The action can be any one of those found
//                 in this.ACTIONS

Combat.prototype.pickPlayerCommand = function(action) {
    for(player in this.party) {
        this.party[player].setAction(action);
    }
};


// Class Method: pickEnemyCommand
// ---

Combat.prototype.pickEnemyCommand = function() {
    var action;
    var enemy;

    for(id in this.opponents) {
        enemy = this.opponents[id];

        // use Chance library to pick the enemy action based on action weight
        action = roll.weighted(
            // list of possible actions
            [this.ACTIONS.offensive, this.ACTIONS.defensive, this.ACTIONS.secondary],
            // the weight that the enemy will have for each type of action
            [enemy.getAggression(), enemy.getConservancy(), enemy.getEagerness()]
        );

        enemy.setAction(action);
    }
};


// Class Method: initiative
// ---
//
// @TODO: refactor this indo Order.js so that the order object can be passed
//        to the individuals performing actions and targets can be more easily
//        pick form the order list.

Combat.prototype.initiative = function() {

    // set up new order instance
    var order = new Order();

    // the order instance get's the party and opponents form the current
    // combat instance
    order.makeTeams(this);

    // Set initiative for each team
    order.setAllInitiatives();

    // sort the lot of ya
    this.order = order.sort();
};


// Class Method: fight
// ---

Combat.prototype.fight = function() {
    var individual;

    for(turn in this.order) {
        individual = this.order[turn];

        console.log(individual.name + " acts: " + individual.getAction().name);

        individual.doAction();

        // check for dead characters?

        // is party dead? Are enemies dead?
    }
};


// Export
// ---

module.exports = Combat;
