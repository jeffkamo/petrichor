// @flow
import React, { Component } from 'react'
import styles from './Button.css'

export default class Button extends Component {
    render() {
        const {onClick} = this.props
        const disabled = !!this.props.disabled

        return (
            <button className={styles.root} disabled={disabled} onClick={onClick}>
                <div className={styles.inner}>
                    {this.props.children}
                </div>
            </button>
        )
    }
}
