import React, { Component, PropTypes } from 'react';
import {commands} from '../../constants';

import Button from '../button/Button'

const Menu = (props) => {

    const menus = {
        start: [
            ['Story',  commands.STORY,  props.onSetMode],
            ['Combat', commands.COMBAT, props.onSetMode],
            ['Exit',   commands.EXIT,   props.onExitClick],
        ],
        story: [
            ['Continue', commands.CONTINUE, props.onSetMode],
            ['Back',     commands.START,    props.onSetMode],
        ],
        combat: [
            ['Offense',   commands.OFFENSE,   props.onSetDirective],
            ['Defense',   commands.DEFENSE,   props.onSetDirective],
            ['Secondary', commands.SECONDARY, props.onSetDirective],
            ['Back',      commands.START,     props.onSetMode],
        ],
    }

    const click = (func, param) => {
        func(param)
    }

    return (
        <div>
            {menus[props.mode].map(([label, command, handler], key) =>
                <div key={key}>
                    <Button onClick={click.bind(null, handler, command)}>
                        {label}
                    </Button>
                </div>
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
