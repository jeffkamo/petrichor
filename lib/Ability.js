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
