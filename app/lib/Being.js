import chance from 'chance'


// Being Class
// ===

export default class Being {
    constructor(options = {}, abilityList = {}) {
        // Basics
        this.name        = options.name
        this.slug        = options.slug
        this.region      = options.region
        this.description = options.description
        this.level       = options.level

        // Dmg stats
        this.strength     = options.strength
        this.intelligence = options.intelligence

        // Pool stats
        this.vitality = options.vitality
        this.arcana   = options.arcana

        // Defensive stats
        this.defense = options.defense
        this.mystica = options.mystica

        // Hit Stats
        this.accuracy = options.accuracy
        this.agility  = options.agility

        // Damage (current damage)
        this.damage = 0

        // Damage (current damage)
        this.mpSpent = 0

        // Death is only the beginning
        this.isDead = false

        // Experience
        this.experience = options.experience

        // Abilities
        this.offensive = options.offensive
        this.defensive = options.defensive
        this.secondary = options.secondary
        this.offensiveAbility = abilityList[this.offensive]
        this.defensiveAbility = abilityList[this.defensive]
        this.secondaryAbility = abilityList[this.secondary]

        // summon...

        // swap...
    }


    // Getter Methods
    // ---

    getHp() {
        return 10 + (this.vitality * this.level)
    }

    getCurrentHp() {
        return this.getHp() - this.damage
    }

    getMp() {
        return 10 + (this.arcana * this.level)
    }

    getCurrentMp() {
        return this.getMp() - this.mpSpent
    }

    getLimit() {
        return 1 + (this.mystica * this.level)
    }

    getPhysicalAttack() {
        return 10 + (this.strength * this.level)
    }

    getMagicAttack() {
        return 10 + (this.intelligence * this.level)
    }

    getPhysicalDefense() {
        return 10 + (this.defense * this.level)
    }

    getMagicDefense() {
        return 10 + (this.mystica * this.level)
    }

    getAction() {
        return this[this.action]
    }

    getAggression() {
        return 1
    }

    getConservancy() {
        const hpPercentile = this.getCurrentHp() / this.getHp()

        if (hpPercentile <= 0.25) {
            // default conservancy at <= 25% health
            return 1
        }

        // default conservancy at > 25% health
        return 0
    }

    getEagerness() {
        if (this.hasMeter()) {
            // default eagerness
            return 0.5
        }

        // has no eagerness if there's no meter
        return 0
    }


    // Class Setter Methods
    // ---

    // @param {String} Expects the String representation of an action, such as
    //        those found in Combat.ACTIONS
    setAction(action) {
        this.action = action
    }

    setInitiative() {
        const ability = this[this.action]
        this.initiative = this.agility * ability.baseSpeed * ( roll.d10() + this.vitality )
    }

    setAllegiences(allegiances) {
        this.allies = allegiances.allies
        this.opponents = allegiances.opponents
    }

    addDamage(damage) {
        const newDamage = this.damage + damage

        if (newDamage > this.getHp()) {
            this.damage = this.getHp()
            return
        } else if (newDamage < 0) {
            this.damage = 0
            return
        }

        this.damage = newDamage
    }

    kill() {
        this.isDead = true
    }

    revive() {
        this.isDead = false
    }


    // Class Boolean Methods
    // ---

    hasMeter() {
        // @TODO finish this properly – requires meter to be implemented.
        // Does something like, if (this.hasMeter) { return true } return false
        return false
    }


    // Class Methods: doAction
    // ---
    //
    // Performs the action set in the above setAction() method
    //
    // @param {Object} Expects the combat instance

    doAction(combat) {
        this.getAction().do(this, combat)
    }
}
