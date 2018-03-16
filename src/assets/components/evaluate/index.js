/**
 * @desc 基本input框
 * @type {Object}
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  iconMap: {
    padding:5,
  },
  text: {
    width:50,
    textAlign:'center'
  }
})


export default class Evaluate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choosed: 5,
      text:'非常好'
    }
  }

  componentWillMount(){
    this.size=this.props.size
    if(this.props.size=='small'){
      this.size=20
      this.fontSize=12
    }else if (this.props.size=='large') {
      this.size=40,
      this.fontSize=16
    }else {
      this.size=30,
      this.fontSize=14
    }
  }
  getValue() {
    this.props.getValue(this.state.text)
  }
  handelSelect(item){
    let text
    this.setState({
      choosed: item,
    })
    if(item == 5){
       text = '非常好'
    }else if (item == 4) {
       text = '好'
    }else if (item == 3) {
      text = '一般'
    }else if (item == 2) {
      text = '差'
    }else if (item == 1) {
      text = '非常差'
    }
    this.setState({
      text:text
    })
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
        {
          [1,2,3,4,5].map( item =>
          <TouchableOpacity
          style={styles.iconMap}
          onPress={() => this.handelSelect(item)}
          key={item}>
          <Icon name="star" size={this.size} color={this.state.choosed >= item ? this.props.color : 'grey'} />
          </TouchableOpacity>)
        }
        <Text style={[styles.text,{fontSize:this.fontSize}]}>{ this.state.text }</Text>
        </View>
      </View>
    )
  }
}

Evaluate.propTypes = {
  size: PropTypes.any,
  color: PropTypes.any
}

Evaluate.defaultProps = {
  size: 'middle',
  color: 'red',
  getValue: () => {}
}
