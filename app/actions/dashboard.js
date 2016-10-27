import {ipcRenderer as ipc} from 'electron'

export function quit() {
    ipc.send('quit')
}

export function onQuit() {
    return (dispatch) => {
        dispatch(quit());
    }
}
