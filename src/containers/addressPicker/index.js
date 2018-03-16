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
  RefreshControl,
  PixelRatio,
  TextInput,
} from 'react-native'
import { ADDRESSLIST } from './data'
import NavigatorBar from '../navigator'
import { navigate } from '../../navigate'
import Search from './search'

const pixel = 1 / PixelRatio.get()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  list: {
    marginTop: 10,
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(211,211,211,.5)',
    borderBottomWidth: pixel,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    fontSize: 14,
    color: '#ABABAB',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
})
function processData(data) {
  return data.map(item => ({
    key: item.value,
    ...item,
  }))
}

export default class AddressPicker extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    this.state = {
      dataSource: processData(ADDRESSLIST),
      showFooter: true,
      text: '',
      status: this.params.status,
    }
  }

  handleChange(data) {
    // console.log('data->',data)
    const {dataSource, status} = this.state
    if (status == 'city') {
      this.setState({
        dataSource: processData(data.children),
        status: '',
        text: '',
      })
    }
    else if (status == 'district') {
      if (!data.hasOwnProperty('children')) {
        this.params.callback(data.label)
        this.props.navigation.goBack()
      }else {
        this.setState({
          dataSource: processData(data.children),
        })
      }
    }
    else {
      this.params.callback(data.label)
      this.props.navigation.goBack()
    }
  }
  //搜索过滤
  // handleSearch(t) {
  //   // console.log('data->',this.state.dataSource)
  //   // console.log('t',t)
  //   this.setState({
  //     text: t,
  //   })
  //   const arr = []
  //   const reg = new RegExp(t)
  //   this.state.dataSource.forEach(
  //     (i) => {
  //     i.label.match(reg) ?
  //     arr.push(i.label)
  //     :
  //     null
  //     },
  //   )
  //   console.log('arr->',arr);
  //   arr.length > 0 ?
  //     this.setState({
  //       // datasValue: arr,
  //     })
  //   :
  //     this.setState({
  //       // datasValue: [],
  //     })
  // }


  renderItem(data) {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleChange(data)}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{data.label}</Text>
            <Image source={require('./icon-enter.png')} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  renderFooter() {
    if (this.state.showFooter) {
      return (<Text style={styles.footer}>没有更多啦</Text>)
    }
    return null
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigatorBar
          navigation={this.props.navigation}
          name='选择城市'
          needVerity
          onReturn={() => this.props.navigation.goBack()}
        />
        <Text style={{marginLeft : 10,marginTop: 5,marginBottom:5}}>当前城市</Text>
        <View style={{}}>
          <Text style={{marginLeft: 16,color: '#333',}}>杭州</Text>
        </View>
        <Text style={{marginLeft : 10,marginTop: 5}}>省市列表</Text>
        <FlatList
          ref={(ref) => { this.list = ref }}
          data={this.state.dataSource}
          initialNumToRender={13}
          onEndReachedThreshold={0.5}
          style={styles.list}
          renderItem={row => this.renderItem(row.item)}
          ListFooterComponent={() => this.renderFooter()}
        />
      </View>
    )
  }
}

AddressPicker.navigationOptions = {
  header: null,
}

AddressPicker.propTypes = {
  navigation: PropTypes.object.isRequired,
}
