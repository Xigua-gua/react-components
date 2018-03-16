import React, { Component} from 'react'
import {
  View,
  Text,
  FlatList,
  ListView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {DATA} from './data'
// 获取屏幕宽度
let {width} = Dimensions.get('window')

export default class Grid extends Component {
  constructor(props) {
    super(props)
  }
  renderItem(dataSource,autoViewStyle,imagesStyle) {
    let items = []
    for (var i = 0; i < dataSource.length; i++) {
      let item = dataSource[i]
      items.push(
        <View key={i} style={autoViewStyle}>
          <View style={styles.centerStyle}>
            <Image style={imagesStyle} source={{uri:item.url}} />
            <Text style={styles.textsStyle}>{item.content}</Text>
          </View>
        </View>
      )
    }
    return items
  }
  render() {
    const {
      dataSource,
      cols,
    } = this.props
    let mWidth = width / (cols + 1)
    let vMargin = (width - cols * width / (cols + 1)) / (cols + 1)
    let hMargin = 20
    let imgWidth = mWidth * 0.7
    const autoViewStyle = [styles.autoViewStyle]
    const imagesStyle = []
    imagesStyle.push({
      width: mWidth * 0.7,
      height: mWidth * 0.7,
    })
    autoViewStyle.push({
      width: mWidth,
      height: mWidth,
      marginLeft: vMargin,
      marginTop: hMargin,})
    return (
      <View style={styles.container}>
        {this.renderItem(dataSource,autoViewStyle,imagesStyle)}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  autoViewStyle: {
    backgroundColor: '#00a854',
    alignItems: 'center',
  },
  centerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
