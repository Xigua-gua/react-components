import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from '@remobile/react-native-toast'
import Button from '../../components/button'
import Address from '../../components/address'
import Grid from '../../components/grid'
import { navigate } from '../../navigate'
import  {DATA}  from './data.js'
import { ADDRESSLIST } from './data0'

export default class myButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
  }
  handleToGrid() {
    // navigate('timeLine',{}, this.props.navigation)
  }
  setAddress(ads) {
    this.setState({
      address: ads,
    })
  }
  render() {
    // console.log('data->',DATA0);
    return (
      <View style={{marginBottom: 30,marginTop: 30}}>
        <ScrollView>
          <Address
            ref={(ref) => this.adsModal = ref}
            dataSource={ADDRESSLIST}
            type=''
            getAddress={(data) => this.setAddress(data)}
          />
          <Text>九宫格</Text>
          <Grid
            dataSource={DATA}
            cols={3}
          />
          <Text>Button Screen</Text>

            <Button
              style={{fontSize: 16,color: 'black', borderRadius: 0,paddingLeft: 20,}}
              type='primary'
              title='123'
              onPress={() => Toast.showShortBottom('点击了primary按钮')}
            />
            <View style={styles.buttonCom}>
              <Button
                type='default'
                title='default'
                onPress={() => Toast.showShortBottom('点击了default按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                type='warn'
                title='warn'
                onPress={() => Toast.showShortBottom('点击了warn按钮')}
              />
            </View>
          <View style={styles.container}>
            <View style={styles.buttonCom}>
              <Button
                title='默认'
                onPress={() => Toast.showShortBottom('点击了defult按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                style={{fontSize: 10,color: 'black',paddingLeft: 20}}
                type='primary'
                title='默认'
                onPress={() => Toast.showShortBottom('点击了primary按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                icon='search'
                title='搜索'
                onPress={() => Toast.showShortBottom('点击了search按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                type='primary'
                icon='search'
                title='搜索'
                onPress={() => Toast.showShortBottom('点击了搜索按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                icon='download'
                title='下载'
                onPress={() => Toast.showShortBottom('点击了下载按钮')}
              />
            </View>
            <View style={styles.buttonCom}>
              <Button
                type='primary'
                icon='download'
                title='下载'
                onPress={() => Toast.showShortBottom('点击了下载按钮')}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.adsModal.open()}
            style={styles.inputRow}
          >
            <Text>选择地址:</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{paddingRight:20}}>{this.state.address}</Text>
              <Icon name="chevron-right" />
            </View>
          </TouchableOpacity>
          <Grid
            dataSource={DATA}
            cols={4}
          />

        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCom: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
})
