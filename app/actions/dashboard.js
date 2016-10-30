import * as utils from '../utils/utils'

// export function example() {
//     return (dispatch) => {
//         dispatch(quit());
//     }
// }

// Mode Setters
export const goToStart = utils.createAction('Returned to start')
export const goToStory = utils.createAction('Entered story')
export const goToCombat = utils.createAction('Entered combat')

// Directive Setters
// export const continueStory = utils.createAction('Continued story')
// export const fightWithOffense = utils.createAction('Fought with offense')
// export const fightWithDefense = utils.createAction('Fought with defense')
// export const fightWithSecondary = utils.createAction('Fought with secondary')
