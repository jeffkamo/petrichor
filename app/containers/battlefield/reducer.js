import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as battlefieldActions from './actions'
import {commands} from '../../constants'

const initialState = Map({
    party: [
        {
            name: 'Basch',
            region: 'Alexandria',
            level: 1,
        },
        {
            name: 'Kamina',
            region: 'Alexandria',
            level: 1,
        },
    ],
    enemies: [
        {
            name: 'Plebe',
            region: 'Alexandria',
            level: 1,
        },
        {
            name: 'Augur Knight',
            region: 'Alexandria',
            level: 1,
        },
    ]
})

export default createReducer({

    // [battlefieldActions.setMode]: (state, payload) => {
    //     return state.set('mode', payload.mode)
    // },
    //
    // [battlefieldActions.setDirective]: (state, payload) => {
    //     return state.set('directive', payload.directive)
    // },

}, initialState)
