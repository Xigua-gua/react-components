import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Picker,
  Modal,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native'
import { ADDRESSLIST } from './data0'
//import Toast from '@remobile/react-native-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './style'

const width = Dimensions.get('window').width
const pixel = 1 / PixelRatio.get()
const TABS = [
  {
    type: 'province',
    value: '省/直辖',
  },
  {
    type: 'city',
    value: '市/市辖'
  },
  {
    type: 'county',
    value: '区/县',
  },
]
function processData(data) {
  return data.map(item => ({
    key: item.value,
    ...item,
  }))
}

export default class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      active: 0,
      provinceData: processData(ADDRESSLIST),
      cityData: [],
      countyData: [],
      province: '',
      city: '',
      county: '',
      address: '',
      choose: '',
      addressList: [],
    }
  }
  callBackAddress() {
    const { province, city, county, address, addressList} = this.state
    this.setState({
      address: province + city + county,
      addressList: [province,city,county],
    },() => {
      this.props.getAddress(this.state.address, this.state.addressList)
    })
  }
  open() {
    this.setState({
      visible: true,
      active: 0,
    })
  }
  close() {
    this.setState({ visible: false })
  }
  handleSwitch(index) {
    const offsetX = width * index
    this.list.scrollTo({ y: 0, x: offsetX })
  }
  handleScroll(e) {
    const offsetX = e.nativeEvent.contentOffset.x
    TABS.forEach((item, i) => {
      if (Math.round(offsetX) === Math.round(width * i)) {
        this.setState({
          active: i,
        })
      }
    })
  }
  handleBack(t) {
    const {type} = this.props
    if (type == t) {
      this.callBackAddress()
      this.close()
    }else {
      return
    }
  }
  handlePress(data,type) {
    // console.log('data->',data);
    // console.log('type->',type);
    const { province, city, county, address} = this.state
    switch (type) {
      case 'province':
        this.setState({
          cityData: data.children,
          countyData: [],
          province: data.label,
          city: '',
          county: '',
          choose: data.label
        },() => {
          this.handleBack(type)
          this.list.scrollTo({ y: 0, x: width})
        })
        break;
      case 'city':
        this.setState({
          countyData: data.children,
          city: data.label,
          county: '',
          choose: data.label,
        },() => {
          this.handleBack(type)
          this.list.scrollTo({ y: 0, x: width * 2})})
        break;
      case 'county':
        this.setState({
          county: data.label,
          choose: data.label,
        },() => {
          this.callBackAddress()
          // console.log('active ->',this.state.active);
          this.close()
        })
        break;
      default:
    }
  }
  renderItem(data,type) {
    // console.log('choose 原始',this.state.choose);
    return (
      <View>
        <TouchableOpacity
          key={data.key}
          onPress={() => this.handlePress(data,type)}>
          <View style={styles.item}>
            {
              this.state.choose === data.label ?
              <Text style={styles.itemText}>{data.label}✔️</Text>
              :
              <Text style={styles.itemText}>{data.label}</Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  _keyExtractor(item, index){
    return index
  }
  renderTabs() {
    return (
      <View style={styles.text_tab}>
        {
          TABS.map((item,index) => {
            let value = ''
            switch (item.type) {
              case 'province':
                value = this.state.province
                break;
              case 'city':
                value = this.state.city
                break;
              case 'county':
                value = this.state.county
                break;
              default:
            }
            return (
              <TouchableOpacity
                key={index}
                style={styles.text_def}
                onPress={() => this.handleSwitch(index)}
                >
                <Text style={this.state.active == index ? styles.active : styles.tabText}>
                  {value ? value : item.value}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  _renderListItem() {
    return(
        TABS.map((item,index) =>
        {
          let data = []
          switch (item.type) {
            case 'province':
              data = this.state.provinceData
              break;
            case 'city':
              data = this.state.cityData
              break;
            case 'county':
              data = this.state.countyData
              break;
            default:
          }
          if (!!data.length) {
            return (
              <FlatList
                key={index}
                data={data}
                onEndReachedThreshold={0.5}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                renderItem={(row) => this.renderItem(row.item,item.type)}
              />
            )
          }else {
            return (
              <Text key={index} style={styles.footerText}>请选择上一级地址</Text>
            )
          }
        }
      )
    )
  }
  renderList() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ref={(ref) => this.list = ref }
        onScroll={e => this.handleScroll(e)}
        >
        { this._renderListItem()}
      </ScrollView>
    )
  }
  render() {
    return (
      <View>
        <Modal
          style={styles.modal}
          transparent={true}
          visible={this.state.visible}
          animationType="fade"
          onRequestClose={() => this.close()}
          >
          <TouchableHighlight
            style={styles.modalCont}
            onPress={ () => this.close()}
          ><Text></Text></TouchableHighlight>
          <View style={styles.pickerBox}>
            <View style={styles.title}>
              <Text style={{fontSize: 18,color:'black',}}>选择地区</Text>
            </View>
            {this.renderTabs()}
            {this.renderList()}
          </View>
        </Modal>
      </View>
    )
  }
}

Address.propTypes = {
  type: PropTypes.string,
  getAddress: PropTypes.func,
}

Address.defaultProps = {
  type: 'city',
  getAddress:()=>{},
}
