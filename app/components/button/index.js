// @flow
import React, { Component } from 'react'
import styles from './styles.scss'

export default class Button extends Component {
    render() {
        const {onClick, onKeyDown} = this.props
        const disabled = !!this.props.disabled

        return (
            <button
                className={styles.root}
                disabled={disabled}
                onClick={onClick}
                onKeyDown={onKeyDown}>

                <div className={styles.inner}>
                    {this.props.children}
                </div>

            </button>
        )
    }
}
