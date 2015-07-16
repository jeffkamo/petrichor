var roll = new require('chance')();

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

    // Hit Stats
    this.accuracy = options.accuracy;
    this.agility  = options.agility;

    // Set Combat Stats
    this.hp             = 10 + (this.vitality * this.level);
    this.damage         = 0;
    this.mp             = 10 + (this.arcana * this.level);
    this.limit          = 1 + (this.mystica * this.level);

    this.physicalAttack = 10 + (this.strength * this.level);
    this.magicAttack    = 10 + (this.intelligence * this.level);

    this.physicalDefense = 10 + (this.defense * this.level);
    this.magicDefense    = 10 + (this.mystica * this.level);

    // Experience
    this.experience = options.experience;

    // Abilities
    this.offensive = options.offensive;
    this.defensive = options.defensive;
    this.secondary = options.secondary;
    // summon...
    // swap...
}


// Method Class: setAction
// ---

Being.prototype.setAction = function(action) {
    this.action = action;
};


// Method Class: setInitiative
// ---

Being.prototype.setInitiative = function(ability) {
    this.initiative = this.agility * this[this.action].baseSpeed * ( roll.d10() + this.vitality );
};


module.exports = Being;
