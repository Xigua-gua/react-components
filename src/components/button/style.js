import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  default_btn: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: '#108ee9',
  },
  submit_btn: {
    backgroundColor: '#108ee9'
  },
  submit_text: {
    color: 'white',
  },
  btnText: {
    color: '#108ee9',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf',
    borderColor: '#a1a1a1',
  },
  textDisabled: {
    color: '#a1a1a1',
  }
})

export default styles
