var Being = require('./Being');

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

Characters.prototype.init = function(rows) {
    var self = this;

    for (var currentRow in rows) {

        // Skip the first row, it's just a set of labels
        if (currentRow > 1) {

            // Build a class for the new creature in a closure to ensure
            // the new class variable is created fresh after each iteration.
            (function() {
                var name =         rows[currentRow]['1'];
                var slug =         rows[currentRow]['2'];
                var region =       rows[currentRow]['3'];
                var description =  rows[currentRow]['4'];
                var level =        rows[currentRow]['5'];
                var strength =     rows[currentRow]['7'];
                var intelligence = rows[currentRow]['8'];
                var vitality =     rows[currentRow]['9'];
                var arcana =       rows[currentRow]['10'];
                var defense =      rows[currentRow]['11'];
                var mystica =      rows[currentRow]['12'];

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
