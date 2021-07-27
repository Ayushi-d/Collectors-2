import React, {useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {COLOR, FONT_SIZE, SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';

function RegisterScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
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
          <Text style={STYLE.large_white}>Create your account</Text>
        </View>
        <View style={{marginTop: SPACING.v20}}>
          <InputText label={'Full Name'} value={name} onChange={setName} />
          <InputText label={'Email'} value={email} onChange={setEmail} />
          <InputText
            label={'Create Password'}
            value={password}
            onChange={setPassword}
          />
          <View style={STYLE.justify_center}>
            <LoginButton
              onPress={() =>
                navigateTo(navigation, Routes.Otp, {screen: 'signup'})
              }
              title={'Create account'.toUpperCase()}
              style={{marginTop: SPACING.v40}}
            />
            <Text style={STYLE.terms}>
              By Signing in you agree to the terms of service
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export default RegisterScreen;
