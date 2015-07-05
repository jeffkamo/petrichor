var Being = require('./Being');
var Abilities = require('./Ability');


// Characters Class
// ===

function Characters() {
    this.list = {};
}

Characters.prototype = Object.create(Being.prototype);
Characters.prototype.constructor = Characters;


// Class Method: buildCharacterClass()
// ---
//
// This method is responsible for taking the provided character map to build
// the actual Character object.
//
// @param {Object} expects the mapped out character data
// @return {Object}

Characters.prototype.buildCharacterClass = function(map) {

    // The Character classes, added to `this.list` will eventually be called in
    // the `Being.factory()` method call.
    var Character = function Character(options) {
        Being.call(this, {
            name:         options.name         || map.name,
            slug:         options.slug         || map.slug,
            region:       options.region       || map.region,
            description:  options.description  || map.description,
            level:        options.level        || map.level,

            strength:     options.strength     || map.strength,
            intelligence: options.intelligence || map.intelligence,
            vitality:     options.vitality     || map.vitality,
            arcana:       options.arcana       || map.arcana,
            defense:      options.defense      || map.defense,
            mystica:      options.mystica      || map.mystica,

            // abilities:    new Ability.init(abilityRows)
        });
    }.bind(this);

    // Fix the prototype and constructors for all the types of Being classes.
    // Although I bet this is problematic, as this is done for every instance of
    // any of these enemy classes... something's probably going to go wrong.
    Character.prototype = Object.create(Being.prototype);
    Character.prototype.constructor = Character;

    return Character;
}


// Export
// ---

module.exports = Characters;
