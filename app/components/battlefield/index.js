// @flow
import React, { Component, PropTypes } from 'react';

export default class Battlefield extends Component {
    static propTypes = {
        // children: PropTypes.element.isRequired
    };

    componentWillMount() {
        console.log('given a preselected list of party members and enemies, generate all Beings instances!')
    }

    render() {
        const {party, enemies} = this.props.battlefield.toJS()

        return (
            <div>
                <p><strong>Party:</strong></p>

                {party.map(({name, region, level}, id) => {
                    return (
                        <p key={id}>{name} Level {level}</p>
                    )
                })}

                <p>- - -</p>

                <p><strong>Enemies Remaining:</strong></p>

                {enemies.map(({name, region, level}, id) => {
                    return (
                        <p key={id}>{name} Level {level}</p>
                    )
                })}
            </div>
        );
    }
}
