import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {COLOR, FONT_SIZE, FONTS, SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {forgotPass} from '../../actions';

function ForgotPasswordScreen({navigation}) {
  let inputs = {};
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function forgotPassword() {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      alert('Email is required');
    } else if (!re.test(email)) {
      alert('Please enter valid email');
    } else {
      setLoading(true);
      forgotPass(email, 'APP_USER')
        .then(res => {
          setLoading(false);
          console.log('res from forgot pass', res);
          if (res.success) {
            alert(res.message);
            navigateTo(navigation, Routes.Otp);
          }
        })
        .catch(err => {
          console.log('err is', err);
        });
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
          {/*<Text style={STYLE.medium_white}>COLLECTORS EDITION</Text>*/}
        </View>
        <View style={[STYLE.justify_center, {marginTop: SPACING.v20}]}>
          <Text style={STYLE.large_white}>Trouble Logging in?</Text>
        </View>
        <View style={{marginTop: SPACING.v50}}>
          <Text style={STYLE.x_small_white}>
            Enter your email and we’ll send you an OTP to get back into your
            account
          </Text>
          <InputText label={'Email'} value={email} onChange={setEmail} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SPACING.v40,
            }}>
            <LoginButton
              onPress={forgotPassword}
              title={'Send otp'.toUpperCase()}
              style={{marginTop: SPACING.v40}}
              isLoading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export default ForgotPasswordScreen;
