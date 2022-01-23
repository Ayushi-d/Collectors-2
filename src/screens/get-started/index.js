import React from 'react';
import {Image, View, Text, ImageBackground} from 'react-native';
import {GET_STARTED_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {COLOR, FONTS, SPACING} from '../../constants';
import {GoogleButton, LoginButton, STYLE} from '../../common';

function GetStartedScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/jpg/whatsup_background.jpeg')}
      style={STYLE.image_background}>
      <View style={STYLE.justify_row}>
        <Image
          source={require('../../assets/png/app_logo_blue.png')}
          style={STYLE.logo_app}
        />
      </View>
      <View
        style={[
          GET_STARTED_STYLE.justify_center,
          {paddingHorizontal: SPACING.h15},
        ]}>
        {/*<Image*/}
        {/*  source={require('../../assets/png/app-logo.png')}*/}
        {/*  style={GET_STARTED_STYLE.app_logo}*/}
        {/*/>*/}
        <Text style={GET_STARTED_STYLE.text}>
          A <Text style={{fontFamily: FONTS.poppinsExtraBold}}>trusted market- place</Text> for <Text style={{fontFamily: FONTS.poppinsExtraBold}}>buying</Text> and <Text style={{fontFamily: FONTS.poppinsExtraBold}}>selling</Text> unique <Text style={{fontFamily: FONTS.poppinsExtraBold}}>collectibles</Text>!
        </Text>
        <Text style={[GET_STARTED_STYLE.sub_heading, {marginTop: SPACING.v10}]}>
          Make an offer, discuss over chat and trade, it's that simple!
        </Text>
        <LoginButton
          onPress={() => navigateTo(navigation, Routes.Register, {}, true)}
          style={{marginTop: SPACING.v30}}
          title={'LOGIN/SIGNUP'.toUpperCase()}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <GoogleButton title={'Apple'} />
          <GoogleButton title={'Google'} />
        </View>
        <View style={STYLE.bottom_content}>
          <Text style={STYLE.grey_12}>
            By joining you agree to our{' '}
            <Text style={STYLE.privacy}>
              Privacy Policy
            </Text>{' '}
            and{' '}
          </Text>
          <Text
            style={[STYLE.privacy, {textAlign: 'center', alignSelf: 'center'}]}>
            T&C
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default GetStartedScreen;
