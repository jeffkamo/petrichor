var inquirer = require('inquirer');
var Order = require('./Order');
var roll = new require('chance')();


// Combat
// ===
//
// @param {Object} Expects the Game instance

function Combat(game) {
    this.game = game;
    this.STATES = this.game.STATES;
    this.ACTIONS = this.game.ACTIONS;
}


// Class Method: init
// ---
//
// @param {Array} Expects a list of character objects
// @param {Array} Expects a list of enemy objects

Combat.prototype.init = function(partyList, enemyList) {
    // Start the Combat executor loop.
    this.game.currentState = this.STATES.combat;

    // Start the party and enemy lists to empty
    this.party = [];
    this.NPCs = [];

    // Add starting party members
    this.addParty(partyList);

    // Add starting enemies
    this.addEnemies(enemyList);
};


// Add Party
// ---
//
// This creates a party of characters and adds them to the combat state.
//
// @param {Array} Expects an array of character slugs

Combat.prototype.addParty = function(characters) {
    for(character in characters) {
        this.party[character] = this.game.characters.manufacture({
            'type': characters[character]
        });

        this.party[character].setAllegiences({
            'allies': this.party,
            'opponents': this.NPCs,
        });
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
        this.NPCs[enemy] = this.game.bestiary.manufacture({
            'type': enemies[enemy]
        });

        this.NPCs[enemy].setAllegiences({
            'allies': this.NPCs,
            'opponents': this.party,
        });
    }
};


// Class Method: pickPlayerCommand
// ---
//
// @param {String} Expects the name of the action that is to be performed by the
//                 player. The action can be any one of those found
//                 in ACTIONS

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

    for(id in this.NPCs) {
        enemy = this.NPCs[id];

        // use Chance library to pick the enemy action based on action weight
        action = roll.weighted(
            // list of possible actions
            [this.ACTIONS.combat.offensive, this.ACTIONS.combat.defensive, this.ACTIONS.combat.secondary],
            // the weight that the enemy will have for each type of action
            [enemy.getAggression(), enemy.getConservancy(), enemy.getEagerness()]
        );

        enemy.setDirective(action);
    }
};


// Class Method: initiative
// ---

Combat.prototype.initiative = function() {

    // set up new order instance
    var order = new Order();

    // the order instance get's the party and NPCs form the current
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

        if (individual.isDead || this.game.currentState === this.STATES.default) {
            continue;
        }

        individual.doAction(this);

        this.cleanup();
    }
};


// Class Method: cleanup
// ---

Combat.prototype.cleanup = function() {
    var individual;

    for(turn in this.order) {
        individual = this.order[turn];

        if (individual.getCurrentHp() <= 0) {
            // Remove dead beings from allegiences
            individual.kill();
        }

        if (this.teamIsDead('party')) {
            console.log('GAME OVER: The Party Died');
            this.game.currentState = this.STATES.default;
            return;
        }

        if (this.teamIsDead('NPCs')) {
            console.log('Congratulations, You Win!');
            this.game.currentState = this.STATES.default;
            return;
        }
    }
};


// Class Method: partyIsDead
// ---

Combat.prototype.teamIsDead = function(team) {
    var numberOfDead = this[team].filter(function(currentIndiv) {
        return currentIndiv.isDead;
    }).length;

    return numberOfDead === this[team].length;
};


// Export
// ---

module.exports = Combat;
