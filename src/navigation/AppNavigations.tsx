import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../screens/initials/SplashScreen';
import OnBoarding from '../screens/initials/Onboarding';
import { RootStackParamList } from '../interface/navigation.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnBoarding} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;

// types.ts
// export type RootStackParamList = {
//   Splash: undefined;
//   Home: undefined;
//   OnBoarding: undefined;
// };
