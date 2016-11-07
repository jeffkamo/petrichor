import * as utils from '../../utils/utils'

// export function example() {
//     return (dispatch) => {
//         dispatch(quit());
//     }
// }

export const setParty = utils.createAction('Setting party members', 'party')
export const setEnemies = utils.createAction('Setting enemy members', 'enemies')
