// @flow
import React, { Component } from 'react';
import styles from './Dashboard.css';

import Button from '../button/Button';

export default class Dashboard extends Component {
    render() {
        return (
            <div className={styles.root}>
                <header className={styles.header}>
                    <h1 className={styles.title}>FF:Trainwreck:Alpha</h1>
                </header>

                <div className={styles.body}>
                    <div className={styles.prompter}>
                        <p>Meanwhile, back in the dojo...</p>

                        <dl>
                            <dt>Basch</dt>
                                <dd>Women shouldn’t carry swords.</dd>
                            <dt>Yokiko</dt>
                                <dd>I don’t carry swords, I carry a fucking lance.</dd>
                            <dt>Basch</dt>
                                <dd>...</dd>
                        </dl>
                    </div>
                </div>

                <nav role="navigation" className={styles.nav}>
                    <div>
                        <Button>Continue</Button>
                    </div>

                    <div>
                        <Button disabled>Fight!</Button>
                    </div>

                    <div>
                        <Button>Exit</Button>
                    </div>
                </nav>
            </div>
        );
    }
}
