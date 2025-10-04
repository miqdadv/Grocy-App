import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { fontFamily } from '../../utils/fontandIcons';
import { TOnboardingNavigationProp } from '../../interface/navigation.type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setHasSeenOnboarding } from '../../redux/slices/onBoardingSlice';

const OnBoarding = ({ navigation }: TOnboardingNavigationProp) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={() => {
          dispatch(setHasSeenOnboarding())
          navigation.replace('AuthStack', { screen: 'Login' })}}
        onSkip={() =>{
          dispatch(setHasSeenOnboarding())
          navigation.replace('AuthStack', { screen: 'Login' })}}
        pages={[
          {
            backgroundColor: '#607DDB',
            image: (
              <LottieView
                source={require('../../assets/animations/og_animation_1.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: 'Welcome to Grocy!',
            subtitle: 'Grocery shopping made easy',
            titleStyles: styles.title_1,
            subTitleStyles: styles.subtitle_1,
          },
          {
            backgroundColor: '#607DDB',
            image: (
              <LottieView
                source={require('../../assets/animations/og_animation_2.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: 'Best quality groceries',
            subtitle: 'We provide the best quality groceries at your doorstep',
            titleStyles: styles.title_2,
            subTitleStyles: styles.subtitle_2,
          },
          {
            backgroundColor: '#607DDB',
            image: (
              <LottieView
                source={require('../../assets/animations/og_animation_2.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: 'Lighting fast delivery',
            subtitle: 'Get your groceries delivered in no time',
            titleStyles: styles.title_2,
            subTitleStyles: styles.subtitle_2,
          },
        ]}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title_1: {
    color: '#fff',
    fontSize: 34,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
  subtitle_1: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  title_2: {
    color: '#fff',
    fontSize: 34,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
  subtitle_2: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fontFamily.italic,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
