// @flow
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss'

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

        const charStats = (member, id) => (
            <div key={id} className={styles.character}>
                <div>
                    <em>{member.name}</em> <small>&nbsp;☆&nbsp;</small> Lv.{member.level}
                </div>

                <div>
                    HP: {member.getCurrentHp()}/{member.getHp()} &nbsp;
                    MP: {member.getCurrentMp()}/{member.getMp()} &nbsp;
                </div>

                <div>
                    Abilities: &nbsp;
                    [{member.offensiveAbility.name}] &nbsp;
                    [{member.defensiveAbility.name}] &nbsp;
                    [{member.secondaryAbility.name}] &nbsp;
                </div>
            </div>
        )

        return (
            <div>
                <p>:::::::::::::::::::::::::::::::::::::::::::::::</p>

                <p><strong>Party:</strong></p>

                {party.map((member, id) => charStats(member, id) )}

                <p>- - - - - - - - - - - - - - - - - - - - - - - -</p>

                <p><strong>Enemies Remaining:</strong></p>

                {enemies.map((member, id) => charStats(member, id) )}

                <p>:::::::::::::::::::::::::::::::::::::::::::::::</p>
            </div>
        );
    }
}
