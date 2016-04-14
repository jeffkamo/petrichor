var roll = new require('chance')();

// Ability Class: Attack
// ===

function Attack() {
}


// Class Method: Do
// ---

Attack.prototype.do = function(performer, combat) {
    var target = roll.pickone(performer.opponents);
    var toHitChance = this.baseAccuracy * (performer.accuracy / target.agility) * 100;
    var hit = roll.bool({ likelihood: toHitChance });

    console.log(performer.name + ' attacks ' + target.name + '! Chance of ' + toHitChance + '%');
    console.log((hit) ? 'hits' : 'misses');
    console.log(performer.name + ' deals 0 dmg');
    console.log(target.name + ' is at ' + target.getHp() + ' hp');
    console.log('\n');

    // @TODO
    // roll and deal damage (if hit)
};

module.exports = Attack;
