import React, { Component, PropTypes } from 'react';
// import styles from './Prompter.css';

const Prompter = ({mode}) => {
    if (mode === 'start') {
        return <p>What would you like to do?</p>
    }

    if (mode === 'story') {
        return <p>Story time!</p>
    }

    if (mode === 'combat') {
        return <p>Combat time!</p>
    }
}

Prompter.propTypes = {
    mode: PropTypes.string,
}

export default Prompter
