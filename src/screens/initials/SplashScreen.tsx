import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
// import { SplashScreenNavigationProp } from './types'
import { TSplashScreenNavigationProp } from '../../interface/navigation.type';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function SplashScreen({
  navigation,
}: TSplashScreenNavigationProp) {
  const hasSeenOnboarding = useSelector((state:RootState)=>state.onboarding.hasSeenOnboarding)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    const timer = setTimeout(() => {
      // accessToken ? main : auth
      if(!hasSeenOnboarding){
         navigation.replace('Onboarding')
      }else if (isLoggedIn) {
        navigation.replace('MainStack',{screen:'Home'});
      } else {
        navigation.replace('AuthStack',{screen:'Login'});
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/splashIcon_2.json')}
        autoPlay
        style={styles.lottie}
      />
      <Text style={styles.appName}>Grocy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  appName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1F3C88',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
