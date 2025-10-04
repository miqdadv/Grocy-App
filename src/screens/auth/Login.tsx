import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily } from '../../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { TAuthLoginStackNavigationProp } from '../../interface/navigation.type';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../utils/validation.utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/slices/authSlice';
import { sign_In } from '../../../services/firebaseAuth';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

export default function Login({ navigation }: any) {
  console.log('Navigation', navigation);
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [signIn, setSignIn] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const userName = useSelector((state: RootState) => state.auth.user?.userName);
  const dispatch = useDispatch<AppDispatch>();

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
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={async values => {
              try {
                setLoader(true);
                const res = await sign_In(values.email, values.password);
                const user = { userName: res.displayName, email: res.email };
                const token = res.uid;
                dispatch(login({ user, token }));
                console.log('Login Response : ', res);
                setLoader(false);

                // Alert.alert('SignIn Successfull');
                setShowSuccessModal(true);
              } catch (error) {
                Alert.alert('SignIn failed');
                setLoader(false);
              }

              // setLoader(true);
              // setTimeout(() => {
              //   const user = { userName: 'Miqdad', email: values.email };
              //   const token = 'Dummy_token';
              //   dispatch(login({ user, token }));
              //   console.log('Form submitted with:', values);
              //   setLoader(false);
              //   navigation.replace('MainStack', { screen: 'Home' });
              // }, 2000);

              // const loginCreds: {email:string, userName: string} | undefined = LOGIN_CREDS.find(
              //   value => value.email == values.email,
              // );
              // console.log('Checking user info : ', loginCreds);
              // if (loginCreds != undefined) {
              //   const token = 'Dummy_token';
              //   dispatch(login({ user: loginCreds, token }));
              //   console.log('Form submitted with:', values);
              //   navigation.navigate('MainStack', { screen: 'Home' });
              // }
              // else{}
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setErrors,
              touched,
            }) => (
              // setErrors("Invalid Creds"),
              <>
                <Text style={styles.welcome}>Welcome back</Text>
                <Text style={styles.subtitle}>Let's Get you onboard</Text>

                <View>
                  {/* Email Input with Icon */}
                  {/* <View style={styles.inputContainer}>
                    <Icon
                      name="mail"
                      color="#607DDB"
                      size={20}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="example@gmail.com"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </View> */}
                  <CustomInput
                    iconName="mail"
                    placeholder="example@gmail.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
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
                      placeholder="enter password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
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
                    iconName="lock-closed"
                    placeholder="enter password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={!showPassword}
                    onPress={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />
                  {touched.password && errors.password && (
                    <Text style={{ color: 'red', marginTop: 4 }}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                <View>
                  <CustomButton
                    title="Login"
                    onPress={handleSubmit}
                    loading={loader}
                  />
                </View>

                <View style={styles.lowerOption}>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setSignIn(!signIn)}>
                      <Icon
                        name={signIn ? 'checkbox' : 'square-outline'}
                        size={22}
                        color="#007A3D"
                      />
                    </TouchableOpacity>
                    <Text style={styles.lowerOptionText}>Keep Sign In</Text>
                  </View>

                  <View>
                    <TouchableOpacity>
                      <Text style={styles.lowerOptionText}>
                        Forgot Password ?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.noAccount}>
                  <Text style={styles.noAccountText}>
                    Don't have an account?
                  </Text>
                </View>

                <View>
                  <CustomButton
                    title="Create An Account"
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signUpButton}
                    textStyle={styles.SignupButtonText}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
      <Modal isVisible={showSuccessModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Login Successfull!</Text>
          <Text style={styles.modalMessage}>Welcome Back to Grocy,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setShowSuccessModal(false);
              navigation.replace('MainStack', { screen: 'Home' });
            }}
          >
            <Text style={styles.modalButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginTop: 100,
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
    marginTop: 60,
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
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: '#607DDB',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    fontFamily: fontFamily.regular,
    color: '#333',
    textAlign: 'center',
    marginBottom: 1,
  },
  modalButton: {
    backgroundColor: '#607DDB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.bold,
  },
  userName: {
    color: '#607DDB',
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginBottom: 20,
  },
});
