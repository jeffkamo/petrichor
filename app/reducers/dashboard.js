import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as dashboardActions from '../actions/dashboard'

const commands = {
    // Start Menu
    START: 'start',
    STORY: 'story',
    COMBAT: 'combat',

    // Story Menu
    CONTINUE: 'continue',

    // Combat Menu
    OFFENSE: 'offense',
    DEFENSE: 'defense',
    SECONDARY: 'secondary',
}

const initialState = Map({
    mode: commands.START,
    directive: null,
})

export default createReducer({

    // Mode Setters
    [dashboardActions.goToStart]: (state, action) => {
        return state.set('mode', commands.START)
    },

    [dashboardActions.goToStory]: (state, action) => {
        return state.set('mode', commands.STORY)
    },

    [dashboardActions.goToCombat]: (state, action) => {
        return state.set('mode', commands.COMBAT)
    },


    // Directive Setters
    [dashboardActions.continueStory]: (state, action) => {
        return state.set('directive', commands.CONTINUE)
    },

    [dashboardActions.fightWithOffense]: (state, action) => {
        return state.set('directive', commands.OFFENSE)
    },

    [dashboardActions.fightWithDefense]: (state, action) => {
        return state.set('directive', commands.DEFENSE)
    },

    [dashboardActions.fightWithSecondary]: (state, action) => {
        return state.set('directive', commands.SECONDARY)
    },


}, initialState)
