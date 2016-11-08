import React, { Component } from 'react'
import styles from './styles.scss'
import {ipcRenderer as ipc} from 'electron'
import {commands} from '../../constants'

import Menu from '../menu'
import Prompter from '../prompter'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.onExitClick = this.onExitClick.bind(this)
        this.onSetDirective = this.onSetDirective.bind(this)
        this.onSetMode = this.onSetMode.bind(this)
        this.returnToStandby = this.returnToStandby.bind(this)
    }

    onExitClick() {
        ipc.send('quit')
    }

    onSetDirective(directive) {
        this.props.setDirective(directive)
    }

    onSetMode(mode) {
        this.props.setMode(mode)
    }

    returnToStandby() {
        this.props.setDirective(commands.STANDBY)
    }

    render() {
        const {mode, directive} = this.props.dashboard.toJS()

        return (
            <div className={styles.root}>
                <header className={styles.header}>
                    <h1 className={styles.title}>FF:Trainwreck:Alpha</h1>
                </header>

                <div className={styles.body}>
                    <div className={styles.prompter}>
                        <Prompter
                            mode={mode}
                            directive={directive}
                            onActionComplete={this.returnToStandby} />
                    </div>
                </div>

                <nav role="navigation" className={styles.nav}>
                    <Menu
                        mode={mode}
                        directive={directive}
                        onExitClick={this.onExitClick}
                        onSetDirective={this.onSetDirective}
                        onSetMode={this.onSetMode} />
                </nav>
            </div>
        )
    }
}
