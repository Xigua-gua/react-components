/**
 * @desc 导航  component
 * @createDate 2016-06-14
 * */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Dimensions,
} from 'react-native'
import RightButton from './rightButton'

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 5,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: '#3EC9B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  marginForIOS: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 16,
    width: Dimensions.get('window').width - 88,
    textAlign: 'center',
    color: '#fff',
  },
})

export default class NavigatorBar extends Component {

  _leftButton() {
    if (!this.props.hideBack) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.props.needVerity) {
              this.props.onReturn()
            } else {
              this.props.navigation.goBack()
            }
          }}
        >
          <Image
            source={require('./icon-return.png')}
            style={styles.leftButton}
          />
        </TouchableOpacity>
      )
    }
  }
  _rightButton() {
    if (this.props.rightButton) {
      return (
        <RightButton {...this.props.rightButton} />
      )
    }
    return null
  }
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <View style={[styles.nav,this.props.styles]}>
          <View
            style={[styles.button, Platform.OS === 'ios' ?
            styles.marginForIOS : null]}
          >
            {this._leftButton()}
          </View>
          <View
            style={[styles.title, Platform.OS === 'ios' ?
            styles.marginForIOS : null]}
          >
            <Text numberOfLines={1} style={styles.titleText}>
              { this.props.name }
            </Text>
          </View>
          <View
            style={[styles.button, Platform.OS === 'ios' ?
            styles.marginForIOS : null]}
          >
            {this._rightButton()}
          </View>
        </View>
      </View>
    )
  }
}

NavigatorBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  rightButton: PropTypes.object,
  styles: PropTypes.object,
  name: PropTypes.string.isRequired,
  onReturn: PropTypes.func.isRequired,
  needVerity: PropTypes.bool,
}

NavigatorBar.defaultProps = {
  rightButton: {},
  onReturn: () => {},
  needVerity: false,
  styles: {},
}
