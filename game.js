var inquirer = require('inquirer');
var Table = require('cli-table');
var CharacterFactory = require('./lib/CharacterFactory');
var Combat = require('./lib/Combat');
var connect = require('./lib/connect');


// The Game
// ===

function Game() {
    this.endProcess = false;
    this.states = {
        'default': 'default',
        'combat' : 'combat'
    };
    this.state = this.states.default;
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
    this.prompt(function(response) {
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

Game.prototype.prompt = function(callback) {
    var p = {
        type: "list",
        name: "input",
        message: 'What do you want to do?',
        choices: this.currentOptions()
    };
    inquirer.prompt([p], callback);
};


// Current Options
// ---

Game.prototype.currentOptions = function() {
    if (this.state == this.states.default) {
        return ['combat', 'characters', 'enemy', 'exit'];
    }

    if (this.state == this.states.combat) {
        return ['offensive', 'defensive', 'secondary', '', 'party', 'enemies', 'exit'];
    }
};


// Process Command
// ---

Game.prototype.processCommand = function(response) {
    console.log('\n');

    if (this.state == this.states.combat) {
        this.combat.processCommands(response);
        return;
    }

    switch (response.input) {
        case 'exit':
            this.endProcess = true;
            break;
        case 'enemy':
            console.log(this.bestiary.manufacture({type: 'plebe'}));
            break;
        case 'characters':
            console.log(this.characters.manufacture({type: 'kamina'}));
            break;
        case 'combat':
            // Instantiate a new Combat
            this.combat = new Combat(this);

            // Add players
            this.combat.addParty(['kamina']);

            // Add enemies
            this.combat.addEnemies(['plebe']);

            // Start!
            this.combat.init();
            break;
        default:
            console.log('No command provided...');
        break;
    }

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
