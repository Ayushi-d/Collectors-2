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
import {COLOR, FONTS, SPACING} from '../../constants';
import {InputText} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {forgotPass} from '../../actions';
import {ScreenContainer, TouchableItem} from '../../elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    // <ImageBackground
    //   source={require('../../assets/jpg/whatsup_background.jpeg')}
    //   style={STYLE.image_background}>
      <ScreenContainer>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={STYLE.commonHorizontalPad}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: SPACING.v10}}>
            <Icon name={'chevron-left'} size={30} style={{color: COLOR.white}}/>
            <Text style={[STYLE.white_14, {fontFamily: FONTS.poppinsRegular}]}>Back</Text>
            <Image
                source={require('../../assets/png/app_logo_blue.png')}
                style={[STYLE.logo_app, {marginLeft: SPACING.v100}]}
            />
          </View>
          <View style={{marginTop: SPACING.v20}}>
            <Text style={STYLE.large_white}>Forgot <Text style={{fontFamily: FONTS.poppinsMedium}}>Password?</Text></Text>
          </View>
          <View style={{marginTop: SPACING.v10}}>
            <Text style={[STYLE.x_small_white]}>
              Don't worry, we've got you covered! Enter your registered contact to reset your password.
            </Text>
            <InputText label={'Email ID or Contact Number'} value={email} onChange={setEmail} />
            {/*<TouchableItem onPress={clickOnResend} style={STYLE.resend}>*/}
            {/*  <Text style={STYLE.white_14}>Resend OTP</Text>*/}
            {/*</TouchableItem>*/}
            <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: SPACING.v70}}>
              <View style={{width: SPACING.v50, backgroundColor: COLOR.royal_blue, height: SPACING.v5}}/>
              <View style={{width: SPACING.v50, marginHorizontal: SPACING.v5, backgroundColor: COLOR.darkest_grey, height: SPACING.v5}}/>
              <View style={{width: SPACING.v50, backgroundColor: COLOR.darkest_grey, height: SPACING.v5}}/>
            </View>
            <LoginButton
                onPress={() => navigateTo(navigation, Routes.Otp, {userEmail: 'abc@example.com'} )}
                // onPress={forgotPassword}
                title={'verify'.toUpperCase()}
                style={{marginTop: SPACING.v10, alignSelf: 'center'}}
                isLoading={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </ScreenContainer>

    // </ImageBackground>
  );
}

export default ForgotPasswordScreen;
