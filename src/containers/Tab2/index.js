
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ListView,
    Platform,
    Dimensions,
    StyleSheet,
    Button,
    ScrollView,
    TouchableHighlight,
} from 'react-native'
import { navigate } from '../../navigate'
import Timeline from '../../components/timeLine'
import ScrollTab from '../../components/scrollTab'
import { DATA } from './data.js'

const width = Dimensions.get('window').width * 0.8

export default class Tab2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  handleToScore() {
    // navigate('timeLine',{}, this.props.navigation)
  }
  renderImg(imgs){
    let res = []
    for(var i = 0;i < imgs.length; i++){
      let img = <Image key={i} source={{uri:imgs[i].url}} style={styles.imgShow}/>
      res.push(img)
    }
    return res
  }
  renderRight(item) {
    // console.log('item->',item)
    return (
      <View>
        <Text>{item.content}</Text>
        <View style={styles.imgCont}>
          {this.renderImg(item.image)}
        </View>
      </View>
    )
  }

  handleToButton() {
    navigate('myButton', {}, this.props.navigation)
  }
  render() {
    return (
      <View style={{marginTop: 30, marginBottom: 30,}}>
        <ScrollView >
        <ScrollTab />
          <View style={styles.item}>
            <View style={styles.buttonCom}>
              <Button
                style={styles.buttonCom}
                onPress={() => this.handleToButton()}
                title="按钮页面"
              />
            </View>
            <Button
              onPress={() => console.log('null')}
              title="nulldd"
            />
          </View>
          <Timeline
            dataSource={DATA}
            renderRight={(i) => this.renderRight(i)}
          />
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCom: {
    marginBottom: 10,
  },
  imgCont: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  imgShow: {
    width: width * 0.4,
    height: width * 0.4,
    marginLeft: 1,
    marginTop: 1,
  }
})

Tab2.navigationOptions = {
  header: null,
}

Tab2.propTypes = {
  navigation: PropTypes.object.isRequired,
}
