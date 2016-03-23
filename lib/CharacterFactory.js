var Ability = require('./Ability');
var Being = require('./Being');


// CharacterFactory Class
// ===

function CharacterFactory() {
    this.characterList = {};
    this.abilityList = {};
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
// @param {Object} Expects a Google Spreadsheet worksheet of characters
// @param {Object} Expects a Google Spreadsheet worksheet of abilities
// @return {Object}

CharacterFactory.prototype.init = function(characterRows, abilityRows) {
    this.mapAbilitiesFromSheetRows(abilityRows);
    this.mapCharactersFromSheetRows(characterRows);

    return this;
};


// Class Method: mapCharacterFromSheetRows()
// ---
//
// This method is responsible for mapping out a single character or bestiary row
// from Google Spreadsheets into an easy to understand mapping for
// easy consumption.
//
// @param {Object} Expects a Google Spreadsheet row object
// @return null

CharacterFactory.prototype.mapCharactersFromSheetRows = function(rows) {
    var keys = rows[0].values();
    var characterRows = rows.slice(1);

    // Now, we fill out the Character List! This must come after the Ability
    // List has finished filling out.
    this._forRows(characterRows, function(currentRow) {
        // Build a class for the new Being in a closure to ensure the new
        // class variable is created fresh after each iteration.
        var map = {};

        currentRow.forEach(function(value, i) {
            map[keys(i)] = value;
        });

        // build out the Being class from the `map` and add it to
        // the characterList
        this.characterList[map.slug] = this.buildIndividual(map);
    }.bind(this));
};


// Class Method: mapAbilityFromSheetRows()
// ---
//
// This method is responsible for mapping out a single ability row from Google
// Spreadsheets into an easy to understand mapping for easy consumption.
//
// @param {Object} Expects a Google Spreadsheet row object
// @return null

CharacterFactory.prototype.mapAbilitiesFromSheetRows = function(rows) {
    var keys = rows[0].values();
    var abilityRows = rows.slice(1);

    // Filling out the Ability List comes first! This MUST happen before the
    // Character List is started.
    this._forRows(abilityRows, function(currentRow) {
        // Build a class for the new Ability in a closure to ensure the new
        // class variable is created fresh after each iteration.
        var map = {};

        currentRow.forEach(function(value, i) {
            map[keys(i)] = value;
        });

        // build out the Ability class from the `map` and add it to
        // the abilityList
        this.abilityList[map.slug] = this.buildAbility(map);
    }.bind(this));
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
    var self = this;

    var Individual = function Individual(options) {
        var abilityList = self.abilityList;

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
            accuracy:     options.accuracy     || map.accuracy,
            agility:      options.agility      || map.agility,

            offensive: abilityList[options.offensive || map.offensive],
            defensive: abilityList[options.defensive || map.defensive],
            secondary: abilityList[options.secondary || map.secondary],
        });
    };

    // Fix the prototype and constructors for all the types of Being classes.
    // Although I bet this is problematic, as this is done for every instance of
    // any of these enemy classes... something's probably going to go wrong.
    Individual.prototype = Object.create(Being).prototype;
    Individual.prototype.constructor = Individual;

    return Individual;
}


// Class Method: buildAbility()
// ---
//
// This method is responsible for creating new Abilities based on the provided
// spreadsheet map.
//
// @param {Object} expects the mapped out ability data
// @return {Object}

CharacterFactory.prototype.buildAbility = function(map) {

    var ability = new Ability({
        name:         map.name,
        slug:         map.slug,
        type:         map.type,
        description:  map.description,

        mpCost:       map.mpCost,
        area:         map.area,
        baseAccuracy: map.baseAccuracy,
        baseSpeed:    map.baseSpeed,
        modifier:     map.modifier,
        effect:       map.effect,
        baseEffect:   map.baseEffect
    });

    return ability;
}


// Class Method: factory()
// ---

CharacterFactory.prototype.manufacture = function(options) {
    var Class = this.characterList[options.type];

    if (Class == null) {
        return false;
    }

    return new Class(options);
};


// Class Method: _forRows()
// ---
//
// This is a helper for() loop helper to make the parsing of Google Spreadsheets
// a bit easier.
//
// @param {Object} Expects a Google Spreadsheet Worksheet object
// @param {Function} Expects a function to callback in each iteration of the
//        for() loop

CharacterFactory.prototype._forRows = function(rows, callback) {
    for (var currentRow in rows) {
        if (currentRow == 1) {
            // Skip the first row, it's just a set of labels
        } else {
            callback(currentRow);
        }
    }
};


// Export
// ---

module.exports = CharacterFactory;
