import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon lib

import HomeScreen from '../screens/main/home/HomeScreen';
import CartScreen from '../screens/main/home/CartScreen';
import FavoriteScreen from '../screens/main/home/FavoriteScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LottieView from 'lottie-react-native';
import ProfileScreen from '../screens/main/home/ProfileScreen';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('screen').width;
const CustomCartButton = ({ children, onPress, cartCount }: any) => (
  <TouchableOpacity
    style={styles.cartButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.cartButton}>
      {children}
      {cartCount > 0 && (
        <LottieView 
        source={require('../assets/animations/notify_anim.json')}
        autoPlay
        loop
        style={styles.notifyAnimation}  
        />
      )}  
       {/* ) : (
        <View style={styles.badge} />
       )} */}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 7,
          marginLeft: width * 0.1,
          width: width * 0.8,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'white',
          paddingHorizontal: 10,
        },
        tabBarBackground: () => (
          <View style={{ backgroundColor: 'transparent' }} />
        ),
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={28}
              color={focused ? '#607DDB' : '#3b3b3b'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="swap-horizontal"
              size={28}
              color={focused ? '#607DDB' : '#3b3b3b'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="cart"
              size={28}
              color={focused ? '#607DDB' : '#3b3b3b'}
            />
          ),
          tabBarButton: props => (
            <CustomCartButton {...props} cartCount={cartItems.length} />
          ),
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="heart"
              size={28}
              color={focused ? '#607DDB' : '#3b3b3b'}
            />
          ),
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-circle"
              size={28}
              color={focused ? '#607DDB' : '#3b3b3b'}
            />
          ),
          // tabBarStyle:{
          //   display:'none'
          // }
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cartButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  badge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 9.5,
    height: 9.5,
    borderRadius: 5,
    backgroundColor: '#ff8e3a',
  },
  notifyAnimation:{
    position:'absolute',
    top:4,
    right:4,
    width:23,
    height:23
  }
});
