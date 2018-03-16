/**
 * @desc 加载动画  component
 * @createDate 2016-06-14
 **/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#555',
    borderRadius: 10,
    opacity: 0.5,
  },
  message: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
  },
})

export default class Spinner extends Component {
  _getSpinner() {
    return (
      <ActivityIndicator
        {...this.props}
        animating
        size="small"
        color="#fff"
      />
    )
  }
  _getMessage() {
    if (this.props.message) {
      return (
        <Text style={styles.message}>{ this.props.message }</Text>
      )
    }
    return null
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          {this._getSpinner()}
          {this._getMessage()}
        </View>
      </View>
    )
  }
}

Spinner.propTypes = {
  message: PropTypes.string,
}

Spinner.defaultProps = {
  message: '',
}
