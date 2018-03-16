/**
 *  @desc list 列表
 * @author ws
 * @date 2017-12
 * 1. data[{key: '',name: '',title: '', color: ''}] key 和 title 为必填，
 *    当有name时，所有项都必填，name为icon在react-native-vector-icons/dist/MaterialCommunityIcons里存在的name
 * 2. onPress: () => {} 点击列表时都回调，回返点击列的内容 {key: '',name: '',title: '', icon: '', color: ''}
**/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './style'

export default class List extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View style={styles.content}>
      {
        this.props.data.length > 0 ?
          this.props.data.map(list => (
            <TouchableOpacity
              key={list.key}
              style={[styles.row,styles.list]}
              onPress={() => {this.props.onPress(list)}}
            >
            {
              list.name ?
              <View style={[styles.iconView, {backgroundColor: list.color}]} >
                <Icon name={list.name} size={20} style={styles.icon} />
              </View>
              : null
            }
            <Text style={styles.text}>{list.title}</Text>
            </TouchableOpacity>
          ))
        : null
      }
      </View>
    )
  }
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func
}

List.defaultProps = {
  data: [],
  onPress: () => {},
}
