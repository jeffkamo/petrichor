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

    // Damage (current damage)
    this.damage = 0;

    // Experience
    this.experience = options.experience;

    // Abilities
    this.offensive = options.offensive;
    this.defensive = options.defensive;
    this.secondary = options.secondary;
    // summon...
    // swap...
}


// Class Getter Methods
// ---

Being.prototype.getHp = function() {
    return 10 + (this.vitality * this.level);
};

Being.prototype.getMp = function() {
    return 10 + (this.arcana * this.level);
};

Being.prototype.getLimit = function() {
    return 1 + (this.mystica * this.level);
};

Being.prototype.getPhysicalAttack = function() {
    return 10 + (this.strength * this.level);
};

Being.prototype.getMagicAttack = function() {
    return 10 + (this.intelligence * this.level);
};

Being.prototype.getPhysicalDefense = function() {
    return 10 + (this.defense * this.level);
};

Being.prototype.getMagicDefense = function() {
    return 10 + (this.mystica * this.level);
};


// Class Setter Methods
// ---

// @param {String} Expects the String representation of an action, such as those
//        found in Combat.ACTIONS
Being.prototype.setAction = function(action) {
    this.action = action;
};

Being.prototype.setInitiative = function() {
    var ability = this[this.action];
    this.initiative = this.agility * ability.baseSpeed * ( roll.d10() + this.vitality );
};


module.exports = Being;
