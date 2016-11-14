import * as utils from '../../utils/utils'

// export function example() {
//     return (dispatch) => {
//         dispatch(quit());
//     }
// }

export const setParty = utils.createAction('Setting party members', 'party')
export const setEnemies = utils.createAction('Setting enemy members', 'enemies')
export const setPartyDirectives = utils.createAction('Party directives set', 'directive')
export const setEnemyDirectives = utils.createAction('Enemy directives set')
export const setInitiative = utils.createAction('Initiative set')
