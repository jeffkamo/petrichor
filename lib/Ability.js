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
    this.modifier     = options.modifier;
    this.effect       = options.effect;
    this.baseEffect   = options.baseEffect;
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
