import { StyleSheet, PixelRatio, Dimensions} from 'react-native'

const styles = StyleSheet.create({
  content: {
    //flex: 1,
    backgroundColor: '#EEEEEE',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    marginRight: 8,
    marginLeft: 2,
    padding: 5,
    width: 30,
    height: 30,
    //backgroundColor:'#E5BA31',
    borderRadius: 50,
  },
  text: {
    color: '#666',
    fontSize: 14,
  },
  icon: {
    marginRight: 0,
    color:'#fff',
  },
  lists: {
    //flex: 1,
    marginTop: 11,
  },
  list: {
    marginBottom: 1,
    padding: 11,
    height: 50,
    backgroundColor: '#fff',
  }
})

export default styles
