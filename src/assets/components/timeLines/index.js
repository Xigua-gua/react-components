      /**
 * @desc 时间轴
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
  TextInput,
  Dimensions
} from 'react-native'
//import Toast from '@remobile/react-native-toast'
import { Size, Color } from '../../containers/global'

const Window = {
 width: Dimensions.get('window').width,
 height: Dimensions.get('window').height,
}
const styles = StyleSheet.create({
  container:{
    height:46,
    marginBottom:26,
    marginTop:10,
    alignItems:'center',
    flexDirection:'row',
    width:Window.width,
    paddingLeft:16,
    paddingRight:16,
  },
  blackLibe:{
    width:'100%',
    borderWidth:1,
    borderColor:'#CDCDCD',
    position:'absolute',
    left:16,
    right:16,
    top:20
  },
  redLibe:{
    width:'100%',
    borderWidth:1,
    borderColor:'#DE3619',
    position:'absolute',
    left:16,
    right:16,
    top:20
  },
  pointContainer:{
    position:'absolute',
    left:16,
    right:16,
    top:16,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  point:{
    width:10,
    height:10,
    backgroundColor:'#9B9B9B',
    borderRadius:5
  },
  textContainer:{
    position:'absolute',
    left:16,
    right:16,
    top:36,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  text:{
     fontSize:12,
     color:'#4A4A4A'
  }
})
export default class TimeLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1:'#9B9B9B',
      color2:'#9B9B9B',
      color3:'#9B9B9B',
    }
  }
  componentWillMount(){
    const { step } = this.props
    if(step == 1){
      this.width=(Window.width-32)/5
      this.color1='#DE3619'
      this.color2='#9B9B9B'
      this.color3='#9B9B9B'
    }else if (step == 2) {
      this.width=(Window.width-32)/2
      this.color1='#DE3619'
      this.color2='#DE3619'
      this.color3='#9B9B9B'
    }else if (step == 3) {
      this.width='100%'
      this.color1='#DE3619'
      this.color2='#DE3619'
      this.color3='#DE3619'
    }
    this.setState({
      width:this.width,
      color1:this.color1,
      color2:this.color2,
      color3:this.color3
    })
  }
  render() {
    const { width,color1,color2,color3 } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.blackLibe}></View>
        <View style={[styles.redLibe,{width:this.state.width}]}></View>
        <View style={styles.pointContainer}>
          <View style={[styles.point,{backgroundColor:color1}]}></View>
          <View style={[styles.point,{backgroundColor:color2}]}></View>
          <View style={[styles.point,{backgroundColor:color3}]}></View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>基本信息</Text>
          <Text style={styles.text}>车辆信息</Text>
          <Text style={styles.text}>照片信息</Text>
        </View>
      </View>
    )
  }
}

TimeLine.propTypes = {
  style: PropTypes.object,
  step: PropTypes.number.isRequired,
  source: PropTypes.number.isRequired,
}

TimeLine.defaultProps = {
  style: {},
  step: 1,
  source: 3,
}
