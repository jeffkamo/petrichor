var Ability = require('./Ability');

function Abilities() {
    this.list = {};
}

Abilities.prototype.factory = function(options) {
    var abilityClass = this.list[options.slug];

    if (abilityClass == null) {
        return false;
    }

    return new abilityClass(options);
};

Abilities.prototype.init = function(abilityRows) {
    var self = this;

    for (var currentRow in abilityRows) {

        // Skip the first row, it's just a set of labels
        if (currentRow > 1) {

            // Build a class for the new creature in a closure to ensure
            // the new class variable is created fresh after each iteration.
            (function() {
                var name =         abilityRows[currentRow]['1'];
                var slug =         abilityRows[currentRow]['2'];
                var type =         abilityRows[currentRow]['3'];
                var description =  abilityRows[currentRow]['4'];

                var mpCost =       abilityRows[currentRow]['5'];
                var area =         abilityRows[currentRow]['6'];
                var baseAccuracy = abilityRows[currentRow]['7'];
                var modifier =     abilityRows[currentRow]['8'];
                var effect =       abilityRows[currentRow]['9'];
                var baseEffect =   abilityRows[currentRow]['10'];

                var newAbility = function newAbility(options) {
                    Ability.call(this, {
                        name         : options.name         || name,
                        slug         : options.slug         || slug,
                        type         : options.region       || type,
                        description  : options.description  || description,

                        mpCost       : options.mpCost       || mpCost,
                        area         : options.area         || area,
                        baseAccuracy : options.baseAccuracy || baseAccuracy,
                        modifier     : options.modifier     || modifier,
                        effect       : options.effect       || effect,
                        baseEffect   : options.baseEffect   || baseEffect
                    });
                };

                // Fix the prototype and constructors for all the types of Ability classes.
                // Although I bet this is problematic, as this is done for every instance of
                // any of these enemy classes... something's probably going to go wrong.
                newAbility.prototype = Object.create(Ability.prototype);
                newAbility.prototype.constructor = newAbility;

                // Add the newly created class to the bestiary under the new
                // enemy's name!
                self.list[slug] = newAbility;
            })();
        }
    }

    return self;
};

module.exports = Abilities;
