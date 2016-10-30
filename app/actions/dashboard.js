import * as utils from '../utils/utils'

// export function example() {
//     return (dispatch) => {
//         dispatch(quit());
//     }
// }

export const setMode = utils.createAction('Setting mode', 'mode')
export const setDirective = utils.createAction('Setting directive', 'directive')
