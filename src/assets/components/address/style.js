

import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const width = Dimensions.get('window').width
const pixel = 1 / PixelRatio.get()


const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderBottomWidth: pixel,
    borderColor: '#ababab',
  },
  modal: {
    flex: 1,
  },
  modalCont: {
    flex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  pickerBox: {
    flex: 4,
    backgroundColor: 'white',
  },
  text_def: {
    paddingLeft: 10,
    paddingRight: 20,
    alignItems:'center',
  },
  item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(211,211,211,.5)',
    borderBottomWidth: pixel,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  chooseText: {
    fontSize: 14,
    color: 'red',
  },
  text_tab: {
    flexDirection: 'row',
    borderBottomWidth: pixel,
    borderColor: '#ababab',
  },
  list: {
    width: width,
  },
  footerText: {
    width: width,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  active: {
    paddingTop: 10,
    color: 'red',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'red'
  },
  tabText : {
    paddingTop: 10,
    height: 40,
    color: 'black',
  }
})

export default styles
