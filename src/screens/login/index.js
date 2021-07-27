import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';

function LoginScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function focusNextField(id) {
    if (id in inputs) {
      inputs[id].focus();
    }
  }
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={STYLE.commonHorizontalPad}>
        <View style={STYLE.justify_row}>
          <Image
            source={require('../../assets/png/app-logo.png')}
            style={STYLE.logo_app}
          />
          <Text style={STYLE.medium_white}>COLLECTORS EDITION</Text>
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
          />
          <View style={STYLE.justify_center}>
            <TouchableItem
              onPress={() => navigateTo(navigation, Routes.ForgotPassword)}>
              <Text style={STYLE.forgot_pass}>Forgot Password?</Text>
            </TouchableItem>
            <LoginButton
              onPress={() => navigateTo(navigation, Routes.Home)}
              title={'LOG IN'}
              style={{marginTop: SPACING.v40}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export default LoginScreen;
