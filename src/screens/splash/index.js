import React, {useEffect} from 'react';
import {Image, View, Text, StatusBar} from 'react-native';
import {SPLASH_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import {STYLE} from '../../common';

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
    <LinearGradient colors={['#23036A', '#000000']} style={STYLE.flex}>
      <StatusBar backgroundColor={'#23036A'} barStyle={'light-content'} />
      <View style={STYLE.flex_center}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={SPLASH_STYLE.app_logo}
        />
        <Text style={SPLASH_STYLE.text}>COLLECTORS</Text>
        <Text style={SPLASH_STYLE.edition_text}>EDITION</Text>
      </View>
    </LinearGradient>
  );
}

export default SplashScreen;
