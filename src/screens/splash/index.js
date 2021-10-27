import React, {useEffect} from 'react';
import {Image, View, StatusBar, ImageBackground} from 'react-native';
import {SPLASH_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {STYLE} from '../../common';
import {ACCESS_TOKEN, COLOR} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen({navigation}) {
  useEffect(() => {
    (async function f() {
      await goToLogin();
    })();
  }, []);

  async function goToLogin() {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (token) {
        navigateTo(navigation, Routes.Home, {}, true);
      } else {
        navigateTo(navigation, Routes.GetStarted, {}, true);
      }
    }, 3000);
  }

  return (
    <ImageBackground
      source={require('../../assets/jpg/whatsup_background.jpeg')}
      style={STYLE.image_background}>
      <StatusBar backgroundColor={COLOR.black} barStyle={'light-content'} />
      <View style={STYLE.flex_center}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={SPLASH_STYLE.app_logo}
        />
        <Image
          source={require('../../assets/jpg/collector_2.png')}
          style={SPLASH_STYLE.collector_text}
        />
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;
