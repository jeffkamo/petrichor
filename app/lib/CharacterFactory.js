import fs from 'fs'
import path from 'path'

// import Ability from './Ability'
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
        this.dbAbilityList = {}
        this.fsAbilityList = {}

        // @TODO: Implement the ability system
        // Prepare to load file system based abilities
        // const normalizedPath = path.join(__dirname, "abilities")
        // const fsList = fs.readdirSync(normalizedPath)

        // for (const file in fsList) {
        //     const filename = fsList[file]
        //     const Skill = require("./abilities/" + filename)
        //     this.fsAbilityList[filename] = Skill
        // }

        // @TODO: Bind all the methods to `this`
        // this.init = this.init.bind(this)
        // this.manufacture = this.manufacture.bind(this)
        // this.mapCharacterFromSheetRows = this.mapCharacterFromSheetRows.bind(this)
        // this.mapAbilityFromSheetRows = this.mapAbilityFromSheetRows.bind(this)
        // this.buildIndividual = this.buildIndividual.bind(this)
        // this.buildAbility = this.buildAbility.bind(this)
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

        // @TODO: Implement Ability system
        // // Filling out the Ability List comes first! This MUST happen before the
        // // Character List is started.
        // this._forRows(abilityRows, (currentRow) => {
        //     // Build a class for the new Ability in a closure to ensure the new
        //     // class constiable is created fresh after each iteration.
        //     const map = this.mapAbilityFromSheetRows(abilityRows[currentRow])
        //
        //
        //     // build out the Ability class from the `map` and add it to
        //     // the dbAbilityList
        //     this.dbAbilityList[map.slug] = this.buildAbility(map)
        // })

        // Now, we fill out the Character List! This must come after the Ability
        // List has finished filling out.
        forRows(characterRows, (currentRow) => {
            // Build a class for the new Being in a closure to ensure the new
            // class constiable is created fresh after each iteration.
            const map = this.mapCharacterFromSheetRows(characterRows[currentRow])

            // build out the Being class from the `map` and add it to
            // the characterList
            factory.characterList[map.slug] = new Being(map)
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
            offensive:    characterRow[23],
            defensive:    characterRow[24],
            secondary:    characterRow[25],
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
            baseEffect:   abilityRow[12]
        }
    }


    // Class Method: buildAbility()
    // ---
    //
    // This method is responsible for creating new Abilities based on the provided
    // spreadsheet map.
    //
    // @param {Object} expects the mapped out ability data
    // @return {Object}

    static buildAbility(map) {

        // @TODO: Implement Ability system

        // // Factory out the new ability!
        // const currentAbility = function currentAbility(options) {
        //     Ability.call(this, {
        //         name:         map.name,
        //         slug:         map.slug,
        //         type:         map.type,
        //         description:  map.description,
        //
        //         mpCost:       map.mpCost,
        //         area:         map.area,
        //         baseAccuracy: map.baseAccuracy,
        //         baseSpeed:    map.baseSpeed,
        //         performSkill: map.performSkill,
        //         targetSkill:  map.targetSkill,
        //         effect:       map.effect,
        //         baseEffect:   map.baseEffect
        //     })
        // }
        //
        // currentAbility.prototype = Object.create(Ability).prototype
        // currentAbility.prototype.constructor = Ability.bind({})
        //
        // const fsAbility = this.fsAbilityList[map.slug + '.js']
        // const newAbility = new currentAbility()
        //
        // // Extend the current ability with the class methods defined for this
        // // ability in their ability files, as seen in the `/abilities` directory
        // if (!!fsAbility) {
        //     // Only do the following if an fsAbility (script file for this ability)
        //     // exists for the currentAbility
        //     for(method in fsAbility.prototype) {
        //         // All the prototype methods on the fsAbility are added to the
        //         // newAbility instance, so keep that in mind while scripting
        //         // abilities, exposing only the necessary methods.
        //         newAbility.setFunc(method, fsAbility.prototype[method])
        //     }
        // }
        //
        // return newAbility
    }


    // Class Instance Method: manufacture()
    // ---
    //
    // This method manufactures a Character instance, depending on the options
    // passed to it.
    //
    // @param {Object} Expects a Character type and any other Character options
    // @return {Object}

    manufacture(options) {
        // Make a copy of the Being from the list
        return new Being(
            this.characterList[options.type]
        )
    }
}
