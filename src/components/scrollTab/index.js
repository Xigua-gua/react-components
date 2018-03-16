import React, {Component} from 'react'
import {
  ScrollView,
  Button,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const DATA = [
  {
    key: '店长说',
  },
  {
    key: '遛娃打卡',
  },
  {
    key: '吃什么',
  },
  {
    key: '运动打卡',
  },
  {
    key: '妈妈优选',
  },
  {
    key: '花积分',
  },
  {
    key: '小城种植日记',
  },
  {
    key: '晒单',
  },
  {
    key: '建议与投诉',
  },
  {
    key: '在线等',
  },
]
export default class ScrollTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: DATA,
      active_index: 0,
      status: 100,
    }
  }
  componentDidMount() {
    this.handScrollTab(0)
  }
  // 滚动tab
  handScrollTab(index) {
    this.setState({
      active_index: index,
    })
    // if (index <= 5) {
      this.flatTab.scrollToIndex({
        index: index,
        viewOffset: 0,
        viewPosition: 0.5,
      })
    // }
  }
  handToRenderTab(data){
    this.handScrollTab(data.index)
    if (data.item && data.item.status) {
      this.setState({
        status: data.item.status,
      })
    }else {
      return
    }
  }
  _keyExtractor(item, index){
    return index
  }
  _renderItem(data) {
    return (
      <TouchableOpacity
        onPress={() => this.handToRenderTab(data)}
        style={{justifyContent:'center',paddingRight: 35,}}
        >
        <View style={this.state.active_index == data.index ? styles.active_item : styles.text_item}>
          <Text style={this.state.active_index == data.index ? {color: 'red'} : null}>{data.item.key}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={[{flex:1},this.props.style]}>
        <View style={styles.tab_bar}>
          <FlatList
            style={{width: width-20,paddingLeft:15,backgroundColor:'#fff'}}
            ref={(ref) => this.flatTab = ref}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={(row) => this._renderItem(row)}
          />
        </View>
        <View style={{flex: 1}}>
          {/* 此处加载 页面或组件*/}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab_bar:{
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    marginBottom: 10,
  },
  text_item: {
    flex:1,
    justifyContent:'center',
  },
  active_item: {
    flex:1,
    justifyContent:'center',
    borderColor:'red',
    borderBottomWidth: 2,
  },
})


ScrollTab.propTypes = {

}
