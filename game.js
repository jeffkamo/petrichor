var inquirer = require('inquirer');
var Table = require('cli-table');
var Bestiary = require('./lib/bestiary');
var connect = require('./lib/connect');
// var utils = require('./utils');

var bestiary;
var enemyFactory;


// The Game
// ===

function Game() {
    this.party = {};
    this.inventory = {};
    this.endProcess = false;
    this.enemies = [];
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
    this.prompt(' ', function(response) {
        this.processCommand(response);

        if (this.endProcess) {
            return false;
            process.exit(0);
        }

        this.executor(); // continue the loop!
    }.bind(this));
};


// Prompt
// ---
//
// This is the standard game prompt.

Game.prototype.prompt = function(text, callback) {
  var p = {
    type: "input",
    name: "input",
    message: text ? text : 'Something went wrong... missing text for this prompt?'
  };
  inquirer.prompt([p], callback);
};


// Process Command
// ---

Game.prototype.processCommand = function(response) {
    console.log('\n');

    switch (response.input) {
        case 'exit':
            this.endProcess = true;
            break;
        case 'help':
            console.log('Here\'s your help list!');
            break;
        case 'inventory':
            console.log('Here\'s your inventory!');
            break;
        case 'enemy':
            console.log(bestiary.factory({type: 'plebe'}));
            break;
        default:
            console.log('No command provided...');
        break;
    }

    console.log('\n');
};


// Run the Game!
// ---

game = new Game();

setTimeout(function() {
    game.executor();
    bestiary = new Bestiary().init(connect('bestiary'));
}, 1000);
