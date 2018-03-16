import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
import {Color, Size } from '../../containers/global'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height



const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    backgroundColor: 'white',
    height: height/ 4,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
  },
  item1: {
    flex: 2,
    borderColor: '#EEEEEE',
    borderBottomWidth: Size.pixel,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item2: {
    flex: 5,
    borderColor: '#EEEEEE',
    borderBottomWidth: Size.pixel,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text_row1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  text_between: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 30
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_small: {
    color: '#666666',
    fontSize: Size.small,
  },
  text_xsmall: {
    fontSize: 11,
    color: '#999999'
  },
  text_detail: {
    fontSize: Size.small,
    color: '#9B9B9B',
  },
  time: {
    flex: 2,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text_time: {
    fontSize: 12,
    color: '#999999',
  },
  time_status: {
    color:'#65A917',
    paddingLeft: 15,
    fontSize: Size.small,
  },
})

export default styles
