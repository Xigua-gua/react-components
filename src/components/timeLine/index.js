import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image,
} from 'react-native';
import styles from './style'
const width = Dimensions.get('window').width * 0.8
const height = Dimensions.get('window').height

export default class Timeline extends Component {
  constructor(props) {
    super(props)
  }
  renderRow(row) {
    const DATA = this.props.dataSource
    const circleStyle = row.index == 0  ? styles.circle0 : styles.circle
    const line = row.index == DATA.length - 1 ? null : (<View style={styles.line}></View>)
    return(
      <View style={styles.item_row}>
        <View style={styles.leftitem}>
          <Text style={styles.text_month}>2017-11-23</Text>
          <Text style={styles.text_min}>21:12:21</Text>
        </View>
        <View style={styles.lineitem}>
          <View style={[styles.line, {height: 4}]}></View>
          <View style={circleStyle}></View>
          <View style={[styles.line, {flex: 1}]}></View>
        </View>
        <View style={styles.rightitem}>
          {this.props.renderRight ? this.props.renderRight(row.item) : null}
        </View>
      </View>
    )
  }
  _keyExtractor(item, index){
    return item.id
  }
  renderFooter() {
    return (<Text style={styles.footerText}>没有更多啦</Text>)
  }
  render() {
    const {
      dataSource,
      renderRight,
    } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.props.dataSource}
          renderItem = {(row) => this.renderRow(row)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
