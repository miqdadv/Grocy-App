import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily } from '../../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { TAuthSignupStackNavigationProp } from '../../interface/navigation.type';
import { Formik } from 'formik';
import { signupValidationSchema } from '../../utils/validation.utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { signup } from '../../redux/slices/authSlice';
import { sign_Up } from '../../../services/firebaseAuth';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import BottomSheet from '@gorhom/bottom-sheet';

export default function SignUp({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>Grocy</Text>
        <Text style={styles.tagline}>Grocery App</Text>
      </View>

      <View style={styles.form}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={signupValidationSchema}
            onSubmit={async values => {
              try {
                setLoader(true);
                const res = await sign_Up(
                  values.email,
                  values.password,
                  values.username,
                );
                const user = { userName: values.username, email: values.email };
                const token = res.uid;
                dispatch(signup({ user, token }));
                setLoader(false);
                Alert.alert('Sign Up successfull', res.displayName);
                console.log('Sign up response', res.uid);
                navigation.navigate('MainStack', { screen: 'Home' });
              } catch (error) {
                Alert.alert('User already exist');
              }
              // const user = {userName:values.username,email:values.email}
              // const token = 'Dummy token'
              // dispatch(signup({user,token}))
              // console.log('Form submitted with:', values),
              // navigation.navigate('MainStack', { screen: 'Home' });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <>
                <Text style={styles.welcome}>Create your Account</Text>
                {/* <Text style={styles.subtitle}>Let's Get you onboard</Text> */}

                <View>
                  {/* <View style={styles.inputContainer}>
                  <Icon
                    name="person"
                    size={20}
                    style={styles.inputIcon}
                    color="#607DDB"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View> */}
                  <CustomInput
                    iconName="person"
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    keyboardType="email-address"
                  />
                  {touched.username && errors.username && (
                    <Text style={{ color: 'red' }}>{errors.username}</Text>
                  )}
                  {/* Email Input with Icon */}
                  {/* <View style={styles.inputContainer}>
                  <Icon
                    name="mail"
                    size={20}
                    style={styles.inputIcon}
                    color="#607DDB"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                  />
                </View> */}
                  <CustomInput
                    iconName="mail"
                    placeholder="example@gmail.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ color: 'red', marginTop: 4 }}>
                      {errors.email}
                    </Text>
                  )}

                  {/* Password Input with Icon */}
                  {/* <View style={styles.inputContainer}>
                    <Icon
                      name="lock-closed"
                      size={20}
                      color="#607DDB"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Icon
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color="#607DDB"
                      />
                    </TouchableOpacity>
                  </View> */}
                  <CustomInput
                   iconName='lock-closed'
                   placeholder='Enter password'
                   value={values.password}
                   onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!showPassword}
                    onPress={()=>setShowPassword(!showPassword)}
                    error={errors}
                  />
                  {touched.password && errors.password && (
                    <Text style={{ color: 'red', marginTop: 4 }}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                <View>
                  <CustomButton
                    title="Sign Up"
                    onPress={handleSubmit}
                    loading={loader}
                  />
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                  >
                    <Icon
                      name={acceptedTerms ? 'checkbox' : 'square-outline'}
                      size={22}
                      color="#007A3D"
                    />
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    {'  '}By tapping{' '}
                    <Text style={styles.highlight}>"Sign Up"</Text> you accept
                    our <Text style={styles.link}>terms</Text> and{' '}
                    <Text style={styles.link}>condition</Text>
                  </Text>
                </View>
                <View style={styles.noAccount}>
                  <Text style={styles.noAccountText}>
                    Already have an account?
                  </Text>
                </View>

                <View>
                  {/* <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.SignupButtonText}>Login</Text>
                  </TouchableOpacity> */}
                  <CustomButton
                   title='Login'
                   onPress={()=>navigation.goBack()}
                   style={styles.signUpButton}
                   textStyle={styles.SignupButtonText}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#607DDB',
  },
  logo: {
    fontSize: 36,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 1,
    marginTop: 60,
  },
  tagline: {
    color: '#fff',
    fontFamily: fontFamily.italic,
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    marginTop: 25,
  },
  welcome: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
    color: '#607DDB',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fontFamily.regular,
    color: '#607DDB',
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: '#000000',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    backgroundColor: '#607DDB',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  lowerOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerOptionText: {
    fontFamily: fontFamily.medium,
    color: '#607DDB',
    fontSize: 16,
    marginLeft: 5,
  },
  noAccount: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 18,
    fontFamily: fontFamily.regular,
    color: '#607DDB',
    opacity: 0.8,
  },
  signUpButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#607DDB',
  },
  SignupButtonText: {
    color: '#607DDB',
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    flexWrap: 'wrap',
  },

  termsText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#607DDB',
    flexShrink: 1,
  },

  highlight: {
    color: '#607DDB',
    fontFamily: fontFamily.semiBold,
  },

  link: {
    color: '#607DDB',
    fontFamily: fontFamily.bold,
  },
});
