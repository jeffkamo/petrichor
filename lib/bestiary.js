var Being = require('./Being');
var Abilities = require('./Ability');

function Bestiary() {
    this.list = {};
}

Bestiary.prototype.factory = function(options) {
    var enemyClass = this.list[options.type];

    if (enemyClass == null) {
        return false;
    }

    return new enemyClass(options);
};

Bestiary.prototype.init = function(bestiaryRows, abilityRows) {
    var self = this;

    for (var currentRow in bestiaryRows) {

        // Skip the first row, it's just a set of labels
        if (currentRow > 1) {

            // Build a class for the new creature in a closure to ensure
            // the new class variable is created fresh after each iteration.
            (function() {
                var name =         bestiaryRows[currentRow]['1'];
                var slug =         bestiaryRows[currentRow]['2'];
                var region =       bestiaryRows[currentRow]['3'];
                var description =  bestiaryRows[currentRow]['4'];
                var level =        bestiaryRows[currentRow]['5'];
                var strength =     bestiaryRows[currentRow]['7'];
                var intelligence = bestiaryRows[currentRow]['8'];
                var vitality =     bestiaryRows[currentRow]['9'];
                var arcana =       bestiaryRows[currentRow]['10'];
                var defense =      bestiaryRows[currentRow]['11'];
                var mystica =      bestiaryRows[currentRow]['12'];

                var Enemy = function Enemy(options) {
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

                        // abilities:    new Abilities(abilityRows)
                    });
                };

                // Fix the prototype and constructors for all the types of Being classes.
                // Although I bet this is problematic, as this is done for every instance of
                // any of these enemy classes... something's probably going to go wrong.
                Enemy.prototype = Object.create(Being.prototype);
                Enemy.prototype.constructor = Enemy;

                // Add the newly created class to the bestiary under the new
                // enemy's name!
                self.list[slug] = Enemy;
            })();
        }
    }

    return self;
};

module.exports = Bestiary;
