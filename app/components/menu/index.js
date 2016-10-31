import React, { Component, PropTypes } from 'react';
import {commands} from '../../constants';
import {keyMap} from '../../utils/a11y';
import styles from './styles.scss';

import Button from '../button'

export default class Menu extends Component {
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
        const menus= {
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
                ['Offense',   commands.OFFENSE,   this.props.onSetDirective],
                ['Defense',   commands.DEFENSE,   this.props.onSetDirective],
                ['Secondary', commands.SECONDARY, this.props.onSetDirective],
                ['Back',      commands.START,     this.props.onSetMode],
            ],
        }

        return (
            <div className={styles.root}>
                {menus[this.props.mode].map(([label, command, handler], key) =>
                    <Button
                        key={key}
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
