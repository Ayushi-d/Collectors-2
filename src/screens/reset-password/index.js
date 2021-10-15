import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ImageBackground,
} from 'react-native';
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
          <LoginButton
            onPress={() => navigateTo(navigation, Routes.Otp)}
            title={'Submit'}
            style={{marginTop: SPACING.v40, alignSelf: 'center'}}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default ResetPasswordScreen;
