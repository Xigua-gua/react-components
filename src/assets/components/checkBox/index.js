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
    width: 13,
    height: 13,
  },
})

const IconCheck = require('./icon-check.png')
const IconChecked = require('./icon-checked.png')

export default class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.dataSource,
      current: props.defaultValue,
    }
  }

  handleSelect(value) {
    this.setState({
      current: value,
    }, ()=>{
      this.props.onSelect(value)
    })
  }

  render() {
    const { dataSource, current } = this.state
    return (
      <View
        style={[styles.row,
        { justifyContent: 'space-between' }, this.props.style]}
      >
        { dataSource.map((item, i) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => this.handleSelect(item.value)}
          >
            <View
              style={[styles.row, {
                marginRight: i === dataSource.length - 1 ? 0 : 40 }]}
            >
              { current === item.value ?
                <Image style={styles.icon} source={IconChecked} />
                :
                <Image style={styles.icon} source={IconCheck} />
              }
              { item.name ?
              <Text style={[styles.h3, { color: '#ABABAB', marginLeft: 5 }]}>
                {item.name}
              </Text>
              : null
              }
            </View>
          </TouchableOpacity>
        )) }
      </View>
    )
  }
}

CheckBox.propTypes = {
  dataSource: PropTypes.array.isRequired,
  defaultValue: PropTypes.any.isRequired,
  onSelect: PropTypes.func,
  style: View.propTypes.style,
}

CheckBox.defaultProps = {
  onSelect: () => {},
  style: {},
}
