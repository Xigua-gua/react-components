import { StyleSheet, Platform ,Dimensions,PixelRatio} from 'react-native'
const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}
const pixel = 1 / PixelRatio.get()
const ITEM_HEIGHT = 45 //item的高度
const HEADER_HEIGHT = 20  //分组头部的高度
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  list: {
    //marginTop: 10,
  },
  sections: {
    flex: 1,
  },
  item: {
    width: Window.width * 0.9,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(211,211,211,.5)',
    borderBottomWidth: pixel,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textinput: {
    height: 32,
    marginLeft: 10,
    paddingBottom:2,
    backgroundColor:'#D3D3D3',
    marginTop: 5,
    borderRadius: 5,
    paddingTop: 2,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    fontSize: 14,
    color: '#ABABAB',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  listText: {
    marginLeft: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  headerlist: {
    width: Window.width * 0.9,
    backgroundColor: '#D3D3D6',
    height: HEADER_HEIGHT,
  },
  headertext: {
    color: 'rgb(40,169,185)',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  sectionheader: {
    backgroundColor: 'gray',
    position: 'absolute',
    width: 16,
    right: 0,
    zIndex: 2
  },
  letters: {
    position: 'absolute',
    right: 10,
    width: 30,
    backgroundColor:'gray',
    zIndex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
 },
 letter: {
    justifyContent: 'center',
    alignItems: 'center',
 },
 letterText: {
    textAlign: 'center',
    fontSize: Window.height*1.1/50,
    color:'rgb(40,169,185)'
 },
 footerText: {
   height: 100,
   fontSize: 14,
   color: 'gray',
   textAlign: 'center',
   paddingTop: 10,
   paddingBottom: 15,
 },
})

export default styles
