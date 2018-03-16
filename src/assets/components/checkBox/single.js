/**
 * @desc 水平选择组件
 * @type {Object}
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h3: {
    color: '#333',
    fontSize: 15,
  },
  icon: {
    width: 15,
    height: 15,
  },
})

const IconCheck = require('./icon-check.png')
const IconChecked = require('./icon-checked.png')

export default class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }

  handleSelect() {
    var checked = !this.state.checked
    this.setState({
      checked: checked
    }, ()=>{
      this.props.onSelect(checked)
    })
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelect()}
      >
        { this.state.checked ?
          <Image style={styles.icon} source={IconChecked} />
          :
          <Image style={styles.icon} source={IconCheck} />
        }
      </TouchableOpacity>
    )
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  style: View.propTypes.style,
}

CheckBox.defaultProps = {
  onSelect: () => {},
  style: {},
}
