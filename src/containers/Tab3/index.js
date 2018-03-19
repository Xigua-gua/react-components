
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import { navigate } from '../../navigate'

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Tab3 extends Component {
  // 构造
  constructor(props) {
    super(props)
    // 初始状态
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.item}>
        <Text>Tab3 Screen</Text>
      </View>
    )
  }
}
Tab3.navigationOptions = {
  header: null,
}

Tab3.propTypes = {
  navigation: PropTypes.object.isRequired,
}
