/**
 * @desc 头像选取组件
 * @author Jafeney<Jafeney@yijunet.cc>
 * @date 2017-06-28
 */

import uuid from 'uuid'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Modal,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import styles from './style'

const optionsSigle = {
  cropping: true,
  width: 300,
  height: 300,
  mediaType: 'photo',
  compressImageQuality: 0.75,
  loadingLabelText: 'loading',
  //enableRotationGesture: false,
}

//const windowHeight =  Dimensions.get('window').height

export default class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      height: new Animated.Value(0)
    }
    this.loading = false
  }

  close() {
    this.closeAnimate = Animated.timing(
      this.state.height,
      {
        delay: 0,
        duration: 300,
        easing: Easing.linear(),
        toValue: 0,
      }
    ).start()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        visible: false,
      })
    }, 300)
  }
  open(opt = {}) {
    this.setState({
      id: opt.id,
      visible: true,
      isCollected: opt.isCollected,
      isMy: opt.isMy,
    },() => {
      //this.animate && this.animate.stop()
      this.animate = Animated.timing(
        this.state.height,
        {
          delay: 50,
          duration: 300,
          easing: Easing.linear(),
          toValue: 170,
        }
      )
      this.animate.start()
    })
  }

  handleTakePhoto() {
    ImagePicker.openCamera(optionsSigle).then((img) => {
      const photo = {
        key: uuid.v4(),
        uri: img.path,
        name: 'thumb',
        type: img.mime,
        isLocal: true,
        progress: 0,
      }
      this.setState({
        form: {
          ...this.state.form,
          photo,
        },
      }, () => this.props.onUpload(photo))
    }, () => { console.log('拍照失败') })
    .catch(err => console.log(err))
  }

  handleSelectImg() {
    this.loading = true
    ImagePicker.openPicker(optionsSigle).then((img) => {
      //console.log(img)
      this.loading = false
      const photo = {
        key: uuid.v4(),
        uri: img.path,
        name: 'thumb',
        type: img.mime,
        isLocal: true,
        progress: 0,
      }
      this.setState({
        form: {
          ...this.state.form,
          photo,
        },
      }, () => this.props.onUpload(photo))
    }, () => {
      console.log('图片选择失败')
      this.loading = false
    })
    .catch(err => console.log(err))
  }

  renderContent() {
      return (
        <Animated.View
          style={{backgroundColor:'#efefef',height: this.state.height}}
        >
          <TouchableOpacity
            onPress={() => this.handleTakePhoto()}
            style={[styles.btn, styles.bb]}
          >
            <View>
              <Text style={styles.btnText}>拍照上传</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.loading ?
                null
              :
                this.handleSelectImg()
            }}
            style={styles.btn}
          >
            <View>
              <Text style={styles.btnText}>选择图片</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.close()
              this.loading = false
            }}
            style={[styles.btn, styles.mt5]}
          >
            <View>
              <Text style={styles.btnText}>取消</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        animationType="none"
        transparent={ true }
        onRequestClose={() => {this.close()}}
      >
      <TouchableOpacity
        style={ styles.modalBox }
        onPress={ () => this.close() }
      />
      { this.renderContent() }
      </Modal>
    )
  }
}

MyComponent.propTypes = {
  onUpload: PropTypes.func,
}

MyComponent.defaultProps = {
  onUpload: () => {},
}
