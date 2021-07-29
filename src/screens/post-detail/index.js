import React from 'react';
import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {COLOR, DIMENSIONS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';

function PostDetailScreen({navigation}) {
  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
        <View style={STYLE.padding_wrapper}>
          <Text style={[STYLE.medium_white, {marginBottom: SPACING.v20}]}>
            Posts
          </Text>
          <View style={STYLE.align_row}>
            <View style={[STYLE.align_row, {paddingBottom: SPACING.v10}]}>
              <Image
                source={require('../../assets/png/user.png')}
                style={STYLE.down_arrow}
              />
              <Text
                style={[
                  STYLE.x_small_white,
                  {paddingLeft: SPACING.v15, marginTop: 0},
                ]}>
                Ammy Jackson
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/png/user.png')}
            style={STYLE.detail_image}
          />
          <Text style={[STYLE.x_small_white, {marginTop: SPACING.v20}]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.{' '}
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default PostDetailScreen;
