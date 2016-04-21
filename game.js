var inquirer = require('inquirer');
var connect = require('./lib/connect');

var Combat = require('./lib/Combat');
var CharacterFactory = require('./lib/CharacterFactory');

var STATES = require('./lib/states').STATES;
var ACTIONS = require('./lib/states').ACTIONS;
var COMMANDS = require('./lib/states').COMMANDS;


// The Game
// ===

function Game() {
    this.endProcess = false;
    this.STATES = STATES;
    this.ACTIONS = ACTIONS;
    this.COMMANDS = COMMANDS;
    this.currentState = STATES.default;
}


// Help
// ---
//
// Probably a menu that can be pulled up at any time. Lists all the commands
// that can be run at any given time.

Game.prototype.help = function() {
    console.log('Is this the help menu?');
};


// Executor
// ---
//
// The executor is the running process that ensures the game continues to run.
// It's a looped game state that continues to run until the game state
// determines that something happens, at which point "that something" happens!
// Then the loop will continue until the next "something happens".

Game.prototype.executor = function() {
    var p = [{
        type: "list",
        name: "input",
        message: 'What will you do?',
        choices: this.getCommands()
    }];

    inquirer.prompt(p, function(response) {
        this.processCommand(response);

        if (this.endProcess) {
            return false;
            process.exit(0);
        }

        this.executor(); // continue the loop!
    }.bind(this));
};


// Get Commands
// ---
//
// Based on the current game state, get the current list of commands

Game.prototype.getCommands = function() {
    var currentActions = this.ACTIONS[this.currentState];

    return Object.keys(currentActions).map(function(key) {
        return currentActions[key];
    });
};


// Process Command
// ---

Game.prototype.processCommand = function(response) {
    console.log('\n');

    this.COMMANDS[this.currentState](response, this);

    console.log('\n');
};


// Run the Game!
// ---

var game = new Game();

setTimeout(function() {
    game.executor();
    game.abilities = connect('jobAbilities');
    game.characters = new CharacterFactory().init(connect('characters'), game.abilities);
    game.bestiary = new CharacterFactory().init(connect('bestiary'), game.abilities);
}, 2000);
