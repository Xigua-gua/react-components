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
  TextInput,
  Dimensions
} from 'react-native'
 import CITY from './data'
 import Icon from 'react-native-vector-icons/Ionicons'
 import Toast from '../toast'

const IconDel = <Icon name="md-close-circle" size={18} color={'#9B9B9B'} />
const IconCanLook = <Icon name="ios-eye" size={22} color={'#9B9B9B'} />
const IconNotLook = <Icon name="ios-eye-off" size={22} color={'#9B9B9B'} />
const Window = {
 width: Dimensions.get('window').width,
 height: Dimensions.get('window').height,
}

const styles = StyleSheet.create({
  bag:{
    flexDirection:'row',
    height:38,
    backgroundColor:'#fff',
    alignItems:'center',
  },
  container: {
    flexDirection:'row',
    flex:1,
  },
  input: {
    flex:1,
    marginRight:4,
    fontSize:12,
    paddingRight:10,
    alignItems:'center',
    color:'#4a4a4a'
  },
  icon: {
    marginLeft:12
  },
  prefix: {
    borderWidth:1,
    flexDirection:'row',
  },
  prefixnumber: {
    fontSize:14,
    alignItems:'center',
    marginTop:8,
  },
  arrow: {
    width:16,
    height:16,
  },
  check:{
    marginTop:12,
    fontSize:10,
    color:'red',
    marginRight:6,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    //paddingLeft:10,
    marginRight:8,
  },
  eyecontainer:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:5
  },
  frontText:{
    //marginLeft:0,
    color:'#4A4A4A',
    fontSize:12
  },
  look:{
    width:17,
    height:11,
  },
})


export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      border:'#CDCACA',
      judge:true,
      blue:true,
      secure:props.secureTextEntry,
      text:props.value,
    }
  }

  validatePhone(phone){
    const Reg = new RegExp(this.props.validateReg)
    if(Reg.test(phone)){
      this.setState({
        judge:true,
        border:'#fff',
        blue:false,
      })
    }else {
      this.setState({
        judge:false,
        border:'#D0021B',
        blue:false,
      })
      this.toast.show({text:'输入有误',type:'error'})
    }
  }

  render() {
    const judge =this.state.judge
    const { defaultValue,keyboardType,frontImg,frontText,maxLength,showEyes,style,autoFocus,editable,delet } = this.props
    { frontImg ? this.margin=10 : this.margin=0 }
    const { blue, border, secure } = this.state
    return (
      <View style={[styles.bag,{borderColor:'#CDCACA'},style]}>
        <View style={styles.container}>
          <View style={[styles.row,{marginLeft:this.margin}]}>
            { frontImg ?  frontImg  : null }
            <Text style={styles.frontText}>{frontText}</Text>
          </View>
          <TextInput
            ref={(ref) =>{this.input = ref}}
            style={styles.input}
            placeholder={ defaultValue }
            underlineColorAndroid="transparent"
            autoFocus={autoFocus}
            onChangeText={(text) => this.setState({text},()=>this.props.getValue(this.state.text))}
            value={ this.state.text }
            keyboardType = { keyboardType }
            secureTextEntry = { secure }
            selectTextOnFocus = { true }
            selectionColor = '#E4E6E7'
            maxLength = { maxLength }
            onBlur={() => this.validatePhone(this.state.text)}
            onFocus={() => this.setState({blue:true})}
            editable={editable}
            blurOnSubmit={true}
            >
          </TextInput>
          {
            this.state.text.length>=1  ?
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => this.setState({text : '' })}
                >
               { delet ? IconDel : null }
             </TouchableOpacity>
          </View>
            : null
        }
        {
          showEyes ?
          <View style={styles.eyecontainer}>
          <TouchableOpacity
            onPress={() => this.setState({
              secure : !this.state.secure
            })}
            >
           { secure ? IconNotLook : IconCanLook }
         </TouchableOpacity>
         </View>
         : null
        }
        </View>
        <Toast ref={(ref) => {this.toast = ref}}/>
      </View>
    )
  }
}

Input.propTypes = {
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  keyboardType: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  frontImg: PropTypes.any,
  frontText: PropTypes.any,
  max: PropTypes.any,
  validateReg: PropTypes.string,
  Prompt: PropTypes.string,
  showEyes: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  delet: PropTypes.bool,
  value:PropTypes.string,
}

Input.defaultProps = {
  style: {},
  defaultValue: '',
  keyboardType: 'default',
  secureTextEntry: false,
  frontImg: '',
  frontText: '',
  max: 11,
  validateReg: '',
  Prompt: '未知错误',
  showEyes: false,
  autoFocus: false,
  editable: true,
  delet: true,
  value:'',
  getValue: () => {},
}
