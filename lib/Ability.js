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

Ability.prototype.do = function() {
    // what does this do...
};

module.exports = Ability;
