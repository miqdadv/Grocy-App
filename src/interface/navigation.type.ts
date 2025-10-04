import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  CategoryScreen:undefined;
};

export type TSplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;
export type TOnboardingNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;
export type TAuthLoginStackNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type TAuthSignupStackNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Signup'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type TMainStackNavigationProp = NativeStackScreenProps<
  MainStackParamList,
  'Home',
  'CategoryScreen'
>;
