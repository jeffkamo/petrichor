// Being Class
// ===

function Being(options) {

    // Basics
    this.name        = options.name;
    this.slug        = options.slug;
    this.region      = options.region;
    this.description = options.description;
    this.level       = options.level;

    // Dmg stats
    this.strength     = options.strength;
    this.intelligence = options.intelligence;

    // Pool stats
    this.vitality = options.vitality;
    this.arcana   = options.arcana;

    // Defensive stats
    this.defense = options.defense;
    this.mystica = options.mystica;

    // Set Combat Stats
    this.hp             = 10 + (this.vitality * this.level);
    this.damage         = 0;
    this.mp             = 10 + (this.arcana * this.level);
    this.limit          = 1 + (this.mystica * this.level);

    this.physicalAttack = 10 + (this.strength * this.level);
    this.magicAttack    = 10 + (this.intelligence * this.level);

    this.physicalDefense = 10 + (this.defense * this.level);
    this.magicDefense    = 10 + (this.mystica * this.level);
}


// Class Method: init()
// ---
//
// This method is responsible for initializing the list of Beings. It takes a
// Spreadsheet worksheet filled with Being data and parses it into a list of
// Being objects.
//
// @param {Object} Expects a Google Spreadsheet worksheet object
// @return {Object}

Being.prototype.init = function(characterRows) {
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
// Spreadsheets into an easy to understand object for easy consumption.
//
// @param {Object} Expects a Google Spreadsheet row object
// @return {Object}

Being.prototype.mapFromSheetRows = function(characterRow) {
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
// This method is responsible for taking the provided character map to build
// the actual Character object.
//
// @param {Object} expects the mapped out character data
// @return {Object}

Being.prototype.buildIndividual = function(map) {

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

Being.prototype.factory = function(options) {
    var Class = this.list[options.type];

    if (Class == null) {
        return false;
    }

    return new Class(options);
};

module.exports = Being;
