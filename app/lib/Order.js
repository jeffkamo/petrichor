// Order
// ===

export default class Order {
    constructor(party, enemies) {
        this.initialList = []

        this.setAllInitiatives(party, enemies)

        return this.sort()
    }


    // Class Method: Set All Initiatives
    // ---

    setAllInitiatives(party, enemies) {
        // Roll initiative for each party member
        for(let member in party) {
            party[member].setInitiative()
            this.initialList.push(party[member])
        }

        // Roll initiative for each enemy member
        for(let member in enemies) {
            enemies[member].setInitiative()
            this.initialList.push(enemies[member])
        }
    }


    // Class Method: Sort
    // ---

    sort() {
        this.initialList.sort(this.sortByInitiative)
        return this.initialList.map((being) => being.uuid)
    }


    // Class Method: Sort By Initiative
    // ---

    sortByInitiative(individualA, individualB) {

        if(individualA.initiative > individualB.initiative) {
            // A's initiative is higher
            return -1 // set's to a lower index, meaning earlier in the array
        }

        if(individualA.initiative < individualB.initiative) {
            // B's initiative is higher
            return 1 // set's to a higher index, meaning later in the array
        }

        // A and B's initiative are equal
        return 0
    }
}
