import React, { Component } from 'react'
import styles from './Dashboard.css'
import {ipcRenderer as ipc} from 'electron'

import Menu from '../menu/Menu'
import Prompter from '../prompter/Prompter'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.onStartClick = this.onStartClick.bind(this)
        this.onStoryClick = this.onStoryClick.bind(this)
        this.onCombatClick = this.onCombatClick.bind(this)
        this.onExitClick = this.onExitClick.bind(this)
        // this.renderPrompter = this.renderPrompter.bind(this)
    }

    onStartClick() {
        this.props.goToStart()
    }

    onStoryClick() {
        this.props.goToStory()
    }

    onCombatClick() {
        this.props.goToCombat()
    }

    onExitClick() {
        ipc.send('quit')
    }

    // renderPrompter() {
    //     const {mode} = this.props.dashboard.toJS()
    //
    //     if (mode === 'start') {
    //         return <p>What would you like to do?</p>
    //     }
    //
    //     if (mode === 'story') {
    //         return <p>Story time!</p>
    //     }
    //
    //     if (mode === 'combat') {
    //         return <p>Combat time!</p>
    //     }
    // }

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
                        onStartClick={this.onStartClick}
                        onStoryClick={this.onStoryClick}
                        onCombatClick={this.onCombatClick}
                        onExitClick={this.onExitClick} />
                </nav>
            </div>
        )
    }
}
