import React, {useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STYLE, LoginButton} from '../../common';
import {
  ACCESS_TOKEN,
  APP_REFRESH_TOKEN,
  COLOR,
  DIMENSIONS,
  FONT_SIZE,
  FONTS,
  SPACING,
  WIDTH,
} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {registerUser} from '../../actions';
import {REGISTER_STYLE} from './style';
import {TextInput} from 'react-native-paper';
import {ScreenContainer, TouchableItem} from '../../elements';

function RegisterScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
  const [activeSection, setActiveSection] = useState('Login');
  const [password, setPassword] = useState('');
  const [reTypePassword, setRetypePassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  function focusNextField(id) {
    if (id in inputs) {
      inputs[id].focus();
    }
  }

  function createNew() {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!name) {
      alert('Name is required');
    } else if (!email) {
      alert('Email is required');
    } else if (!re.test(email)) {
      alert('Please enter valid email');
    } else if (!password) {
      alert('Password is required');
    } else if (!reTypePassword) {
      alert('Please retype your password');
    } else if (password !== reTypePassword) {
      alert('Password do not match');
    } else {
      setLoading(true);
      registerUser(name, email, password, 'APP_USER')
        .then(response => {
          console.log('response from register', response);
          setLoading(false);
          if (response.success) {
            AsyncStorage.setItem(ACCESS_TOKEN, response.data.token);
            AsyncStorage.setItem(APP_REFRESH_TOKEN, response.data.refreshToken);
            navigateTo(navigation, Routes.Otp, {
              screen: 'signup',
              userEmail: email,
            });
          } else {
            alert(response.message);
          }
        })
        .catch(error => {
          console.log('catch err', error);
        });
    }
  }
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={STYLE.commonHorizontalPad}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={STYLE.justify_row}>
            <Image
              source={require('../../assets/png/app_logo_blue.png')}
              style={STYLE.logo_app}
            />
          </View>
          <View style={REGISTER_STYLE.header_section}>
            <TouchableItem onPress={() => setActiveSection('Login')}>
              <Text
                style={[
                  STYLE.white_16,
                  {
                    opacity: activeSection === 'Login' ? 1 : 0.5,
                    fontSize: FONT_SIZE.f15,
                  },
                ]}>
                LOGIN
              </Text>
            </TouchableItem>
            <Image
              source={require('../../assets/png/small_active.png')}
              style={[
                REGISTER_STYLE.active_image,
                {
                  left:
                    activeSection === 'Login'
                      ? DIMENSIONS.WINDOW_WIDTH / 4
                      : DIMENSIONS.WINDOW_WIDTH / 1.7,
                },
              ]}
            />
            <TouchableItem onPress={() => setActiveSection('Signup')}>
              <Text
                style={[
                  STYLE.white_16,
                  {
                    marginLeft: SPACING.v80,
                    opacity: activeSection === 'Signup' ? 1 : 0.5,
                  },
                ]}>
                SIGNUP
              </Text>
            </TouchableItem>
          </View>
          <View style={{marginTop: SPACING.v20}}>
            <InputText placeholder={'Email'} label={'Username or E-mail id'} value={name} onChange={setName} />
            <InputText showEye={true} placeholder={'Password'} label={'Password'} value={email} onChange={setEmail} />
            {/*<InputText*/}
            {/*  label={'Create Password'}*/}
            {/*  value={password}*/}
            {/*  onChange={setPassword}*/}
            {/*  right={*/}
            {/*    <TextInput.Icon*/}
            {/*      color={COLOR.white}*/}
            {/*      name={showPassword ? 'eye' : 'eye-off'}*/}
            {/*      onPress={() => setShowPassword(!showPassword)}*/}
            {/*    />*/}
            {/*  }*/}
            {/*  secureTextEntry={showPassword}*/}
            {/*/>*/}
            {/*<InputText*/}
            {/*  label={'Retype Password'}*/}
            {/*  value={reTypePassword}*/}
            {/*  onChange={setRetypePassword}*/}
            {/*  // right={*/}
            {/*  //   <TextInput.Icon*/}
            {/*  //       color={COLOR.white}*/}
            {/*  //       name={showPassword ? 'eye' : 'eye-off'}*/}
            {/*  //       onPress={() => setShowPassword(!showPassword)}*/}
            {/*  //   />*/}
            {/*  // }*/}
            {/*  secureTextEntry={true}*/}
            {/*/>*/}
            <View style={STYLE.justify_center}>
              <LoginButton
                onPress={createNew}
                title={'LOGIN'.toUpperCase()}
                style={{marginTop: SPACING.v40}}
                isLoading={loading}
              />
              <TouchableItem
                onPress={() => navigateTo(navigation, Routes.ForgotPassword)}
                style={{flexDirection: 'row', marginTop: SPACING.v30}}>
                <Text style={[STYLE.grey_12, {fontSize: FONT_SIZE.f13}]}>
                  Forgot your password?
                </Text>
                {/*<TouchableItem*/}
                {/*  onPress={() =>*/}
                {/*    navigateTo(navigation, Routes.Login, {}, true)*/}
                {/*  }>*/}
                <Text
                  style={[
                    STYLE.x_small_white,
                    {
                      fontFamily: FONTS.poppinsMedium,
                      paddingLeft: SPACING.v8,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  GET HELP
                </Text>
                {/*</TouchableItem>*/}
              </TouchableItem>
              {/*<View style={[REGISTER_STYLE.row_margin]}>*/}
              {/*  <Text style={STYLE.terms}>By Signing in you agree to the </Text>*/}
              {/*  <View*/}
              {/*    style={{borderBottomWidth: 1, borderColor: COLOR.yellow1}}>*/}
              {/*    <Text style={REGISTER_STYLE.terms_text}>terms of service</Text>*/}
              {/*  </View>*/}
              {/*</View>*/}
            </View>
          </View>
          <View style={STYLE.bottom_content}>
            <Text style={STYLE.grey_12}>
              By joining you agree to our{' '}
              <Text style={STYLE.privacy}>Privacy Policy</Text> and{' '}
            </Text>
            <Text
              style={[
                STYLE.privacy,
                {textAlign: 'center', alignSelf: 'center'},
              ]}>
              T&C
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export default RegisterScreen;
