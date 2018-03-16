/**
 * @desc 图片查看器 - 内嵌式
 * @author Jafeney<jafeney@yijunet.cc>
 * @datetime 2016-10-09
 **/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'


const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  img: {
    width: Window.width,
    height: Window.width,
  },
  counter: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  counterText: {
    fontSize: 13,
    color: '#fff',
  },
  haveNoPic:{
    width: Window.width,
    height:350,
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  NoPic: {
    fontSize:16,
    color:'#999',
  },
})

class ImageViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSource: this.props.dataSource,
      curIndex: this.props.curIndex,
    }
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
    this.props.onLoadStart()
  }
  handleLoadEnd(key) {
    if (key === this.state.imgSource.length - 1) {
      this.props.onLoadEnd()
    }
  }
  handlePress(item, imgs) {
    this.props.onPress(item, imgs)
  }
  renderImgs(imgs) {
    if (imgs.length > 0) {
      return imgs.map((item, i) => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={1}
          onPress={() => this.handlePress(imgs, i)}
        >
          <Image
            onLoadStart={() => this.handleLoadStart()}
            onLoadEnd={() => this.handleLoadEnd(item.key)}
            source={item.preview}
            style={styles.img}
          />
        </TouchableOpacity>
        ))
    } else {
      return(
        <View style={styles.haveNoPic}>
          <Text style={styles.NoPic}>没有提供图片</Text>
        </View>
        )
    }
  }
  render() {
    const { curIndex, imgSource } = this.state
    return (
      <View style={[{ position: 'relative' }, this.props.style]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => this.handleScroll(e)}
          scrollEventThrottle={16}
          horizontal
        >
          { this.renderImgs(this.state.imgSource) }
        </ScrollView>
        {this.state.imgSource.length ?
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {`${curIndex + 1}/${imgSource.length}`}
            </Text>
          </View>
          : null}
      </View>
    )
  }
}

ImageViewer.propTypes = {
  style: ScrollView.propTypes.style,
  dataSource: PropTypes.array.isRequired,
  curIndex: PropTypes.number,
  onLoadStart: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onPress: PropTypes.func,
}

ImageViewer.defaultProps = {
  style: {},
  curIndex: 0,
  onLoadStart: () => {},
  onLoadEnd: () => {},
  onPress: () => {},
}

export default ImageViewer
