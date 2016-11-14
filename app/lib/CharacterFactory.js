import fs from 'fs'
import path from 'path'

import abilities from './abilities'
import Being from './Being'


// Private Function: forRows()
// ---
//
// This is a helper for() loop helper to make the parsing of Google Spreadsheets
// a bit easier.
//
// @param {Object} Expects a Google Spreadsheet Worksheet object
// @param {Function} Expects a function to callback in each iteration of the
//        for() loop

const forRows = (rows, callback) => {
    for (const currentRow in rows) {
        if (currentRow == 1) {
            // Skip the first row, it's just a set of labels
        } else {
            callback(currentRow)
        }
    }
}


// CharacterFactory Class
// ===

export default class CharacterFactory {
    constructor() {
        this.characterList = {}
        this.abilityList = {}
    }


    // Static Class Method: init()
    // ---
    //
    // This method is responsible for initializing the list of Beings. It takes a
    // Spreadsheet worksheet filled with Being data and parses it into a list of
    // Being objects.
    //
    // @param {Object} Expects a Google Spreadsheet worksheet of characters
    // @param {Object} Expects a Google Spreadsheet worksheet of abilities
    // @return {Object}

    static init(characterRows, abilityRows) {
        const factory = new this

        // Filling out the Ability List comes first! This MUST happen before the
        // Character List is started.
        forRows(abilityRows, (currentRow) => {
            // Build a class for the new Ability in a closure to ensure the new
            // class constiable is created fresh after each iteration.
            const map = this.mapAbilityFromSheetRows(abilityRows[currentRow])
            const currentAbility = abilities[map.slug]

            // Check if current ability exists
            if (currentAbility) {
                // build out the Ability class from the `map` and add it to
                // the abilityList
                factory.abilityList[map.slug] = new currentAbility(map)
            }
        })

        // Now, we fill out the Character List! This must come after the Ability
        // List has finished filling out.
        forRows(characterRows, (currentRow) => {
            // Build a class for the new Being in a closure to ensure the new
            // class constiable is created fresh after each iteration.
            const beingMap = this.mapCharacterFromSheetRows(characterRows[currentRow])

            // build out the Being class from the `beingMap`, the complete
            // `factory.abilityList` list and add the new Being instance to
            // the characterList
            factory.characterList[beingMap.slug] = new Being(
                beingMap,
                factory.abilityList
            )
        })

        return factory
    }


    // Class Method: mapCharacterFromSheetRows()
    // ---
    //
    // This method is responsible for mapping out a single character or bestiary row
    // from Google Spreadsheets into an easy to understand mapping for
    // easy consumption.
    //
    // @param {Object} Expects a Google Spreadsheet row object
    // @return {Object}

    static mapCharacterFromSheetRows(characterRow) {
        return {
            // Basics
            name:         characterRow[1],
            slug:         characterRow[2],
            region:       characterRow[3],
            description:  characterRow[4],
            level:        characterRow[5],

            // Dmg stats
            strength:     characterRow[7],
            intelligence: characterRow[8],

            // Pool stats
            vitality:     characterRow[9],
            arcana:       characterRow[10],

            // Defensive stats
            defense:      characterRow[11],
            mystica:      characterRow[12],

            // Hit stats
            accuracy:     characterRow[13],
            agility:      characterRow[14],

            // Experience
            experience:   characterRow[22],

            // Abilities
            attack:       characterRow[23],
            counter:      characterRow[24],
            charge:       characterRow[25],
        }
    }


    // Class Method: mapAbilityFromSheetRows()
    // ---
    //
    // This method is responsible for mapping out a single ability row from Google
    // Spreadsheets into an easy to understand mapping for easy consumption.
    //
    // @param {Object} Expects a Google Spreadsheet row object
    // @return {Object}

    static mapAbilityFromSheetRows(abilityRow) {
        return {
            name:         abilityRow[1],
            slug:         abilityRow[2],
            type:         abilityRow[3],
            description:  abilityRow[4],

            mpCost:       abilityRow[5],
            area:         abilityRow[6],
            baseAccuracy: abilityRow[7],
            baseSpeed:    abilityRow[8],
            performSkill: abilityRow[9],
            targetSkill:  abilityRow[10],
            effect:       abilityRow[11],
            baseEffect:   abilityRow[12],
        }
    }


    // Class Instance Method: manufacture()
    // ---
    //
    // This method manufactures a Being instance, depending on the options
    // passed to it.
    //
    // @param {Object} Expects a Being type and any other Character options
    // @return {Object}

    manufacture(options) {
        // Make a copy of the Being from the list. For example...
        // `this.characterList['augurKnight']`
        return new Being(
            this.characterList[options.type],
            this.abilityList
        )
    }
}
