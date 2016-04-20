var roll = new require('chance')();

// Ability Class: Item
// ===

function Item() {}


// Class Method: Do
// ---

Item.prototype.do = function(performer, combat) {
    this.setPerformer(performer);
    this.setTarget(performer);

    var calc = this.calculate().physical;
    var hit = true;
    var negDamage = calc.damage() * -1;

    if (hit) { this.target.addDamage(negDamage); }

    console.log(this.target.name + ' drinks potion to heal ' + (-negDamage) + ' hp');
    console.log(this.target.name + ' is at ' + this.target.getCurrentHp() + '/' + this.target.getHp());
    console.log('\n');
};

module.exports = Item;
