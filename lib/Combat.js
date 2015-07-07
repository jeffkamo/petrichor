var inquirer = require('inquirer');

// Combat
// ===
//
// @param {Object} Expects an instance of Game

function Combat(Game) {
    this.game = Game;
}


// Class Method: init
// ---

Combat.prototype.init = function() {
    // Start the Combat executor loop.
    // this.executor();
    this.game.state = this.game.states.combat;
};


// Class Method: processCommands
// ---
//
// @param {Object} Expects the response from a call to `inquirer.prompt()`

Combat.prototype.processCommands = function(response) {
    console.log('\n');

    // Take in the Player's decision
    switch (response.input) {
        case 'exit':
            this.game.state = this.game.states.default;
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
