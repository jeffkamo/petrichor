import Chance from 'chance'
import Ability from '../Ability'

const roll = new Chance()


// Ability Class: Attack
// ===

export default class Attack extends Ability {
    constructor(props) {
        super(props)
    }


    // Class Method: Do
    // ---

    do(performer, combat) {
        const _ignoreTheDead = function(currentIndiv) {
            return !currentIndiv.isDead
        }

        this.setPerformer(performer)
        this.setTarget(roll.pickone(performer.opponents.filter(_ignoreTheDead)))

        const calc = this.calculate().physical
        const toHitChance = calc.toHit()
        const hit = roll.bool({ likelihood: toHitChance })
        const damage = calc.damage()

        if (hit) { this.target.addDamage(damage) }

        console.log(this.performer.name + ' attacks ' + this.target.name)
        console.log((hit) ? this.performer.name + ' deals ' + damage + ' dmg' : 'misses')
        console.log(this.target.name + ' is at ' + this.target.getCurrentHp() + '/' + this.target.getHp())
        console.log('\n')
    }
}
