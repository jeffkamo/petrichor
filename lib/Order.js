// Order
// ===

var Order = function() {
    this.list = [];
    this.teams = {};
};


// Class Method: Make Teams
// ---

Order.prototype.makeTeams = function(combat) {
    this.teams.party = combat.party;
    this.teams.opponents = combat.opponents;
};


// Class Method: Set All Initiatives
// ---

Order.prototype.setAllInitiatives = function() {

    for(members in this.teams) {

        // Roll initiative for each individual member in the team
        for(individual in this.teams[members]) {

            // Set the individual member's (party member or opponent
            // member) initiative
            this.teams[members][individual].setInitiative();

            // Add the individual member (party member or opponent member) to
            // the order list
            this.add(this.teams[members][individual]);
        }
    }
};


// Class Method: Add
// ---

Order.prototype.add = function(individual) {
    this.list.push(individual);
};


// Class Method: Sort
// ---

Order.prototype.sort = function() {
    return this.list.sort(this.sortByInitiative);
};


// Class Method: Sort By Initiative
// ---

Order.prototype.sortByInitiative = function(individualA, individualB) {

    if(individualA.initiative > individualB.initiative) {
        // A's initiative is higher
        return -1; // set's to a lower index, meaning earlier in the array
    }

    if(individualA.initiative < individualB.initiative) {
        // B's initiative is higher
        return 1; // set's to a higher index, meaning later in the array
    }

    // A and B's initiative are equal
    return 0;
};


// Class Method: Get Party
// ---

Order.prototype.getParty = function() {
    return this.teams.party;
};


// Class Method: Get Opponents
// ---

Order.prototype.getOpponents = function() {
    return this.teams.opponents;
};


// Export
// ---

module.exports = Order;
