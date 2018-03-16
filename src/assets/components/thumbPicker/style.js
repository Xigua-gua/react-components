import {
  StyleSheet,
  PixelRatio,
} from 'react-native'

const pixel = 1 / PixelRatio.get()

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  btn: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnText: {
    fontSize: 16,
    color: '#333333',
  },
  bb: {
    borderWidth: pixel,
    borderColor: 'rgba(211,211,211,.5)',
  },
  mt5: {
    marginTop: 5,
  },
})

export default styles
