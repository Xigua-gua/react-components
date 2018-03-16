/**
 * @desc 选择车牌号
 * @author candy<candy@yijunet.cc>
 * @date 2017-11-17
 */

import React, { Component } from 'react';
import { Text ,Button, View, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions,PixelRatio} from 'react-native';
import { CITY, ALPHABET } from './data'
import PropTypes from 'prop-types'
//import Toast from '@remobile/react-native-toast'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from '../modal'

const IconDel = <Icon name="md-close-circle" size={18} color={'#999999'} />

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
const content_height = (Window.width-1)/ 7*5+45;
Window.width
  const styles = StyleSheet.create({
    bag: {
      flexDirection:'column',
      flex:1,
      borderBottomWidth:1,
      borderColor:'#F0F0F0',
    },
    del:{
      flexDirection:'row',
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'space-between',
      flex:1,
    },
    container: {
      flexDirection:'row',
      backgroundColor:'#fff',
      height:42,
      alignItems:'center',
      width:'90%',
    },
    carInfo: {
      color:'#4A4A4A',
      fontSize:12,
    },
    palceHolder: {
      color:'#999',
      fontSize:12,
    },
    icon:{
      marginRight:8,
      //padding:5,
    },
    row: {
      flexDirection:'row',
      marginTop:5,
      flexWrap:'wrap',
      borderBottomWidth:1,
      borderColor:'#CDCACA',
    },
    column:{
      backgroundColor:"#fff",
    },
    topInfo:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:38,
      alignItems:'center'
    },
    close:{
      width:Window.width/8,
      textAlign:'center',
      color:'#999999',
      fontSize:12
    },
    topText:{
      flex:1,
      textAlign:'center',
      color:'#999999',
      fontSize:12
    },
    delete:{
      width:Window.width/7,
      textAlign:'center',
      color:'#999999',
      fontSize:12
    },
    item: {
      padding: 1,
      backgroundColor: '#fff',
      width: (Window.width - 1)/ 7,
      height: (Window.width - 1)/ 7,
      borderLeftWidth: 1 / PixelRatio.get(),
      borderTopWidth: 1 / PixelRatio.get(),
      borderColor: '#ccc',
 },
    option:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    choose:{
      width:Window.width/7-0.2,
      height:40,
      textAlign:'center',
      paddingTop:10,
      color:'#999999',
      fontSize:12
    },
    modal_container:{
      flex:1,
      // justifyContent:'center',
      // alignItems:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
  })

  export default class CheckCar extends Component {
    constructor(props) {
      super(props)
      this.current = []
      this.state = {
        current_name: props.value,
        dataSource: CITY,
        palceHolder: props.value ? '' : props.defaultValue,
        visible: false,
      }
    }
    handleSelect(value) {
      if(this.current.length<=6){
        this.current.push(value)
      }
      this.setState({
        current_name: this.current.join(''),
        dataSource: ALPHABET,
        palceHolder:''
      }, ()=>{
        this.props.onSelect(this.state.current_name)
      })
    }
    getValue() {
      this.props.getValue(this.state.current_name)
    }
    Delete(n){
      this.current.pop(n)
      if(this.current.length == 0){
        this.setState({
          dataSource: CITY,
          palceHolder: this.props.defaultValue,
        })
      }
      this.setState({
        current_name: this.current.join(''),
      })
    }
    clearInfo(name){
      this.current = []
      this.setState({
        current_name:'',
        dataSource: CITY,
        palceHolder: this.props.defaultValue,
      })
    }
    renderItem(){
      const {  dataSource,current_name } = this.state
      let empty = dataSource.length % 7
      let data = [...dataSource]
      if (empty !== 0) {
      data = [...dataSource, ...(new Array((7 - empty))).fill(0).map((i)=> "" )]
      }
      return(
        <View style={styles.column}>
          <View style={styles.topInfo}>
            <TouchableOpacity
              onPress={() => this.Modal.close()}
              >
              <Text style={styles.close}>关闭</Text>
            </TouchableOpacity>
              <Text style={styles.topText}>选择车牌号码</Text>
            <TouchableOpacity
              onPress={() =>this.Delete(current_name)}
               >
              <Text style={styles.delete}>删除</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
          { data.map((item,i) => (
          <View key={i} style={styles.item}>
            <TouchableOpacity

              style={styles.option}
              onPress={() =>this.handleSelect(item)}
              underlineColorAndroid="transparent"
              >
              <Text style={styles.choose}>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
           </View>
        </View>
      )
    }
    render() {
      const { current_name, dataSource, current,palceHolder,visible } = this.state
      return (
        <View style={styles.bag}>
          <View style={styles.del}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.Modal.open()}
              >
              <Text style={styles.carInfo}>车牌号码： {current_name}</Text>
              <Text style={styles.palceHolder}>{palceHolder}</Text>
              </TouchableOpacity>
              {
                current_name ?
                <TouchableOpacity
                  onPress={() => this.clearInfo(current_name)}
                  style={styles.icon}
                  >
                 { IconDel }
                </TouchableOpacity>
                : null
              }
          </View>
          <Modal
             ref={(ref) => this.Modal = ref}
             height={content_height}
             type='bottom'
             >
            { this.renderItem() }
          </Modal>
        </View>
     );
   }
 }

 CheckCar.propTypes = {
   dataSource: PropTypes.array.isRequired,
   defaultValue: PropTypes.any.isRequired,
   onSelect: PropTypes.func,
   style: View.propTypes.style,
   getValue:PropTypes.func,
   value:PropTypes.any,
 }

 CheckCar.defaultProps = {
   onSelect: () => {},
   getValue: () => {},
   style: {},
   dataSource:[],
   value:'',
   defaultValue:''
 }
