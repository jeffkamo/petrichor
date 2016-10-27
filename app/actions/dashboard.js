import * as utils from '../utils/utils'

// export function example() {
//     return (dispatch) => {
//         dispatch(quit());
//     }
// }

export const goToStart = utils.createAction('Returned to start')
export const goToStory = utils.createAction('Entered story')
export const goToCombat = utils.createAction('Entered combat')
