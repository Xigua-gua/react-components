/**
 * @desc 图片查看器 - 全屏幕
 * @author Jafeney<jafeney@yijunet.cc>
 * @datetime 2016-10-09
 **/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
  Platform,
  CameraRoll,
} from 'react-native'


const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navigator: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: Window.width,
    height: Platform.OS === 'ios' ? 64 : 44,
    paddingTop: Platform.OS === 'ios' ? 20 : null,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  navTitle: {
    fontSize: 18,
    color: '#fff',
    width: 50,
    textAlign: 'left',
  },
  navBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 12,
  },
  navText: {
    color: '#fff',
    marginLeft: 10,
  },
  img: {
    width: Window.width,
    height: Window.height,
  },
  modal: {
    position: 'absolute',
    width: Window.width,
    height: Window.height,
    zIndex: 11,
    top: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  deleteModal: {
    position: 'absolute',
    width: Window.width,
    height: Platform.OS === 'ios' ? 164 : 184,
    zIndex: 12,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.25)',
  },
  delTitle: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  delText: {
    fontSize: 14,
    color: '#333',
  },
  modalBtn: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ddd',
    height: 50,
    width: Window.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

class ImageViewer extends Component {
  constructor(props) {
    super(props)
    this.params = props.navigation.state.params
    this.state = {
      imgSource: this.params.imgSource,
      curIndex: this.params.curIndex || 0,
      deletabled: this.params.deletabled,
      showDelModal: false,
      navOpacity: new Animated.Value(1),
      modalOpacity: new Animated.Value(0),
    }
  }
  componentDidMount() {
    const initScrollValue = Window.width * this.state.curIndex
    setTimeout(() =>{
      this.scrollView.scrollTo({ y: 0, x: initScrollValue,animated: false })
    }, 500)
  }
  handleReturn() {
    this.props.navigation.goBack()
  }
  handleDelete() {
    const newImgs = this.state.imgSource
      .filter((item, i) => i !== this.state.curIndex)
    this.setState({
      imgSource: newImgs,
      showDelModal: false,
      showSaveModal: false,
      modalOpacity: new Animated.Value(0),
    }, () => {
      this.params.onDelete && this.params.onDelete(this.state.curIndex)
      if (newImgs.length === 0) {
        this.props.navigation.goBack()
      }
    })
  }
  handleToggleNavbar() {
    if (this.state.navOpacity._value === 1) {
      Animated.timing(this.state.navOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
      }).start()
    } else {
      Animated.timing(this.state.navOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }).start()
    }
  }
  handleOpenDelModal() {
    this.setState({
      showDelModal: true,
    }, () => {
      Animated.timing(this.state.modalOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }).start()
    })
  }
  handleOpenSaveModal(url) {
    this.currentImg = url
    this.setState({
      showSaveModal: true,
    }, () => {
      Animated.timing(this.state.modalOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }).start()
    })
  }
  handleCloseModal() {
    this.setState({
      showDelModal: false,
      showSaveModal: false,
      modalOpacity: new Animated.Value(0),
    })
  }
  handleSaveImg() {
    CameraRoll.saveToCameraRoll(this.currentImg)
      .then(() => {
        this.handleCloseModal()
      })
      .catch(() => console.log('保存失败'))
  }
  handleScroll(e) {
    const offsetX = e.nativeEvent.contentOffset.x
    if (Math.floor(offsetX % Window.width) === 0 || Math.floor(offsetX % Window.width) === Math.round(Window.width) ) {
      this.setState({
        curIndex: Math.round(offsetX / Window.width),
      })
    }
  }
  handleLoadStart() {
    this.params.onLoadStart && this.params.onLoadStart()
  }
  handleLoadEnd(key) {
    if (key === this.state.imgSource.length - 1) {
      this.params.onLoadEnd && this.params.onLoadEnd()
    }
  }
  renderImgs(imgs) {
    return imgs.map((item, i) => (
      <TouchableOpacity
        key={i}
        activeOpacity={1}
        onPress={() => this.handleToggleNavbar()}
        delayLongPress={2000}
        onLongPress={() => this.handleOpenSaveModal(item ? item : item.uri)}
      >
        <Image
          onLoadStart={() => this.handleLoadStart()}
          onLoadEnd={() => this.handleLoadEnd(i)}
          source={{uri: item}}
          resizeMode="contain"
          style={styles.img}
        />
      </TouchableOpacity>
      ))
  }
  renderNavbar() {
    const { curIndex, imgSource, navOpacity, deletabled } = this.state
    const title = `${String(curIndex + 1)}/${imgSource.length}`
    return (
      <Animated.View
        style={[styles.navigator, { opacity: navOpacity }]}
      >
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => this.handleReturn()}
        >
          <Image source={require('./icon-return.png')} />
          <Text style={styles.navText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>{title}</Text>
        { deletabled ?
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => this.handleOpenDelModal()}
          >
            <Image
              style={{ marginTop: 5 }}
              source={require('./icon-delete.png')}
            />
          </TouchableOpacity>
          :
          null
        }
      </Animated.View>
    )
  }
  renderDelModal() {
    if (this.state.showDelModal) {
      return (
        <Animated.View
          style={[styles.modal, { opacity: this.state.modalOpacity }]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => this.handleCloseModal()}
          >
            <View style={styles.deleteModal}>
              <View style={styles.delTitle}>
                <Text style={styles.delText}>要删除这张照片吗？</Text>
              </View>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => this.handleDelete()}
              >
                <Text style={{ color: '#f00' }}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { marginTop: 4 }]}
                onPress={() => this.handleCloseModal()}
              >
                <Text style={{ color: '#666' }}>取消</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )
    }
    return null
  }
  renderSaveModal() {
    if (this.state.showSaveModal) {
      return (
        <Animated.View
          style={[styles.modal, { opacity: this.state.modalOpacity }]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => this.handleCloseModal()}
          >
            <View style={styles.deleteModal}>
              <View style={styles.delTitle}>
                <Text style={styles.delText}>要保存这张照片吗？</Text>
              </View>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => this.handleSaveImg()}
              >
                <Text style={{ color: '#f00' }}>保存</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { marginTop: 4 }]}
                onPress={() => this.handleCloseModal()}
              >
                <Text style={{ color: '#333' }}>取消</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )
    }
    return null
  }
  render() {
    return (
      <View style={styles.container}>
        { this.renderNavbar() }
        <ScrollView
          ref={(ref) => { this.scrollView = ref }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => this.handleScroll(e)}
          scrollEventThrottle={16}
          horizontal
        >
          { this.renderImgs(this.state.imgSource) }
        </ScrollView>
        { this.renderDelModal() }
        { this.renderSaveModal() }
      </View>
    )
  }
}

ImageViewer.navigationOptions = {
  header: null,
}

ImageViewer.propTypes = {
  navigation: PropTypes.object.isRequired,
}

ImageViewer.defaultProps = {
  deletabled: false,
}

export default ImageViewer
