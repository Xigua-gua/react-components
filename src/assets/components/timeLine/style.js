
import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const width = Dimensions.get('window').width


const styles = StyleSheet.create({
    container: {
      // marginLeft: 20,
      // marginRight: 20,
    },
    item_row: {
      flexDirection:'row',
      marginLeft: 20,
      marginRight: 20,
    },
    leftitem: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'flex-end',
      // backgroundColor:"gray",
    },
    lineitem: {
      flex: 2,
      flexDirection: 'column',
      alignItems: 'center',
      //backgroundColor:"red",
    },
    rightitem: {
      flex: 20,
      // backgroundColor:"lightblue",
      marginLeft:5,
      paddingBottom: 30,
    },
    line: {
      width:3,
      backgroundColor:'#F1F1F1',
    },
    circle: {
      width: 9,
      height: 9,
      borderRadius:30,
      backgroundColor:'#D8D8D8',
    },
    circle0: {
      width: 12,
      height: 12,
      borderRadius:30,
      backgroundColor:'#D8D8D8',
    },
    text_month: {
      fontSize: 12,
      color: '#9B9B9B',
    },
    text_min:{
      fontSize: 10,
      color: '#CCCCCC',
    },
    footerText: {
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 15,
    },
})

export default styles
