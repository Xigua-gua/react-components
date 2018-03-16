import React from 'react'

import { StackNavigator, TabNavigator } from 'react-navigation'
import MainScreenNavigator from './containers/main'
// import HomeScreen from './containers/home'
// import Tab2Screen from './containers/Tab2'
// import Tab3Screen from './containers/Tab3'
import AddressPickerScreen from './containers/addressPicker'
import CityPickerScreen from './containers/cityPicker'
import timeLineScreen from './components/timeLine'
import buttonScreen from './containers/button'
import gridScreen from './components/grid'

const AppNavigator = StackNavigator({
    Main: { screen: MainScreenNavigator },
    CityPicker: {screen: CityPickerScreen},
    AddressPicker: {screen: AddressPickerScreen},
    timeLine: {screen: timeLineScreen},
    myButton: {screen: buttonScreen},
    myGrid: {screen: gridScreen},
  }
)

export default AppNavigator
