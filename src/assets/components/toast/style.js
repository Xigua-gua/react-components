/**
 * @desc modal页面的样式
 * @author ws
 * @date 2017-11-17
 **/

import { StyleSheet, PixelRatio, Dimensions} from 'react-native'
//import { Window, Size, Color, Radius } from '../../global'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const Size = {
  pixel: 1 / PixelRatio.get(),
}

const Radius = {
  default: 4,
}

const Color = {
  // 主色调
  primary: '#3EC9B6',                  // 绿色
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    backgroundColor: 'rgba(3, 3, 3, 0.8)',
    //backgroundColor: '#666',
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    position: 'absolute',
  },
  text: {
    paddingLeft: 8,
    paddingRight: 10,
    color: '#fff',
  },
  icon: {
    marginLeft: 8
  }
})

export default styles
