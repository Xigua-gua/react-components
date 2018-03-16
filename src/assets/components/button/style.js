import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
  },
  default_btn: {
    borderRadius: 5,
    borderWidth: 1,
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
    backgroundColor: '#858588',
    borderWidth: 1,
    borderColor: '#858588',
  },
  textDisabled: {
    color: '#ffffff',
  }
})

export default styles
