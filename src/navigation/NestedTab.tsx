import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CartScreen from '../screens/main/home/CartScreen';
const Tab = createBottomTabNavigator();
const NestedTab = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  )
}

export default NestedTab