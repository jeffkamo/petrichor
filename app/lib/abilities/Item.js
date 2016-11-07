import Chance from 'chance'
import Ability from '../Ability'

const roll = new Chance()


// Ability Class: Item
// ===

export default class Item extends Ability {
    constructor(props) {
        super(props)
    }


    // Class Method: Do
    // ---

    do(performer, combat) {
        this.setPerformer(performer)
        this.setTarget(performer)

        const calc = this.calculate().physical
        const hit = true
        const negDamage = calc.damage() * -1

        if (hit) { this.target.addDamage(negDamage) }

        console.log(this.target.name + ' drinks potion to heal ' + (-negDamage) + ' hp')
        console.log(this.target.name + ' is at ' + this.target.getCurrentHp() + '/' + this.target.getHp())
        console.log('\n')
    }
}
