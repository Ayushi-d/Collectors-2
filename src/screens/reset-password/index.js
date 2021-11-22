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
import {verifyOtp} from "../../actions";

function ResetPasswordScreen({navigation, route}) {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  async function resetNew() {
    if (!password) {
      alert('Password is required');
    } else if (!confirmPass) {
      alert('Confirm Password is required');
    } else {
      setLoading(true);
      verifyOtp(
        route.params.email,
        route.params.otp,
        'APP_USER',
        password,
      ).then((res: any) => {
        console.log('response of verify otp with password', res);
        setLoading(false);
        if (res.success) {
          alert(res.message);
          navigateTo(navigation, Routes.Login, {}, true);
        } else {
          alert(res.message);
        }
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
          <Text style={STYLE.large_white}>Reset Password</Text>
        </View>
        <View style={{marginTop: SPACING.v50}}>
          <InputText
            label={'Password'}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
          />
          <InputText
            label={'Confirm Password'}
            value={confirmPass}
            onChange={setConfirmPass}
            secureTextEntry={true}
          />
          <LoginButton
            onPress={resetNew}
            title={'Submit'}
            isLoading={loading}
            style={{marginTop: SPACING.v40, alignSelf: 'center'}}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default ResetPasswordScreen;
