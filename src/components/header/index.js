import * as React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {COLOR, FONTS, SPACING} from '../../constants';
import {HEADER_STYLE} from './style';
import {STYLE} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SPLASH_STYLE} from "../../screens/splash/style";

export function NavigationHeader(props) {
  return (
    <View style={HEADER_STYLE.container}>
      {/*<Image*/}
      {/*  source={require('../../assets/png/user.png')}*/}
      {/*  style={HEADER_STYLE.user_image}*/}
      {/*/>*/}
        <Image
            source={require('../../assets/jpg/collector_2.png')}
            style={HEADER_STYLE.logo}
        />
      {/*<Text style={[STYLE.white_14, {fontFamily: FONTS.montSemiBold}]}>*/}
      {/*  {'Collectors Edition'.toUpperCase()}*/}
      {/*</Text>*/}
        {props.showSearch &&
        <Icon name={'magnify'} color={COLOR.white} size={25} />
        }
    </View>
  );
}
