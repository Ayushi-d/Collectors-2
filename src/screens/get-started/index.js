import React from 'react';
import {Image, View, Text} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {GET_STARTED_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {SPACING} from '../../constants';
import {LoginButton, STYLE} from '../../common';

function GetStartedScreen({navigation}) {
  return (
    <ScreenContainer>
      <View
        style={[
          GET_STARTED_STYLE.justify_center,
          {paddingHorizontal: SPACING.h20},
        ]}>
        <Image
          source={require('../../assets/png/app-logo.png')}
          style={GET_STARTED_STYLE.app_logo}
        />
        <Text style={GET_STARTED_STYLE.text}>
          Welcome to Collectors Edition
        </Text>
        <Text style={[GET_STARTED_STYLE.sub_heading, {marginTop: SPACING.v10}]}>
          Join our community of collectors, around the world. Showcase, buy,
          sell and exchange collectibles.
        </Text>
        <LoginButton
          onPress={() => navigateTo(navigation, Routes.Register, {}, true)}
          style={{marginTop: SPACING.v30}}
          title={'Get started'.toUpperCase()}
        />
        <TouchableItem
          onPress={() => navigateTo(navigation, Routes.Login, {}, true)}
          style={GET_STARTED_STYLE.login}>
          <Text style={STYLE.button_text}>LOG IN</Text>
        </TouchableItem>
      </View>
    </ScreenContainer>
  );
}

export default GetStartedScreen;
