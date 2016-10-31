import React, { Component, PropTypes } from 'react';
import {commands} from '../../constants';
import {keyMap} from '../../utils/a11y';
import styles from './styles.scss';

import Button from '../button'

const Menu = (props) => {

    const menus = {
        [commands.START]: [
            ['Story',  commands.STORY,  props.onSetMode],
            ['Combat', commands.COMBAT, props.onSetMode],
            ['Exit',   commands.EXIT,   props.onExitClick],
        ],
        [commands.STORY]: [
            ['Continue', commands.CONTINUE, props.onSetDirective],
            ['Back',     commands.START,    props.onSetMode],
        ],
        [commands.COMBAT]: [
            ['Offense',   commands.OFFENSE,   props.onSetDirective],
            ['Defense',   commands.DEFENSE,   props.onSetDirective],
            ['Secondary', commands.SECONDARY, props.onSetDirective],
            ['Back',      commands.START,     props.onSetMode],
        ],
    }

    const click = (func, param) => {
        func(param)
    }

    const keyDown = (event) => {
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

    return (
        <div className={styles.root}>
            {menus[props.mode].map(([label, command, handler], key) =>
                <Button
                    key={key}
                    onClick={click.bind(undefined, handler, command)}
                    onKeyDown={keyDown}>
                    {label}
                </Button>
            )}
        </div>
    )
}

Menu.propTypes = {
    mode: PropTypes.string.isRequired,
    onExitClick: PropTypes.func.isRequired,
    onSetDirective: PropTypes.func.isRequired,
    onSetMode: PropTypes.func.isRequired,
}

export default Menu
