// @flow
import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <div className="c-app">
                {this.props.children}
            </div>
        );
    }
}
