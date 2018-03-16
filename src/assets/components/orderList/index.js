
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ListView,
  Platform,
  Dimensions,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/dist/Entypo'
import {Color, Size } from '../../containers/global'
import CountDown from '../countDown'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class OrderList extends Component {
  constructor(props) {
    super(props)
    const status = (props.data.next_status) ? props.data.next_status : props.data.status
    this.state = {
      dataSource: props.data,
      status: status,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props && nextProps) {
      const status = (nextProps.data.next_status) ? nextProps.data.next_status : nextProps.data.status
      this.setState({
        dataSource: nextProps.data,
        status: status,
      })
    }
  }
  handleToDetail() {
    // console.log('进入订单详情页')
    this.props.navigation.navigate('OrderDetail',{data: this.props.data})
  }
  handleToStatus() {
    // console.log('进入订单状态页')
    this.props.navigation.navigate('OrderStatus',{id: this.props.data.id})
  }

  renderFooter() {
    const {dataSource} = this.state
    const data = dataSource.cargo
    if (this.props.type == 'detail') {
      return (
          <View style={styles.time}>
            <Text style={styles.text_small}>
              来源: {data.company.company_name}
            </Text>
          </View>
      )
      // return (
      //   <View style={styles.time}>
      //     <Text style={[styles.text_small,{color: '#999999'}]}>已于 2017-11-13 10:13 出发</Text>
      //     <Text style={styles.time_status}>提前2小时</Text>
      //   </View>
      // )
    }else if (this.props.type == 'list') {
      return (
        <View style={styles.item1}>
          <Text style={styles.text_small}>
            来源: {data.company.company_name}
          </Text>
          <TouchableOpacity
            onPress={() => this.handleToDetail()}
            >
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.text_detail}>查看详情</Text>
              <Icon name="chevron-small-right" size={18} color='#9B9B9B' />
            </View>
          </TouchableOpacity>
        </View>
      )
    }else {
      return null
    }
  }
  render() {
    const {dataSource, status} = this.state
    const data = dataSource.cargo
    let color = '#F5A623'
    const itemStyles = [styles.item]
    if (this.props.type == 'quote' ) {
      itemStyles.push({height: height /5})
    }
    if (this.props.type == 'detail' ) {
      color = '#E96070'
    }
    if (this.props.type == 'list') {
      icon = <Icon name="chevron-small-right" size={21} color={color} />
    }else {
      icon = null
    }
    return (
      <View style={itemStyles}>
        <View style={styles.item1}>
          <Text style={{color: '#333333'}}>
            {data.content && data.content.length > 20 ?
              `${data.content.slice(0,20)}...`
            : data.content}
          </Text>
          {
          this.props.type == "quote" ?
            <CountDown fontSize={14} color='#F5A623' time={500}/>
            :
            status == 100 || status == 300 ?
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color: '#E96070',fontSize: 14,}}>{dataSource.status_name}  </Text>
            </View>
            :
            <TouchableOpacity
              disabled={this.props.type == 'detail' ? true : false}
              onPress={() => this.handleToStatus()}
              >
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color: color,}}>{dataSource.status_name}</Text>
                {icon}
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.item2}>
            <View style={styles.text_row1}>
              <Image source={require('./icon-start.png')} />
              <View style={styles.text_between}>
                <Text style={styles.text_small}>{data.orig_city}</Text>
                <Text style={styles.text_xsmall}>
                  {data.start_time ? `计划 ${data.start_time} 发货` : ' -'}
                </Text>
              </View>
            </View>
            <View style={styles.row_center}>
              <Image source={require('./icon-end.png')} />
              <View style={styles.text_between}>
                <Text style={styles.text_small}>{data.dest_city}</Text>
                <Text style={styles.text_xsmall}>
                  {data.end_time ? `计划 ${data.end_time} 到货` : ' -'}
                </Text>
              </View>
            </View>
        </View>
        {this.renderFooter()}
      </View>
    )
  }
}

OrderList.propTypes = {
  type: PropTypes.string,
  navigation: PropTypes.object.isRequired,
}
OrderList.defaultProps = {
  type: 'list',
  data: {},
}
