/**
 * @desc 银行卡选择器
 * @createDate 2017-10-18
 * */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  PixelRatio,
  TextInput,
  SectionList,
  Platform,
  Dimensions,
} from 'react-native'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { CITYLIST } from './data2'
import NavigatorBar from '../navigator'
import { navigate } from '../../navigate'
import styles from './style'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
const ITEM_HEIGHT = 45 //item的高度
const HEADER_HEIGHT = 20  //分组头部的高度
const SEPARATOR_HEIGHT = 0  //分割线的高度
function getLetters() {
  let arr = []
  let s = 'ABCDEFGHJKLMNPQRSTWXYZ'
  return s.split('')
}
// 首字母索引数组 letter
const letter = getLetters()

// 处理数据
function getSections(arr) {
  let data = []
  for (let i = 0; i < letter.length; i++) {
    data.push({key: letter[i],data:[]})
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (data[i].key == arr[j]['pinyin'][0] ) {
        data[i].data.push({title: arr[j]['name'], key: j})
      }
    }
  }
  // console.log('data->',data)
  return data
}
// 获取每个索引列表的高度 数组 totalheight
function getTotal() {
  const data = getSections(CITYLIST)
  let totalheight = []
  for (var i = 0; i < data.length; i++) {
    totalheight.push(HEADER_HEIGHT + ITEM_HEIGHT * data[i].data.length)
  }
  return totalheight
}

export default class CityPicker extends Component {
  constructor(props) {
    super(props)
    this.params = props.navigation.state.params
    this.state = {
      dataSource: getSections(CITYLIST),
      showFooter: true,
      text: '',
      lastPosition: '',
      initialPosition: '',
      jumpIndex: 0,
      currentCity: this.params.city,
      currentPosition: '杭州',
    }
    // this.totalheight= getTotal()
  }

  componentDidMount() {
  //定位
  //   navigator.geolocation.getCurrentPosition(
  //    (position) => {
  //      let initialPosition = JSON.stringify(position)
  //      this.setState({initialPosition})
  //      alert(initialPosition);
  //    },
  //    (error) => alert(JSON.stringify(error)),
  //    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //  )
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //      let lastPosition = JSON.stringify(position)
  //      this.setState({lastPosition})
  //    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }


  getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => 45,

      // These four properties are optional
      getSeparatorHeight: () => 0.2, // The height of your separators
      getSectionHeaderHeight: () => 20, // The height of your section headers
      getSectionFooterHeight: () => 0, // The height of your section footers
      listHeaderHeight: 0, // The height of your list header 列表标题的高度
    })
//
  renderFooter() {
    if (this.state.showFooter) {
      return (<Text style={styles.footer}>没有更多啦</Text>)
    }
    return null
  }

  // 跳转到所选索引的列表
  _onSectionselect(index){
    // console.log('letter[index]',letter[index])
    // let totalheight = getTotal()
    // console.log('totalheight->',totalheight)
    // let position = 0
    // for(let i = 0; i < index; i++){
    //    position += totalheight[i]
    // }
    if (this.state.jumpIndex == index ) {
      return
    }
    this.setState({
      jumpIndex: index,
    })
    this.sectionList.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: 20,
    })
  }
  jumpOut(item) {
    this.setState({
      currentCity: item.title,
    })
    this.params.callback(item.title)
    this.props.navigation.goBack()
  }
  //分组列表
  _renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.jumpOut(item)}
        >
          <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  // 分组头
  _renderSectionHeader(section) {
    return (
      <View style={styles.headerlist}>
        <Text style={styles.headertext}>{section.key}</Text>
      </View>
    )
  }
  // 首字母索引
  _renderLetters(letter, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={()=>this._onSectionselect(index)}
        >
        <View style={styles.letter}>
            <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  handleSearch(t) {
    // console.log('data->',this.state.dataSource)
    // console.log('t',t)
    this.setState({
      text: t,
    })
    const arr = []
    const reg = new RegExp(t)
    // this.state.dataSource.forEach(
    //   (i) => {
    //   i.label.match(reg) ?
    //   arr.push(i.label)
    //   :
    //   null
    //   },
    // )
    // console.log('arr->',arr);
    // arr.length > 0 ?
    //   this.setState({
    //     // datasValue: arr,
    //   })
    // :
    //   this.setState({
    //     // datasValue: [],
    //   })
  }
  render() {
    // console.log('data->',this.state.dataSource);
    return (
      <View style={styles.container}>
        <NavigatorBar
          navigation={this.props.navigation}
          name='选择城市'
          needVerity
          onReturn={() => this.props.navigation.goBack()}
        />
        <TextInput
          style={{height: 32,marginLeft: 10,paddingBottom:2,
            backgroundColor:'#D3D3D3',marginTop: 5,borderRadius:5,paddingTop:2}}
          onChangeText={(text) => this.handleSearch(text)}
          width={300}
          value={this.state.text}
          placeholder='城市/拼音'
          underlineColorAndroid='transparent'
          inlineImageLeft='./icon-enter.png'
        />
      <View style={{marginBottom:5}}>
        <Text style={{marginLeft : 10,marginTop: 5,marginBottom:5}}>当前选择:</Text>
        <View style={{}}>
          <Text style={{marginLeft: 16,color: '#333',}}>{this.state.currentCity}</Text>
        </View>
        <Text style={{marginLeft : 10,marginTop: 5,marginBottom:5}}>定位/最近访问</Text>
        <View style={{}}>
          <Text style={{marginLeft: 16,color: '#333',}}>{this.state.currentPosition}</Text>
        </View>
        <Text style={{marginLeft : 10,marginTop: 5}}>城市列表</Text>
      </View>
      <View style={styles.sections}>
        <View style={styles.letters}>
          {letter.map((i, index) => this._renderLetters(i, index))}
        </View>
        <SectionList
          ref={ref => this.sectionList = ref}
          renderItem={({item}) => this._renderItem(item)}
          renderSectionHeader={({section}) => this._renderSectionHeader(section)}
          sections={this.state.dataSource}
          stickySectionHeadersEnabled={true}
          ItemSeparatorComponent={() => (<View style={{backgroundColor: '#eee', height:0.2}}></View>)}
          ListFooterComponent={() => (<Text style={styles.footerText}>没有更多啦</Text>)}
          getItemLayout={this.getItemLayout}
        />
      </View>
      </View>
    )
  }
}

CityPicker.navigationOptions = {
  header: null,
}

CityPicker.propTypes = {
  navigation: PropTypes.object.isRequired,
}
