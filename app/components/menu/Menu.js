import React, { Component, PropTypes } from 'react';
// import styles from './Menu.css';

import Button from '../button/Button'

const Menu = ({
    mode,

    // handlers
    onStartClick,
    onStoryClick,
    onCombatClick,
    onExitClick,
}) => {
    if (mode === 'start') {
        return (
            <div>
                <div>
                    <Button onClick={onStoryClick}>Story</Button>
                </div>

                <div>
                    <Button onClick={onCombatClick}>Combat</Button>
                </div>

                <div>
                    <Button onClick={onExitClick}>Exit</Button>
                </div>
            </div>
        )
    }

    if (mode === 'story') {
        return (
            <div>
                <div>
                    <Button onClick={() => {}}>Continue</Button>
                </div>

                <div>
                    <Button onClick={onStartClick}>Back</Button>
                </div>
            </div>
        )
    }

    if (mode === 'combat') {
        return (
            <div>
                <div>
                    <Button onClick={() => {}}>Offensive</Button>
                </div>

                <div>
                    <Button onClick={() => {}}>Defensive</Button>
                </div>

                <div>
                    <Button onClick={() => {}}>Secondary</Button>
                </div>

                <div>
                    <Button onClick={onStartClick}>Back</Button>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    mode: PropTypes.string.isRequired,
    onStartClick: PropTypes.func.isRequired,
    onStoryClick: PropTypes.func.isRequired,
    onCombatClick: PropTypes.func.isRequired,
    onExitClick: PropTypes.func.isRequired,
}

export default Menu
