//

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';
import AppNavigator from './navigator'

class App extends Component {
  render() {
    return (
        <AppNavigator />
    )
  }
}
export default App;
