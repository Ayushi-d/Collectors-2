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
import {ACCESS_TOKEN, APP_REFRESH_TOKEN, COLOR, SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {registerUser} from '../../actions';
import {REGISTER_STYLE} from './style';
import {TextInput} from 'react-native-paper';

function RegisterScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
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
      alert('Name is required');
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
            navigateTo(navigation, Routes.Otp, {screen: 'signup'});
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
    <ImageBackground
      source={require('../../assets/jpg/whatsup_background.jpeg')}
      style={STYLE.image_background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={STYLE.commonHorizontalPad}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={STYLE.justify_row}>
            <Image
              source={require('../../assets/png/app-logo.png')}
              style={STYLE.logo_app}
            />
          </View>
          <View style={[STYLE.justify_center, {marginTop: SPACING.v20}]}>
            <Text style={STYLE.large_white}>Create your account</Text>
          </View>
          <View style={{marginTop: SPACING.v20}}>
            <InputText label={'Full Name'} value={name} onChange={setName} />
            <InputText label={'Email'} value={email} onChange={setEmail} />
            <InputText
              label={'Create Password'}
              value={password}
              onChange={setPassword}
              right={
                <TextInput.Icon
                  color={COLOR.white}
                  name={showPassword ? 'eye' : 'eye-off'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={showPassword}
            />
            <InputText
              label={'Retype Password'}
              value={reTypePassword}
              onChange={setRetypePassword}
              // right={
              //   <TextInput.Icon
              //       color={COLOR.white}
              //       name={showPassword ? 'eye' : 'eye-off'}
              //       onPress={() => setShowPassword(!showPassword)}
              //   />
              // }
              secureTextEntry={true}
            />
            <View style={STYLE.justify_center}>
              <LoginButton
                onPress={createNew}
                title={'Create account'.toUpperCase()}
                style={{marginTop: SPACING.v40}}
                isLoading={loading}
              />
              <View style={REGISTER_STYLE.row_margin}>
                <Text style={STYLE.terms}>By Signing in you agree to the </Text>
                <Text style={REGISTER_STYLE.terms_text}>terms of service</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default RegisterScreen;
