// @flow
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss'
import {commands} from '../../constants'

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

    componentWillUnmount() {
        this.props.setParty([])
        this.props.setEnemies([])
    }

    componentDidUpdate(prevProps, prevState) {

        // If the directive hasn't changed, take no action
        if (prevProps.directive === this.props.directive) {
            console.log('war... war never changes...')
            return
        }

        console.log(`CHANGED: ${this.props.directive}`)

        switch(this.props.directive) {
            case (commands.ATTACK):
            case (commands.COUNTER):
            case (commands.CHARGE):
                // Set Party directives
                this.props.setPartyDirectives(this.props.directive)

                // NOTE: This needs to be all synchronous to prevent returning
                // to a STANDBY state while things are still happening.
                //
                // 1. Enemies assign their directives
                this.props.setEnemyDirectives()

                // 2. Determine Initiative
                this.props.setInitiative()

                // 3. Act!
                break;
            case (commands.STANDBY):
                // Return to the menu and allow the user to select their next
                // action, or to change modes, etc.
                console.log('standbying by...')
                break
            default:
                console.log('Cannot compute directive!')
        }

        setTimeout(this.props.onActionComplete, 2000)
    }

    render() {
        const {party, enemies} = this.props.battlefield.toJS()

        const charStats = (member, id) => (
            <div key={id} className={styles.character}>
                <div>
                    <em>{member.name}</em> <small>&nbsp;☆&nbsp;</small> Lv.{member.level}
                </div>

                <div>{member.description}</div>

                <div>
                    HP: {member.getCurrentHp()}/{member.getHp()} &nbsp;
                    MP: {member.getCurrentMp()}/{member.getMp()} &nbsp;
                </div>

                <div>
                    Abilities: &nbsp;
                    [attack] {member.attackAbility.name} &nbsp;
                    [counter] {member.counterAbility.name} &nbsp;
                    [charge] {member.chargeAbility.name} &nbsp;
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
