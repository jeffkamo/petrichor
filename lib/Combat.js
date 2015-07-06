var inquirer = require('inquirer');

// Combat
// ===
//
// @param {Object} Expects an instance of Game

function Combat(Game) {
    this.endProcess = false;
    this.game = Game;
}


// Class Method: init
// ---

Combat.prototype.init = function() {
    // Start the Combat executor loop.
    this.executor();
};


// Class Method: executor
// ---
//
// The executor is the running process that ensures the combat continues to run.
// It's a looped game state that continues to run until the game state
// determines that something happens, at which point "that something" happens!
// Then the loop will continue until the next "something happens" or until it is
// told to end.

Combat.prototype.executor = function() {
    this.prompt(function(response) {
        this.processCommand(response);

        if (this.endProcess) {
            this.game.executor();
            return false;
            process.exit(0);
        }

        this.executor(); // continue the loop!
    }.bind(this));
};


// Class Method: prompt
// ---
//
// @param {Function}

Combat.prototype.prompt = function(callback) {
    var p = {
        type: "list",
        name: "input",
        message: "What will you do?",
        choices: ['offensive', 'defensive', 'secondary', 'exit']
    };

    inquirer.prompt([p], callback);
};


// Class Method: processCommands
// ---
//
// @param {Object} Expects the response from a call to `inquirer.prompt()`

Combat.prototype.processCommand = function(response) {
    console.log('\n');

    // Take in the Player's decision
    switch (response.input) {
        case 'exit':
            this.endProcess = true;
            break;
        case 'offensive':
            console.log('Go on the offensive!');
            break;
        case 'defensive':
            console.log('Defend!');
            break;
        case 'secondary':
            console.log('Perform secondary!!');
            break;
        default:
            console.log('No command provided...');
        break;
    }

    // Make the enemy's decision(s)
    // ...

    console.log('\n');
};


// Export
// ---

module.exports = Combat;
