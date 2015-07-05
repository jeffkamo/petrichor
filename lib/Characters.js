var Being = require('./Being');
var Abilities = require('./Ability');

function Characters() {
    this.list = {};
}

Characters.prototype.factory = function(options) {
    var characterClass = this.list[options.type];

    if (characterClass == null) {
        return false;
    }

    return new characterClass(options);
};

Characters.prototype.init = function(characterRows, abilityRows) {
    var self = this;

    for (var currentRow in characterRows) {

        // Skip the first row, it's just a set of labels
        if (currentRow > 1) {

            // Build a class for the new creature in a closure to ensure
            // the new class variable is created fresh after each iteration.
            (function() {
                var name =         characterRows[currentRow]['1'];
                var slug =         characterRows[currentRow]['2'];
                var region =       characterRows[currentRow]['3'];
                var description =  characterRows[currentRow]['4'];
                var level =        characterRows[currentRow]['5'];
                var strength =     characterRows[currentRow]['7'];
                var intelligence = characterRows[currentRow]['8'];
                var vitality =     characterRows[currentRow]['9'];
                var arcana =       characterRows[currentRow]['10'];
                var defense =      characterRows[currentRow]['11'];
                var mystica =      characterRows[currentRow]['12'];

                var Character = function Character(options) {
                    Being.call(this, {
                        name:         options.name         || name,
                        slug:         options.slug         || slug,
                        region:       options.region       || region,
                        description:  options.description  || description,
                        level:        options.level        || level,

                        strength:     options.strength     || strength,
                        intelligence: options.intelligence || intelligence,
                        vitality:     options.vitality     || vitality,
                        arcana:       options.arcana       || arcana,
                        defense:      options.defense      || defense,
                        mystica:      options.mystica      || mystica,

                        // abilities:    new Ability.init(abilityRows)
                    });
                };

                // Fix the prototype and constructors for all the types of Being classes.
                // Although I bet this is problematic, as this is done for every instance of
                // any of these enemy classes... something's probably going to go wrong.
                Character.prototype = Object.create(Being.prototype);
                Character.prototype.constructor = Character;

                // Add the newly created class to the bestiary under the new
                // enemy's name!
                self.list[slug] = Character;
            })();
        }
    }

    return self;
};

module.exports = Characters;
