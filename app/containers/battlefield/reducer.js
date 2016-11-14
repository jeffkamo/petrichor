import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as battlefieldActions from './actions'
import {commands} from '../../constants'

import characterData from '../../data/characters.json'
import bestiaryData from '../../data/bestiary.json'
import abilityData from '../../data/abilities.json'
import CharacterFactory from '../../lib/CharacterFactory'
import Order from '../../lib/Order'

// Populate the CharacterFactory with the Being and Ability data. After this,
// a new character instance can be manufactured with a single method call!
const partyFactory = CharacterFactory.init(characterData, abilityData)
const enemyFactory = CharacterFactory.init(bestiaryData, abilityData)

const initialState = Map({
    init: true,
    initiative: [],
    party: [],
    enemies: [],
})

export default createReducer({

    [battlefieldActions.setParty]: (state, payload) => {
        // for each party member, manufacture it
        return state.set('party', payload.party.map((type) =>
            partyFactory.manufacture({type})
        ))
    },

    [battlefieldActions.setEnemies]: (state, payload) => {
        // for each enemy member, manufacture it
        return state.set('enemies', payload.enemies.map((type) =>
            enemyFactory.manufacture({type})
        ))
    },

    [battlefieldActions.setPartyDirectives]: (state, payload) => {
        // Set each party member's directive
        return state.set('party', state.get('party').map((member) => {
            member.setDirective(payload.directive)
            return member
        }))
    },

    [battlefieldActions.setEnemyDirectives]: (state) => {
        // Set each enemies' directive
        return state.set('enemies', state.get('enemies').map((enemy) => {
            enemy.setRandomDirective()
            return enemy
        }))
    },

    [battlefieldActions.setInitiative]: (state) => {
        // Set all initiatives, for each party member and each enemy member
        return state.set('initiative', new Order(
            state.get('party'),
            state.get('enemies'),
        ))
    },

}, initialState)
