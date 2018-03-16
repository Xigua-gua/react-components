import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    Text,
    ListView,
    Platform,
    Dimensions,
    StyleSheet,
    RefreshControl,
    Alert,
    TextInput,
    Button,
    Picker,
    ScrollView,
} from 'react-native'
import { navigate } from '../../navigate'

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCom: {
    marginBottom: 10,
  }
})

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class Home extends Component {
  // 构造
  constructor(props) {
    super(props)
    // 初始状态
    this.state = {
      ads: '',
      status: '',
      city: '',
      selectedCity: '杭州',
    }
  }

  handleToCityPicker() {
    navigate('CityPicker', {
        city: this.state.selectedCity,
        callback: (v) => {
          this.setState({
            selectedCity: v,
          })
        }
    },this.props.navigation)
  }

  handleToAddressPicker() {
    navigate('AddressPicker', {
        status: this.state.status,
        callback: (v) => {
          this.setState({
            ads: v,
          })
        }
    },this.props.navigation)
  }
  render() {
    return (
      <View style={styles.item}>

        <Text>Home Screen</Text>
        <Text>选择的城市是:{this.state.city}</Text>
        <View
          style={styles.buttonCom}>
          <Button
            onPress={() => this.handleToCityPicker()}
            title={this.state.selectedCity}
          />
        </View>
        <View
          style={styles.buttonCom}>
          <Button
            onPress={() => this.handleToAddressPicker()}
            title="地区选择页面"
          />
        </View>
        <View style={{}}>
            <Text>选择的级别是:</Text>
          <Picker
            style={{}}
            selectedValue={this.state.status}
            onValueChange={(v) => {
              this.setState({status: v})
            }}>
            <Picker.Item label="省" value="province" />
            <Picker.Item label="市" value="city" />
            <Picker.Item label="区" value="district" />
          </Picker>
        </View>
        <View>
          <Text>选择的地址是: {this.state.ads}</Text>
        </View>

      </View>
    )
  }
}
Home.navigationOptions = {
  header: null,
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
}
