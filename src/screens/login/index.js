import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {ACCESS_TOKEN, APP_REFRESH_TOKEN, COLOR, SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {loginUser} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function focusNextField(id) {
    if (id in inputs) {
      inputs[id].focus();
    }
  }

  function loginNewUser() {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      alert('Email is required');
    } else if (!re.test(email)) {
      alert('Please enter valid email');
    } else if (!password) {
      alert('Password is required');
    } else {
      setLoading(true);
      loginUser(email, password, 'APP_USER')
        .then(response => {
          setLoading(false);
          if (response.success) {
            AsyncStorage.setItem(ACCESS_TOKEN, response.data.token);
            AsyncStorage.setItem(APP_REFRESH_TOKEN, response.data.refreshToken);
            navigateTo(navigation, Routes.Home, {}, true);
          } else {
            alert(response.message);
          }
        })
        .catch(err => {
          console.log('err is', err);
        });
    }
  }
  return (
    <ImageBackground
      source={require('../../assets/jpg/whatsup_background.jpeg')}
      style={STYLE.image_background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={STYLE.commonHorizontalPad}>
        <View style={STYLE.justify_row}>
          <Image
            source={require('../../assets/png/app-logo.png')}
            style={STYLE.logo_app}
          />
        </View>
        <View style={[STYLE.justify_center, {marginTop: SPACING.v20}]}>
          <Text style={STYLE.large_white}>Log in to continue</Text>
        </View>
        <View style={{marginTop: SPACING.v20}}>
          <InputText label={'Email'} value={email} onChange={setEmail} />
          <InputText
            label={'Password'}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
          />
          <View style={STYLE.justify_center}>
            <TouchableItem
              onPress={() => navigateTo(navigation, Routes.ForgotPassword)}>
              <Text style={STYLE.forgot_pass}>Forgot Password?</Text>
            </TouchableItem>
            <LoginButton
              onPress={loginNewUser}
              isLoading={loading}
              title={'LOG IN'}
              style={{marginTop: SPACING.v40}}
            />
            <View style={{flexDirection: 'row', marginTop: SPACING.v10}}>
              <Text style={STYLE.x_small_white}>Don't have an account?</Text>
              <TouchableItem onPress={() => navigateTo(navigation, Routes.Register, {}, true)}>
                <Text style={[STYLE.x_small_white, {color: COLOR.yellow1, paddingLeft: SPACING.v8}]}>Register</Text>
              </TouchableItem>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default LoginScreen;
