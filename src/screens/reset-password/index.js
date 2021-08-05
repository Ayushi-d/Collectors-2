import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';

function ResetPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
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
          <Text style={STYLE.large_white}>Reset Password</Text>
        </View>
        <View style={{marginTop: SPACING.v50}}>
          <InputText
            label={'Password'}
            value={password}
            onChange={setPassword}
          />
          <InputText
            label={'Confirm Password'}
            value={confirmPass}
            onChange={setConfirmPass}
          />
          <View style={STYLE.button_top_margin}>
            <LoginButton
              onPress={() => navigateTo(navigation, Routes.Otp)}
              title={'Submit'.toUpperCase()}
              style={{marginTop: SPACING.v40}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export default ResetPasswordScreen;
