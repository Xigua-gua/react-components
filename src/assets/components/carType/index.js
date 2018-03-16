/**
 * @desc 选择车辆类型
 * @author candy<candy@yijunet.cc>
 * @date 2017-11-17
 */

 import React, { Component } from 'react';
 import { Text ,Button, View, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
 import { CITY, ALPHABET } from './data'
 import PropTypes from 'prop-types'
 //import Toast from '@remobile/react-native-toast'
 import Icon from 'react-native-vector-icons/Ionicons'
 import { Color,Size } from '../../containers/global'
 import Modal from '../modal'

 const IconDel = <Icon name="md-close-circle" size={18} color={'#999999'} />

 const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
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
   },
   row: {
     flexDirection:'row',
     flexWrap:'wrap',
     borderBottomWidth:1,
     borderColor:'#CDCACA',
     paddingBottom:50,
     paddingLeft:25,
   },
   column:{
     backgroundColor:"#fff",
     position:'absolute',
     bottom:0,
     width:'100%',
   },
   topInfo:{
     flexDirection:'row',
     justifyContent:'space-between',
     height:38,
     alignItems:'center'
   },
   topText:{
     flex:1,
     textAlign:'left',
     color:'#999999',
     fontSize:12,
     marginLeft:10
   },
   option:{
     width:Window.width/4,
     height:30,
     borderWidth:Size.pixel,
     borderColor:'#C1C1C1',
     backgroundColor:'#F5F5F5',
     marginTop:17,
     flexDirection:'row',
     alignItems:'center',
     marginRight:20,
   },
   choose:{
     width:'100%',
     textAlign:'center',
     color:'#999999',
     fontSize:12
   },
   modal_container:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor: 'rgba(0, 0, 0, 0.3)'
   }
 })

 export default class CarType extends Component {
   constructor(props) {
     super(props)
     this.current = []
     this.state = {
       current_name: props.value,
       dataSource: props.dataSource,
       palceHolder:props.value ? '' : props.defaultValue,
       visible: false,
       frontText:props.frontText
     }
   }

   handleSelect(value,id) {
     this.Modal.close()
     this.setState({
       current_name: value,
       palceHolder:'',
     }, ()=>{
       this.props.getValue(value,id)
     })
   }
   clearInfo(name){
     this.current = []
     this.setState({
       current_name:'',
       palceHolder:this.props.defaultValue
     })
   }
   renderItem(){
     const {  dataSource,current_name } = this.state
     return(
       <View style={styles.column}>
         <View style={styles.topInfo}>
           <Text style={styles.topText}>{this.props.title}</Text>
         </View>
         <View style={styles.row}>
         { dataSource.map((item,i) => (
         <TouchableOpacity
           key={i}
           style={styles.option}
           onPress={() =>this.handleSelect(item.name,item.id)}
           underlineColorAndroid="transparent"
           >
           <Text style={styles.choose}>
             {item.name}
           </Text>
         </TouchableOpacity>
       ))}
          </View>
       </View>
     )
   }
   render() {
     const { current_name, dataSource, current,palceHolder,visible,frontText } = this.state
     return (
       <View style={styles.bag}>
         <View style={styles.del}>
           <TouchableOpacity
             style={styles.container}
             onPress={() =>this.Modal.open()}
             >
             <Text style={styles.carInfo}>{frontText} {current_name}</Text>
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
             height={200}
             type='bottom'
             >
            { this.renderItem() }
          </Modal>
        </View>
     );
   }
 }

 CarType.propTypes = {
   dataSource: PropTypes.array.isRequired,
   defaultValue: PropTypes.any.isRequired,
   getValue: PropTypes.func,
   style: View.propTypes.style,
   title: PropTypes.string.isRequired,
   value:PropTypes.any,
 }

 CarType.defaultProps = {
   getValue: () => {},
   style: {},
   dataSource:[1,2,3,4,5],
   defaultValue:'',
   title:'请选择',
   value:'',
 }
