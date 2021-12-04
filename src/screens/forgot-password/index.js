import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {STYLE, LoginButton} from '../../common';
import {SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {forgotPass} from '../../actions';
import {TouchableItem} from '../../elements';

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
      forgotPass(email, 'APP_USER', false)
        .then(res => {
          setLoading(false);
          console.log('res from forgot pass', res);
          if (res.success) {
            if (
              res.message ===
              'You already request for this request. Please check you mail id'
            ) {
              alert('Otp not received. Please click on resend otp.');
            } else {
              alert(res.message);
              navigateTo(navigation, Routes.Otp, {userEmail: email});
            }
          } else {
            alert(res.message);
          }
        })
        .catch(err => {
          console.log('err is', err);
        });
    }
  }

  async function clickOnResend() {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      alert('Email is required');
    } else if (!re.test(email)) {
      alert('Please enter valid email');
    } else {
      setLoading(true);
      forgotPass(email, 'APP_USER', true)
        .then(res => {
          setLoading(false);
          console.log('res from forgot pass', res);
          if (res.success) {
            alert(res.message);
            navigateTo(navigation, Routes.Otp, {userEmail: email});
          } else {
            alert(res.message);
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
          <Text style={STYLE.large_white}>Trouble Logging in?</Text>
        </View>
        <View style={{marginTop: SPACING.v50}}>
          <Text style={[STYLE.x_small_white, {textAlign: 'center'}]}>
            Enter your email and we’ll send you an OTP to get back into your
            account
          </Text>
          <InputText label={'Email'} value={email} onChange={setEmail} />
          <TouchableItem onPress={clickOnResend} style={STYLE.resend}>
            <Text style={STYLE.white_14}>Resend OTP</Text>
          </TouchableItem>
          <LoginButton
            onPress={forgotPassword}
            title={'Send otp'.toUpperCase()}
            style={{marginTop: SPACING.v80, alignSelf: 'center'}}
            isLoading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default ForgotPasswordScreen;
