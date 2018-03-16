//
import { TabNavigator } from 'react-navigation'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';
import HomeScreen from './home'
import Tab2Screen from './Tab2'
import Tab3Screen from './Tab3'

const MainScreen = TabNavigator({
  Home: {screen: HomeScreen},
  Tab2: {screen: Tab2Screen},
  Tab3: {screen: Tab3Screen},
},{
  animationEnabled: false,
})



export default MainScreen
