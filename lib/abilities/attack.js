var roll = new require('chance')();

// Ability Class: Attack
// ===

function Attack() {
}


// Class Method: Do
// ---

Attack.prototype.do = function(performer, combat) {
    var calculateDamage = function(performer, target) {
        var damageRoll = roll.d10();
        var damageBonus = (damageRoll * performer.level) / 12
        var damageBase = (damageRoll * performer.strength * performer.level) / 12
        var defense = (target.defense * target.level) / 24
        // var result = this.baseEffect * (damageBonus + damageBase) - defense;
        var result = this.baseEffect * (damageBase) - defense;

        console.log('rolled ' + damageRoll);

        return Math.round(result);
    }.bind(this);

    var target = roll.pickone(performer.opponents);
    var toHitChance = this.baseAccuracy * (performer.accuracy / target.agility) * 100;
    var hit = roll.bool({ likelihood: toHitChance });
    var damage = calculateDamage(performer, target);

    if (hit) { target.addDamage(damage); }

    console.log(performer.name + ' attacks ' + target.name);
    console.log((hit) ? performer.name + ' deals ' + damage + ' dmg' : 'misses');
    console.log(target.name + ' is at ' + target.getCurrentHp() + '/' + target.getHp());
    console.log('\n');

    // @TODO
    // roll and deal damage (if hit)
};

module.exports = Attack;
