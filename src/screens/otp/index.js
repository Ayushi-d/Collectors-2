import React, {useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ImageBackground,
} from 'react-native';
import {TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {SPACING} from '../../constants';
import {InputText, OtpInput} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {verifyOtp, verifyEmailApi} from '../../actions';

function OtpScreen({navigation, route}) {
  let inputs = {};
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  function focusNextField(id) {
    if (id in inputs) {
      inputs[id].focus();
    }
  }

  function pressNext() {
    if (route.params.screen === 'signup') {
      if (!otp) {
        alert('Otp is required');
      } else {
        setLoading(true);
        verifyEmailApi(
          route.params.userEmail,
          otp,
          'APP_USER',
          false,
          true,
        ).then(async (res: any) => {
          console.log('response from email verify', res);
          setLoading(false);
          if (res.success) {
            alert(res.message);
            navigateTo(navigation, Routes.Home, {}, true);
          } else {
            alert(res.message);
          }
        });
      }
    } else {
      setLoading(true);
      verifyOtp(route.params.userEmail, otp, 'APP_USER').then((res: any) => {
        console.log('response of verify otp', res);
        setLoading(false);
        if (res.success) {
          alert(res.message);
          navigateTo(
            navigation,
            Routes.ResetPass,
            {email: route.params.userEmail, otp: otp},
            true,
          );
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
      <View style={STYLE.commonHorizontalPad}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={[
            STYLE.logo_app,
            {
              alignSelf: 'center',
              marginTop: SPACING.v50,
            },
          ]}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{paddingTop: SPACING.v25}}>
          <Text style={[STYLE.white_16, {textAlign: 'center'}]}>
            Please enter the OTP sent to your registered email I’d
          </Text>
          {/*<View style={STYLE.space_wrapper}>*/}
            <InputText label={'OTP'} value={otp} onChange={setOtp} />
            {/*<OtpInput*/}
            {/*  value={number1}*/}
            {/*  onChange={setNumber1}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.one = input),*/}
            {/*    onSubmitEditing: () => focusNextField('two'),*/}
            {/*    returnKeyType: 'next',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<OtpInput*/}
            {/*  value={number2}*/}
            {/*  onChange={setNumber2}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.two = input),*/}
            {/*    onSubmitEditing: () => focusNextField('three'),*/}
            {/*    returnKeyType: 'next',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<OtpInput*/}
            {/*  value={number3}*/}
            {/*  onChange={setNumber3}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.three = input),*/}
            {/*    onSubmitEditing: () => focusNextField('four'),*/}
            {/*    returnKeyType: 'next',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<OtpInput*/}
            {/*  value={number4}*/}
            {/*  onChange={setNumber4}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.four = input),*/}
            {/*    onSubmitEditing: () => focusNextField('five'),*/}
            {/*    returnKeyType: 'next',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<OtpInput*/}
            {/*  value={number5}*/}
            {/*  onChange={setNumber5}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.five = input),*/}
            {/*    onSubmitEditing: () => focusNextField('six'),*/}
            {/*    returnKeyType: 'next',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<OtpInput*/}
            {/*  value={number6}*/}
            {/*  onChange={setNumber6}*/}
            {/*  fieldProps={{*/}
            {/*    ref: input => (inputs.six = input),*/}
            {/*    returnKeyType: 'done',*/}
            {/*  }}*/}
            {/*/>*/}
          {/*</View>*/}
          <TouchableItem style={STYLE.resend}>
            <Text style={STYLE.white_14}>Resend OTP</Text>
          </TouchableItem>
          <LoginButton
            onPress={pressNext}
            title={'Submit'}
            isLoading={loading}
            style={STYLE.button_top_margin}
          />
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

export default OtpScreen;
