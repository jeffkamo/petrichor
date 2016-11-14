import React, { Component, PropTypes } from 'react';
import {commands} from '../../constants';
import {keyMap} from '../../utils/a11y';
import styles from './styles.scss';

import Button from '../button'

export default class Menu extends Component {
    componentDidMount() {
        this.resetFocus()
    }

    componentDidUpdate(prevProps, prevState) {
        // With this check, focus will only reset if the menu mode changes.
        // This way, it will be less disorienting when focus stays on the same
        // button you clicked (and it – the button and the focus – stays in the
        // same place)
        if (prevProps.mode !== this.props.mode) {
            // The menu mode has changed! Reset focus to the first menu button
            this.resetFocus()
        }
    }

    resetFocus() {
        this.refs.root.firstChild.focus()
    }

    click(func, param) {
        func(param)
    }

    keyDown(event) {
        const keyCode = event.keyCode || event.charCode

        switch(keyCode) {
            case keyMap.up:
                if (event.target.previousSibling) {
                    event.target.previousSibling.focus()
                }
                break
            case keyMap.down:
                if (event.target.nextSibling) {
                    event.target.nextSibling.focus()
                }
                break
            default:
                break
        }
    }

    render() {
        const {directive} = this.props

        const menus = {
            [commands.START]: [
                ['Story',  commands.STORY,  this.props.onSetMode],
                ['Combat', commands.COMBAT, this.props.onSetMode],
                ['Exit',   commands.EXIT,   this.props.onExitClick],
            ],
            [commands.STORY]: [
                ['Continue', commands.CONTINUE, this.props.onSetDirective],
                ['Back',     commands.START,    this.props.onSetMode],
            ],
            [commands.COMBAT]: [
                ['Attack',  commands.ATTACK,  this.props.onSetDirective],
                ['Counter', commands.COUNTER, this.props.onSetDirective],
                ['Charge',  commands.CHARGE,  this.props.onSetDirective],
                ['Back',    commands.START,   this.props.onSetMode],
            ],
        }

        return (
            <div className={styles.root} ref="root">
                {menus[this.props.mode].map(([label, command, handler], key) =>
                    <Button
                        key={key}
                        disabled={directive !== commands.STANDBY}
                        onClick={this.click.bind(undefined, handler, command)}
                        onKeyDown={this.keyDown}>
                        {label}
                    </Button>
                )}
            </div>
        )
    }
}

Menu.propTypes = {
    mode: PropTypes.string.isRequired,
    onExitClick: PropTypes.func.isRequired,
    onSetDirective: PropTypes.func.isRequired,
    onSetMode: PropTypes.func.isRequired,
}
