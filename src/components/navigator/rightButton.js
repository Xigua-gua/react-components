/**
 * @desc 导航  component
 * @createDate 2016-06-14
 * */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
  rightButton: {
    marginRight: 10,
  },
  button: {
    width: 50,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
})

export default class RightButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
      >
        { this.props.text ?
          <Text style={styles.btnText}>{this.props.text}</Text> : null }
        { this.props.icon ?
          <Image source={this.props.icon} style={styles.rightButton} /> : null }
      </TouchableOpacity>
    )
  }
}

RightButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.any,
}

RightButton.defaultProps = {
  onPress: () => {},
  text: '',
  icon: '',
}
