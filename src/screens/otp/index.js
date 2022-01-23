import React, {useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ImageBackground, TextInput,
} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {COLOR, FONT_SIZE, FONTS, SPACING} from '../../constants';
import {InputText, OtpInput} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {verifyOtp, verifyEmailApi} from '../../actions';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
      <ScreenContainer>
        <View style={STYLE.commonHorizontalPad}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: SPACING.v10}}>
            <Icon name={'chevron-left'} size={30} style={{color: COLOR.white}}/>
            <Text style={[STYLE.white_14, {fontFamily: FONTS.poppinsRegular}]}>Back</Text>
            <Image
                source={require('../../assets/png/app_logo_blue.png')}
                style={[STYLE.logo_app, {marginLeft: SPACING.v100}]}
            />
          </View>
          {/*<Image*/}
          {/*  source={require('../../assets/png/app-logo.png')}*/}
          {/*  style={[*/}
          {/*    STYLE.logo_app,*/}
          {/*    {*/}
          {/*      alignSelf: 'center',*/}
          {/*      marginTop: SPACING.v50,*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : ''}
              // style={{paddingTop: SPACING.v25}}
          >
            {/*<Text style={[STYLE.white_16, {textAlign: 'center'}]}>*/}
            {/*  Please enter the OTP sent to your registered email I’d*/}
            {/*</Text>*/}
            <View style={{marginTop: SPACING.v20}}>
              <Text style={STYLE.large_white}>OTP <Text style={{fontFamily: FONTS.poppinsMedium}}>Verification</Text></Text>
            </View>
            <View style={{marginTop: SPACING.v10}}>
              <Text style={[STYLE.x_small_white]}>
                Enter the One Time Password sent to your contact number ending with 90 to verify.
              </Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: SPACING.v10}}>
              <TextInput style={{width: SPACING.v50, backgroundColor: COLOR.dark_input, alignSelf: 'center', justifyContent: 'center', marginTop: SPACING.v30, height: SPACING.v60, borderWidth: 2, borderRadius: SPACING.v10}}/>
              <TextInput style={{width: SPACING.v50, backgroundColor: COLOR.dark_input, textAlign: 'center', marginHorizontal: SPACING.v10, marginTop: SPACING.v30, height: SPACING.v60,  borderWidth: 2, borderRadius: SPACING.v10}}/>
              <TextInput style={{width: SPACING.v50, backgroundColor: COLOR.dark_input, marginRight: SPACING.v10, marginTop: SPACING.v30, height: SPACING.v60, borderWidth: 2, borderRadius: SPACING.v10}}/>
              <TextInput style={{width: SPACING.v50, backgroundColor: COLOR.dark_input, marginTop: SPACING.v30, height: SPACING.v60, borderWidth: 2, borderRadius: SPACING.v10}}/>
            </View>
            {/*<View style={STYLE.space_wrapper}>*/}
            {/*  <InputText label={'OTP'} value={otp} onChange={setOtp} />*/}
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
            {/*<TouchableItem style={STYLE.resend}>*/}
            {/*  <Text style={STYLE.white_14}>Resend OTP</Text>*/}
            {/*</TouchableItem>*/}
            <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: SPACING.v70}}>
              <View style={{width: SPACING.v50, backgroundColor: COLOR.royal_blue, height: SPACING.v5}}/>
              <View style={{width: SPACING.v50, marginHorizontal: SPACING.v5, backgroundColor: COLOR.royal_blue, height: SPACING.v5}}/>
              <View style={{width: SPACING.v50, backgroundColor: COLOR.darkest_grey, height: SPACING.v5}}/>
            </View>
            <LoginButton
                // onPress={pressNext}
                onPress={pressNext}
                title={'verify otp'.toUpperCase()}
                isLoading={loading}
                style={[STYLE.button_top_margin, {marginTop: SPACING.v10}]}
            />
            <TouchableItem
                onPress={() => navigateTo(navigation, Routes.ForgotPassword)}
                style={{flexDirection: 'row', marginTop: SPACING.v30, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[STYLE.grey_12, {fontSize: FONT_SIZE.f13}]}>
                Haven't received the otp?
              </Text>
              {/*<TouchableItem*/}
              {/*  onPress={() =>*/}
              {/*    navigateTo(navigation, Routes.Login, {}, true)*/}
              {/*  }>*/}
              <Text
                  style={[
                    STYLE.x_small_white,
                    {
                      fontFamily: FONTS.poppinsMedium,
                      paddingLeft: SPACING.v8,
                      color: COLOR.white,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                RESEND
              </Text>
              {/*</TouchableItem>*/}
            </TouchableItem>
          </KeyboardAvoidingView>
        </View>
      </ScreenContainer>
    // <ImageBackground
    //   source={require('../../assets/jpg/whatsup_background.jpeg')}
    //   style={STYLE.image_background}>

    // </ImageBackground>
  );
}

export default OtpScreen;
