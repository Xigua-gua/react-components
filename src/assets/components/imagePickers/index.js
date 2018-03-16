/**
 * @desc 图片选择器 version2（支持多图）
 * @author Jafeney<jafeney@yijunet.cc>
 用法：
 import Picker from '../../components/imagePickers'
 <Picker
   onSelectImage={(photo) => {}}
   navigation={this.props.navigation}
   imgsNumber={this.imgs.length || 0}
   ref={(ref) => { this.imagePicker = ref }}
   onSelectImage={(imgs) => this.onSelectImage(imgs)}
   onRemoveImage={(p) => {}}
 />
 onSelectImage(imgs) {
   //console.log(imgs)
   imgs.forEach((img) => {
     uploadFile(img, (progress) => {
       this.imagePicker.updateImages({
         ...img,
         progress,
       })
       if (progress === 1) {
         this.imgs.push({
           url: `${QN_URL}${img.key}`,
         })
       }
     }).then().catch(() => { console.log('上传失败') })
   })
  }
 * @datetime 2016-08-29
 **/
import uuid from 'uuid'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  PixelRatio,
  Platform,
  ProgressViewIOS,
  ProgressBarAndroid,
  ActivityIndicator,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
//import ImagePickerAndroid from 'react-native-image-picker'

const optionsAndroid = {
  title: '选择上传图片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从库中选择...', // specify null or empty string to remove this button
  // customButtons: {
  //    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo',
  // videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 600, // photos only
  maxHeight: 600, // photos only
  allowsEditing: true,
  noData: false,
}

const optionsSigle = {
  cropping: true,
  width: 300,
  height: 300,
  compressImageQuality: 0.75,
  mediaType: 'photo',
  loadingLabelText: 'loading',
  enableRotationGesture: true,
}

const optionsMultiple = {
  multiple: true,
  //maxFiles: 6,
  mediaType: 'photo',
  compressImageQuality: 0.75,
  compressImageMaxWidth: 300,
  compressImageMaxHeight: 300,
  smartAlbums: ['PhotoStream'],
  includeBase64: false,
}

const IconAdd = require('./icon-add.png')

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const styles = {
  container: {
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 10,
  },
  uploadBtn: {
    marginLeft: 15,
    marginTop: 10,
    width: Window.width / 5,
    height: Window.width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#D3D3D3',
    borderRadius: 3,
  },
  imgBox: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: Window.width * 0.27,
    height: Window.width * 0.20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 3,
    alignItems: 'flex-end',
  },
  modal: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
    width: Window.width * 0.27,
    height: Window.width * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  progressView: {
    width: 50,
  },
  progressBar: {},
}

export default class ImagePickers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: props.defaultImages || [],
    }
  }
  getValue() {
    return this.state.imgs
  }
  updateImages(newImg) {
    this.setState({
      imgs: this.state.imgs.map((item) => {
        if (item.key === newImg.key) return newImg
        return item
      }),
    })
  }
  handleImagePress(imgs, i) {
    this.props.navigation.navigate('ImageViewer', {
      imgSource: imgs,
      deletabled: true,
      curIndex: i,
      onDelete: idx => this.handleDeleteImage(idx),
    }, this.props.navigation)
  }
  handleDeleteImage(idx) {
    const removeKey = this.state.imgs.find((item, i) => i === idx)
    this.setState({
      imgs: this.state.imgs.filter((item, i) => i !== idx),
    }, () => {
      this.props.onRemoveImage(removeKey)
    })
  }
  handleTakePhoto() {
    ImagePicker.openCamera(optionsSigle).then((images) => {
      const imgs = images.map(item => (
        {
          uri: item.path,
          name: 'img',
          type: item.mime,
          isLocal: true,
          progress: 0,
        }
      ))
      this.setState({
        imgs: [...this.state.imgs, ...imgs],
      }, () => this.props.onSelectImage(imgs))
    }, () => { console.log('拍照失败') })
    .catch(err => console.log(err))
  }
  handleSelectImg() {
    // if (this.state.imgs.length >= 3) {
    //   Toast.showShortBottom('只允许上传3张图片')
    //   return
    // }
    // Android版本 部分图片格式可能不兼容
    //if (Platform.OS === 'ios' || Platform.OS === 'android') {
    ImagePicker.openPicker(optionsMultiple).then((images) => {
      console.log('openPicker images->',images);
      //const i = 3 - this.props.imgsNumber
      const imgs = images.map(item => (
        {
          key: uuid.v4(),
          uri: item.path,
          name: 'img',
          type: item.mime,
          isLocal: true,
        }
      ))
      this.setState({
        imgs: [...this.state.imgs, ...imgs],
      }, () => this.props.onSelectImage(imgs))
    }, () => { console.log('图片选择失败') })
    .catch(err => console.log(err))
  }
  renderImg() {
    // if(this.state.imgs.length >3) {
    //   Toast.showShortBottom('超过3张默认上传前3张哦～')
    // }
    return this.state.imgs.map((item, i) => (
      <TouchableOpacity
        style={{ position: 'relative' }}
        key={item.key}
        onPress={() => this.handleImagePress(this.state.imgs, i)}
      >
        <Image style={styles.img} source={item} />
        {
          item.progress !== 1 ?
            <View style={styles.modal}>
              {
              Platform.OS === 'ios' ?
                <ProgressViewIOS
                  style={styles.progressView}
                  progress={item.progress}
                />
              :
                <ActivityIndicator
                  style={styles.progressBar}
                  progress={item.progress}
                />
            }
            </View>
          :
          null
        }
      </TouchableOpacity>
      ))
  }
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View
          style={styles.imgBox}
        >
          { this.renderImg() }
        </View>
        <TouchableOpacity
          onPress={() => this.handleSelectImg()}
          style={styles.uploadBtn}
        >
          <Image source={IconAdd} />
        </TouchableOpacity>
      </View>
    )
  }
}

ImagePickers.propTypes = {
  containerStyle: View.propTypes.style,
  defaultImages: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  imgsNumber: PropTypes.number,
}

ImagePickers.defaultProps = {
  containerStyle: {},
  defaultImages: [],
  imgsNumber: 0,
  onSelectImage: () => {},
  onRemoveImage: () => {},
}
