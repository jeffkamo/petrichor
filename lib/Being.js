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

Being.prototype.getAction = function() {
    return this[this.action];
};

Being.prototype.getAggression = function() {
    return 1;
};

Being.prototype.getConservancy = function() {
    var currentHp = this.getHp() - this.damage;
    var hpPercentile = currentHp / this.getHp();

    if (hpPercentile <= 0.25) {
        // default conservancy at <= 25% health
        return 1;
    }

    // default conservancy at > 25% health
    return 0;
};

Being.prototype.getEagerness = function() {
    if (this.hasMeter()) {
        // default eagerness
        return 0.5;
    }

    // has no eagerness if there's no meter
    return 0;
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

Being.prototype.setAllegiences = function(allegiances) {
    this.allies = allegiances.allies;
    this.opponents = allegiances.opponents;
};


// Class Boolean Methods
// ---

Being.prototype.hasMeter = function() {
    // @TODO finish this properly – requires meter to be implemented.
    // Does something like, if (this.hasMeter) { return true; } return false;
    return false;
};


// Class Methods: doAction
// ---
//
// Performs the action set in the above setAction() method
//
// @param {Object} Expects the combat instance

Being.prototype.doAction = function(combat) {
    this.getAction().do(this, combat);
};

module.exports = Being;
