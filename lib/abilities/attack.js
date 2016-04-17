var roll = new require('chance')();

// Ability Class: Attack
// ===

function Attack() {
}


// Class Method: Do
// ---

Attack.prototype.do = function(performer, combat) {
    this.setPerformer(performer);
    this.setTarget(roll.pickone(performer.opponents));

    var calc = this.calculate().physical;
    var toHitChance = calc.toHit();
    var hit = roll.bool({ likelihood: toHitChance });
    var damage = calc.damage();

    if (hit) { this.target.addDamage(damage); }

    console.log(this.performer.name + ' attacks ' + this.target.name);
    console.log((hit) ? this.performer.name + ' deals ' + damage + ' dmg' : 'misses');
    console.log(this.target.name + ' is at ' + this.target.getCurrentHp() + '/' + this.target.getHp());
    console.log('\n');
};

module.exports = Attack;
