var roll = new require('chance')();

// Ability Class
// ===

function Ability(options) {
    this.name         = options.name;
    this.slug         = options.slug;
    this.type         = options.region;
    this.description  = options.description;

    this.mpCost       = options.mpCost;
    this.area         = options.area;
    this.baseAccuracy = options.baseAccuracy;
    this.baseSpeed    = options.baseSpeed;
    this.performSkill = options.performSkill;
    this.targetSkill  = options.targetSkill;
    this.effect       = options.effect;
    this.baseEffect   = options.baseEffect;

    this.target = null;
    this.performer = null;
}


// Class Method: setFunc
// ---
//
// This method is exposed to allow the ability factory (in CharacterFactory) to
// add or overwrite prototype methods as necessary according to any given
// ability script. For example, below there is `do()` that does nothing by
// default, so an ability's script will create it's own `do()` method with more
// functionality, then the ability factory will add the new method to that
// ability's instance.

Ability.prototype.setFunc = function(name, func) {
    this[name] = func;
}

Ability.prototype.setPerformer = function(performer) {
    this.performer = performer;
}

Ability.prototype.setTarget = function(target) {
    this.target = target;
}


// Class Calculate Methods
// ---
//
// These are common calculations that many abilities will often make use of.

var _physicalToHit = function() {
    return this.baseAccuracy * (this.performer.accuracy / this.target.agility) * 100;
};

var _physicalDamage = function() {
    // console.log(this);
    // console.log('performSkill: ' + this.performSkill);
    // console.log('targetSkill: ' + this.targetSkill);

    var damageRoll = roll.d10();
    var damageBase = (damageRoll * this.performer[this.performSkill] * this.performer.level) / 12
    var defense = (this.target[this.targetSkill] * this.target.level) / 24
    var result = this.baseEffect * (damageBase) - defense;

    return Math.round(result);
};

Ability.prototype.calculate = function() {
    return {
        physical: {
            toHit: _physicalToHit.bind(this),
            damage: _physicalDamage.bind(this)
        },
        magical: {}
    };
};

// Class Method: Do
// ---
//
// Executres the ability (in combat)
//
// @param {Object} Expects the combat instance

Ability.prototype.do = function(combat) {
    // does nothing by default... this method is replaced by the do() methods
    // as described in each abilities individual file. The overwriting of this
    // method occurs during the Character Factoring.
    console.log('does nothing by default')
};

module.exports = Ability;
