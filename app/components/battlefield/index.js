// @flow
import React, { Component, PropTypes } from 'react';

export default class Battlefield extends Component {
    static propTypes = {
        // children: PropTypes.element.isRequired
    };

    componentDidMount() {
        const {init} = this.props.battlefield.toJS()

        if (init) {
            this.props.setParty(['basch', 'kamina'])
            this.props.setEnemies(['plebe', 'augurKnight'])
        }
    }

    render() {
        const {party, enemies} = this.props.battlefield.toJS()

        const charStats = (member) => (
            <p key={member.id}>
                <div><em>{member.name}</em> <small>&nbsp;☆&nbsp;</small> Lv.{member.level}</div>
                <div>
                    HP: {member.getCurrentHp()}/{member.getHp()} &nbsp;
                    MP: {member.getCurrentMp()}/{member.getMp()} &nbsp;
                </div>
            </p>
        )

        return (
            <div>
                <p>:::::::::::::::::::::::::::::::::::::::::::::::</p>

                <p><strong>Party:</strong></p>

                {party.map((member, id) => charStats(member) )}

                <p>- - - - - - - - - - - - - - - - - - - - - - - -</p>

                <p><strong>Enemies Remaining:</strong></p>

                {enemies.map((member, id) => charStats(member) )}

                <p>:::::::::::::::::::::::::::::::::::::::::::::::</p>
            </div>
        );
    }
}
