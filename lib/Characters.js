var Being = require('./Being');
var Abilities = require('./Ability');


// Characters Class
// ===

function Characters() {
    this.list = {};
}

Characters.prototype = Object.create(Being.prototype);
Characters.prototype.constructor = Characters;


// Export
// ---

module.exports = Characters;
