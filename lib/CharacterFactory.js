var Being = require('./Being');


// CharacterFactory Class
// ===

function CharacterFactory() {
    this.list = {};
}

CharacterFactory.prototype = Object.create(Being.prototype);
CharacterFactory.prototype.constructor = CharacterFactory;


// Class Method: init()
// ---
//
// This method is responsible for initializing the list of Beings. It takes a
// Spreadsheet worksheet filled with Being data and parses it into a list of
// Being objects.
//
// @param {Object} Expects a Google Spreadsheet worksheet object
// @return {Object}

CharacterFactory.prototype.init = function(characterRows) {
    for (var currentRow in characterRows) {

        // Skip the first row, it's just a set of labels
        if (currentRow > 1) {

            // Build a class for the new Being in a closure to ensure the new
            // class variable is created fresh after each iteration.
            var map = this.mapFromSheetRows(characterRows[currentRow]);

            // Pass the map to `.build()` to build out the Being class
            this.list[map.slug] = this.buildIndividual(map);
        }
    }

    return this;
};


// Class Method: mapCharacterFromSheetRows()
// ---
//
// This method is responsible for mapping out a single row from Google
// Spreadsheets into an easy to understand mapping for easy consumption.
//
// @param {Object} Expects a Google Spreadsheet row object
// @return {Object}

CharacterFactory.prototype.mapFromSheetRows = function(characterRow) {
    return {
        // Basics
        name:         characterRow['1'],
        slug:         characterRow['2'],
        region:       characterRow['3'],
        description:  characterRow['4'],
        level:        characterRow['5'],

        // Dmg stats
        strength:     characterRow['7'],
        intelligence: characterRow['8'],

        // Pool stats
        vitality:     characterRow['9'],
        arcana:       characterRow['10'],

        // Defensive stats
        defense:      characterRow['11'],
        mystica:      characterRow['12']
    }
};


// Class Method: buildIndividual()
// ---
//
// This method is responsible for creating a unique Class based on the provided
// spreadsheet map. This way, any number of characters can be created based on
// that class. For example, any number of monsters of a single type.
//
// @param {Object} expects the mapped out character data
// @return {Object}

CharacterFactory.prototype.buildIndividual = function(map) {

    // The Being classes added to `this.list` will eventually be called in the
    // `Being.factory()` method call.
    var Individual = function Individual(options) {
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
    Individual.prototype = Object.create(Being.prototype);
    Individual.prototype.constructor = Individual;

    return Individual;
}


// Class Method: factory()
// ---

CharacterFactory.prototype.manufacture = function(options) {
    var Class = this.list[options.type];

    if (Class == null) {
        return false;
    }

    return new Class(options);
};


// Export
// ---

module.exports = CharacterFactory;
