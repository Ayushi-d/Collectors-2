import React, {useEffect} from 'react';
import {Image, View, Text, StatusBar, ImageBackground} from 'react-native';
import {SPLASH_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import {STYLE} from '../../common';
import {COLOR, DIMENSIONS} from '../../constants';

function SplashScreen({navigation}) {
  useEffect(() => {
    (async function f() {
      await goToLogin();
    })();
  }, []);

  function goToLogin() {
    setTimeout(() => {
      navigateTo(navigation, Routes.GetStarted, {}, true);
    }, 3000);
  }

  return (
    <ImageBackground
      source={require('../../assets/jpg/whatsup_background.jpeg')}
      style={SPLASH_STYLE.image_background}>
      <StatusBar backgroundColor={COLOR.black} barStyle={'light-content'} />
      <View style={STYLE.flex_center}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={SPLASH_STYLE.app_logo}
        />
        <Text style={SPLASH_STYLE.text}>COLLECTORS</Text>
        <Text style={SPLASH_STYLE.edition_text}>EDITION</Text>
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;
