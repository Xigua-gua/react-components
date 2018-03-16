/**
 * @desc 展示组件 -> 搜索输入框
 * @author Jafeney<jafeney@yijunet.cc>
 * @dete 2017-05-22
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

const styles = StyleSheet.create({
  field: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 8 : null,
  },
  input: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    padding: 0,
    height: 34,
    backgroundColor: '#E6E6E6',
    paddingLeft: 15,
    fontSize: 14,
    borderRadius: 3,
  },
  btn: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 8 : null,
  },
  btnText: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  btnActive: {
    color: '#3EC9B6',
  },
})

const androidInputProps = {
  underlineColorAndroid: 'transparent',
  textAlignVertical: 'center',
}

export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      visible: props.visible,
      value: '',
      placeholder: props.placeholder,
      autoFocus: props.autoFocus,
    }
    this.id = 0
    this.replier = {}
  }
  focus() {
    this.setState({
      visible: true,
    })
  }
  reset() {
    this.setState({
      value: '',
      disabled: true,
      placeholder: '发表评论',
    })
  }
  handleChange(txt) {
    this.setState({
      value: txt,
      disabled: !txt.length,
    }, () => {
      this.props.onSearch(txt)
    })
  }
  handleBlur() {
    if (!this.props.visible) {
      this.setState({
        visible: false,
        value: '',
      })
    }
    this.props.onBlur()
  }
  render() {
    const { visible, value, placeholder, autoFocus } = this.state
    const behavior = Platform.OS === 'ios' ? 'position' : 'height'
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardBox}
        behavior={visible ? behavior : 'position'}
      >
        { visible ?
          <View style={styles.field}>
            <TextInput
              value={value}
              {...androidInputProps}
              onChangeText={txt => this.handleChange(txt)}
              autoFocus={autoFocus}
              onBlur={() => this.handleBlur()}
              style={styles.input}
              placeholder={placeholder}
            />
          </View>
          :
          null
        }
      </KeyboardAvoidingView>
    )
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func,
  visible: PropTypes.bool,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
}

SearchInput.defaultProps = {
  onSearch: () => {},
  onBlur: () => {},
  visible: false,
  autoFocus: true,
  placeholder: '输入关键字进行搜索',
}
