// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Dashboard.css';


export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h1>Dashboard</h1>
        </div>
      </div>
    );
  }
}
