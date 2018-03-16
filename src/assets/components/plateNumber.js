
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  PixelRatio,
} from 'react-native'

const CITY = ['京','津','沪','渝','冀','豫','云','辽','黑','湘','皖','鲁','新','苏','浙','赣',
'鄂','桂','甘','晋','蒙','陕','吉','闽','贵','粤','青','藏','琼','宁']
const LETTER = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U',
  'V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']


const { height, width } = Dimensions.get('window')

class ModalBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      contentHeight: new Animated.Value(0),
    }
  }
  open() {
    this.setState({
      show: true
    }, ()=>{
      Animated.timing(this.state.contentHeight, {
        toValue: this.props.height, // 目标值
        duration: this.props.duration, // 动画时间
        //easing: Easing.linear // 缓动函数
      }).start()
    })
  }
  close() {
    Animated.timing(this.state.contentHeight, {
      toValue: 0, // 目标值
      duration: this.props.duration, // 动画时间
      //easing: Easing.linear // 缓动函数
    }).start()
    // 延时执行
    setTimeout(()=>{
      this.setState({
        show: false
      })
    }, this.props.duration)
  }
  render() {
    return (
      <Modal
        visible={this.state.show}
        transparent={true}
        onRequestClose={()=>{ this.close() }}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.overlay} activeOpacity={0.5} onPress={()=> this.close() } />
          <Animated.View style={[styles.content, { height: this.state.contentHeight }]}>
            { this.props.children }
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

ModalBox.defaultProps = {
  height: 300,
  duration: 200,
}

// 基本输入框
class BaseInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  renderLabel() {
    let { label, icon } = this.props
    return (
      <View style={styles.label}>
        { icon ? icon : null }
        { label ? <Text>{ label }</Text> : null }
      </View>
    )
  }
  renderInput() {
    let { inputOptions, select, onSelect } = this.props
    if (select) {
      return (
        <TouchableOpacity onPress={()=> onSelect && onSelect() }>
          <Text>{ this.state.value || <Text style={styles.placeholder}>{ inputOptions.placeholder }</Text> }</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TextInput {...inputOptions} />
      )
    }
  }
  render() {
    return (
      <View style={styles.wrap}>
        { this.renderLabel() }
        { this.renderInput() }
      </View>
    )
  }
}


// 车牌号输入框
export default class PlateNumberInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false
    }
  }
  open() {
    this.modal.open()
  }
  close() {
    this.modal.close()
  }
  renderModal() {
    return (
      <View style={styles.overlay}>
        <Text>111</Text>
      </View>
    )
  }
  renderItem(name, key) {
    return (
      <View key={key} style={styles.item}>
        <TouchableOpacity style={styles.button}><Text>{ name }</Text></TouchableOpacity>
      </View>
    )
  }
  renderLetter(letter) {
    let empty = letter.length % 7
    let data = [...letter]
    if (empty !== 0) {
       data = [...letter, ...(new Array((7 - empty))).fill(0).map((i)=> "" )]
    }
    return data.map((i, index)=> this.renderItem(i, index) )
  }
  render() {
    const h = (width - 1) / 7 * 5 + 50
    return (
      <View style={{ flex: 1 }}>
        <BaseInput label={"车牌号码:"} select={true}
          onSelect={()=> this.open() }
          inputOptions={{
            placeholder: "请选择车牌号码",
          }} />
        <ModalBox ref={(ref)=> this.modal = ref } height={h}>
          <View style={styles.plateNumber}>
            <Text style={styles.h3}>请选择车牌号码</Text>
            <View style={styles.letterBox}>
              { this.renderLetter(CITY) }
            </View>
          </View>
        </ModalBox>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // plateNumber
  h3: {
    height: 50,
  },
  letterBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //backgroundColor: '#ccc',
    justifyContent: 'center',
  },
  item: {
    padding: 1,
    backgroundColor: '#fff',
    width: (width - 1)/ 7,
    height: (width - 1)/ 7,
    borderLeftWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // box
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    flexDirection: 'row',
  },
  placeholder: {
    color: '#999',
  },
  modal: {
    backgroundColor: 'red',
  },
  box: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: '#fff',
  },
})
