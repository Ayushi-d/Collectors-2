import React, {useState} from 'react';
import {Image, View, KeyboardAvoidingView, Platform, Text} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {SPACING} from '../../constants';
import {OtpInput} from '../../components';
import {navigateTo} from "../../helpers";
import {Routes} from "../../navigation/routes";

function OtpScreen({navigation}) {
  let inputs = {};
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');
  function focusNextField(id) {
    if (id in inputs) {
      inputs[id].focus();
    }
  }
  return (
    <ScreenContainer>
      <View style={STYLE.commonHorizontalPad}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={STYLE.app_logo}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{paddingTop: SPACING.v25}}>
          <Text style={STYLE.white_16}>
            Please enter the OTP sent to your registered email I’d
          </Text>
          <View style={STYLE.space_wrapper}>
            <OtpInput
              value={number1}
              onChange={setNumber1}
              fieldProps={{
                ref: input => (inputs.one = input),
                onSubmitEditing: () => focusNextField('two'),
                returnKeyType: 'next',
              }}
            />
            <OtpInput
              value={number2}
              onChange={setNumber2}
              fieldProps={{
                ref: input => (inputs.two = input),
                onSubmitEditing: () => focusNextField('three'),
                returnKeyType: 'next',
              }}
            />
            <OtpInput
              value={number3}
              onChange={setNumber3}
              fieldProps={{
                ref: input => (inputs.three = input),
                onSubmitEditing: () => focusNextField('four'),
                returnKeyType: 'next',
              }}
            />
            <OtpInput
              value={number4}
              onChange={setNumber4}
              fieldProps={{
                ref: input => (inputs.four = input),
                onSubmitEditing: () => focusNextField('five'),
                returnKeyType: 'next',
              }}
            />
            <OtpInput
              value={number5}
              onChange={setNumber5}
              fieldProps={{
                ref: input => (inputs.five = input),
                onSubmitEditing: () => focusNextField('six'),
                returnKeyType: 'next',
              }}
            />
            <OtpInput
              value={number6}
              onChange={setNumber6}
              fieldProps={{
                ref: input => (inputs.six = input),
                returnKeyType: 'done',
              }}
            />
          </View>
          <TouchableItem style={{marginLeft: 'auto', marginTop: SPACING.v10}}>
            <Text style={STYLE.white_14}>Resend OTP</Text>
          </TouchableItem>
          <LoginButton
            onPress={() => navigateTo(navigation, Routes.ResetPass)}
            title={'Submit'}
            style={{marginTop: SPACING.v50}}
          />
        </KeyboardAvoidingView>
      </View>
    </ScreenContainer>
  );
}

export default OtpScreen;
