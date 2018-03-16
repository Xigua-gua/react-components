import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style'


export default class button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      type,
      onPress,
      title,
      disabled,
      icon,
      style,
    } = this.props
    // console.log('style->',style)
    const buttonStyles = [styles.default_btn]
    const textStyles = [styles.btnText]
    let myIcon = null
    switch (type) {
      case 'primary':
        buttonStyles.push(styles.submit_btn)
        textStyles.push(styles.submit_text)
        if (!!style) {
          if (!!style.color) {
            buttonStyles.push({ backgroundColor: style.color, borderColor: style.color})
          }
        }
        break;
      case 'warn':
        buttonStyles.push(styles.submit_btn)
        textStyles.push(styles.submit_text)
        buttonStyles.push({ backgroundColor: 'red', borderColor: 'red'})
        break;
      case 'default':
        if (!!style) {
          if (!!style.color) {
            textStyles.push({color: style.color})
            buttonStyles.push({ borderColor: style.color})
          }
        }
        break;
      default:

    }
    switch (icon) {
      case 'download':
        myIcon = <Icon name="download" size={size}/>
        break;
      case 'search':
        myIcon = <Icon name="search" size={size} />
        break;
      default:
        myIcon = null
    }
    if (!!style) {
      if (!!style.fontSize) {
        textStyles.push({fontSize: style.fontSize})
      }
    }
    if (!!style) {
      if (!!style.borderRadius) {
        buttonStyles.push({borderRadius: style.borderRadius})
      }
      if (!!style.paddingTop) {
        buttonStyles.push({paddingTop: style.paddingTop,paddingBottom: style.paddingTop})
      }
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
      textStyles.push(styles.textDisabled)
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
        >
        <View style={buttonStyles}>
          <Text style={textStyles}>{myIcon}{title}</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}
button.propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
}
button.defaultProps = {
  onPress: () => {},
  disabled: false,
  type: 'primary',
  title: '确认',
}
