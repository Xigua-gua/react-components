import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import App from './src/index'


class myapp extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('Rntest', () => App);
