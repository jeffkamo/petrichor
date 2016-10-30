import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as dashboardActions from './actions'
import {commands} from '../../constants'

const initialState = Map({
    mode: commands.START,
    directive: null,
})

export default createReducer({

    [dashboardActions.setMode]: (state, payload) => {
        return state.set('mode', payload.mode)
    },

    [dashboardActions.setDirective]: (state, payload) => {
        return state.set('directive', payload.directive)
    },

}, initialState)
