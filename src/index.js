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
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }
    this._locationUploading = false
    // const { actions } = this.props
    // actions.checkAuth()
  }
  onBackAndroid() {
    let BACKPRESSTIMES = 0
    if (this.nav) {
      if (this.nav.props.navigation.state.index > 0) {
        this.nav.props.navigation.goBack()
        return true
      }
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false
      }
      this.lastBackPressed = Date.now()
      ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT)
      return true
    }
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress',() => this.onBackAndroid())
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => this.onBackAndroid())
    }
  }
  render() {
    return (
        <AppNavigator 
          ref={(ref) => { this.nav = ref }}
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        />
    )
  }
}
export default App;
