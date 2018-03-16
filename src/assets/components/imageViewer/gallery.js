/**
 * @desc 图片查看器 - 允许放大
 * @author Jafeney<jafeney@yijunet.cc>
 * @datetime 2016-10-09
 **/


import React, { Component } from 'react'
import Gallery from 'react-native-gallery'
import {
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})

export default class MyComponent extends Component {
  render() {
    return (
      <Gallery
        style={styles.container}
        images={[
          'http://p10.qhimg.com/t019e9cf51692f735be.jpg',
          'http://ww2.sinaimg.cn/mw690/714a59a7tw1dxqkkg0cwlj.jpg',
          'http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg',
        ]}
      />
    )
  }
}
