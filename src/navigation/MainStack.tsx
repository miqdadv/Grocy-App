  import { StyleSheet, Text, View } from 'react-native';
  import React from 'react';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import HomeScreen from '../screens/main/home/HomeScreen';
  import BottomTabNavigator from './BottomTabNavigator';
import CategoryScreen from '../screens/main/home/CategoryScreen';
import EditProfileScreen from '../screens/main/profile/EditProfileScreen';


  const Stack = createNativeStackNavigator();

  export default function MainStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator}/>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}/>
      </Stack.Navigator>
    );
  }

  const styles = StyleSheet.create({});
