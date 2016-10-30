import React, { Component } from 'react'
import styles from './styles.css'
import {ipcRenderer as ipc} from 'electron'

import Menu from '../menu'
import Prompter from '../prompter'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.onExitClick = this.onExitClick.bind(this)
        this.onSetDirective = this.onSetDirective.bind(this)
        this.onSetMode = this.onSetMode.bind(this)
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

    render() {
        const {mode} = this.props.dashboard.toJS()

        return (
            <div className={styles.root}>
                <header className={styles.header}>
                    <h1 className={styles.title}>FF:Trainwreck:Alpha</h1>
                </header>

                <div className={styles.body}>
                    <div className={styles.prompter}>
                        <Prompter mode={mode} />
                    </div>
                </div>

                <nav role="navigation" className={styles.nav}>
                    <Menu mode={mode}
                        onExitClick={this.onExitClick}
                        onSetDirective={this.onSetDirective}
                        onSetMode={this.onSetMode} />
                </nav>
            </div>
        )
    }
}
