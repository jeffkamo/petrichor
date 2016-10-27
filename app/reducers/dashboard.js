import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as dashboardActions from '../actions/dashboard'

const START = 'start'
const STORY = 'story'
const COMBAT = 'combat'

const initialState = Map({
    mode: START
})

export default createReducer({

    [dashboardActions.goToStart]: (state, action) => {
        return state.set('mode', START)
    },

    [dashboardActions.goToStory]: (state, action) => {
        return state.set('mode', STORY)
    },

    [dashboardActions.goToCombat]: (state, action) => {
        return state.set('mode', COMBAT)
    },

}, initialState)
