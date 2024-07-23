import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { Img } from '../assets/images';
import { fonts } from '../assets/fonts';
import { emailRegex, passwordRegex } from '../utils/regex';
import { useDispatch, useSelector } from 'react-redux';
import { emailAction, loggedAction, passwordAction, remeberAction } from '../redux/authSlice';

interface nav {
  navigation: any
}

const Login = ({ navigation }: nav) => {
  const uname = 'dev@gmail.com';
  const pass = 'Dev@123456';
  const remeber = 'ticked';

  const dispatch = useDispatch();

  const storedUserName = useSelector((state: any) => state.auth.email)
  const storedPassword = useSelector((state: any) => state.auth.password)
  const rem = useSelector((state: any) => state.auth.isRemember)

  console.log("from redux store:-->>", storedUserName, storedPassword, rem)

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadStoredCredentials();
  }, []);

  const loadStoredCredentials = async () => {
    try {
      if (storedUserName && storedPassword) {
        setUserName(storedUserName);
        setPassword(storedPassword);
        setRememberMe(rem);
      }
    } catch (error) {
      console.error('Error loading stored credentials:', error);
    }
  };

  const handleUserName = (text: any) => {
    setUserName(text);
  };
  const handlePassword = (text: any) => {
    setPassword(text);
  };

  const handleSignIn = async () => {

    if (!emailRegex.test(userName)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    } else if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Invalid Password Format',
      });
    } else if (userName !== uname) {
      Toast.show({
        type: 'error',
        text1: 'Wrong Credential',
        text2: 'Please enter correct email',
      });
    } else if (password !== pass) {
      Toast.show({
        type: 'error',
        text1: 'Wrong Credential',
        text2: 'Please enter correct password',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Welcome :)',
        text2: 'Login Successful',
      });

      dispatch(emailAction(userName))
      dispatch(passwordAction(password))
      dispatch(remeberAction(rememberMe))
      dispatch(loggedAction(true))

      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }],
      });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={Platform.OS == 'ios' || 'android' ? styles.container : {}}
        contentContainerStyle={
          Platform.OS == 'ios' || 'android' ? styles.container : {}
        }>
        <View style={{ flex: 1 }}>
          <View style={styles.imgContianer}>
            <View>
              <Image source={Img.SPLASH_IMG} style={{ height: 150, width: 150, justifyContent: 'center', alignItems: 'center' }} />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <CustomTextInput
              value={userName}
              onChangeText={handleUserName}
              placeholder="Enter Email"
            // secureTextEntry={false}
            />

            <CustomTextInput
              value={password}
              onChangeText={handlePassword}
              secureTextEntry={true}
              placeholder="Enter Password"
            />

            <View style={styles.bottomcontainer}>
              {/* <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity> */}

              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={styles.checkBox}>
                  {rememberMe ? (
                    <Image
                      source={Img.CHECKED}
                      style={styles.checkboxIcon}
                    />
                  ) : (
                    <Image
                      source={Img.UNCHECKED}
                      style={styles.checkboxIcon}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </View>
            </View>

            <CustomButton title="Sign In" onPress={handleSignIn} />

            {/* <Text
              style={{
                fontSize: 14,
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              Don't have an account?{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#0F69F1',
                }}>
                {' '}
                Create Account{' '}
              </Text>
            </Text> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContianer: {
    flex: 0.4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  txtHeading: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },
  fieldContainer: {
    flex: 0.7,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    marginLeft: 20,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bottomcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#0F69F1',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  checkboxIcon: {
    height: 20,
    width: 20,
  },
  rememberMeText: {
    fontSize: 16,
    fontFamily: fonts.SEMIBOLD
  },
});
