import React, { Component, PropTypes } from 'react';
// import styles from './Menu.css';

import Button from '../button/Button'

const Menu = (props) => {

    const menus = {
        start: [
            ['Story', props.onStoryClick],
            ['Combat', props.onCombatClick],
            ['Exit', props.onExitClick],
        ],
        story: [
            ['Continue', props.onContinueClick],
            ['Back', props.onStartClick],
        ],
        combat: [
            ['Offense', props.onOffenseClick],
            ['Defense', props.onDefenseClick],
            ['Secondary', props.onSecondaryClick],
            ['Back', props.onStartClick],
        ],
    }

    return (
        <div>
            {menus[props.mode].map(([label, handler], key) =>
                <div key={key}>
                    <Button onClick={handler}>{label}</Button>
                </div>
            )}
        </div>
    )
}

Menu.propTypes = {
    mode: PropTypes.string.isRequired,
    onStartClick: PropTypes.func.isRequired,
    onStoryClick: PropTypes.func.isRequired,
    onCombatClick: PropTypes.func.isRequired,
    onExitClick: PropTypes.func.isRequired,
    onContinueClick: PropTypes.func.isRequired,
    onOffenseClick: PropTypes.func.isRequired,
    onDefenseClick: PropTypes.func.isRequired,
    onSecondaryClick: PropTypes.func.isRequired,
}

export default Menu
