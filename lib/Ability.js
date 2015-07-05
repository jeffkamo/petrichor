function Ability(options) {
    this.name         = options.name;
    this.slug         = options.slug;
    this.type         = options.region;
    this.description  = options.description;

    this.mpCost       = options.mpCost;
    this.area         = options.area;
    this.baseAccuracy = options.baseAccuracy;
    this.modifier     = options.modifier;
    this.effect       = options.effect;
    this.baseEffect   = options.baseEffect;
}

module.exports = Ability;
