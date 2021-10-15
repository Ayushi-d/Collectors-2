import React from 'react';
import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {COLOR, DIMENSIONS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';

function PostDetailScreen({navigation, route}) {
  console.log('route is', route.params);
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
                {route.params.userData.user.name
                  ? route.params.userData.user.name
                  : ''}
              </Text>
            </View>
          </View>
          <Image
            source={
              route.params.imageUri
                ? {uri: route.params.imageUri}
                : require('../../assets/png/user.png')
            }
            style={STYLE.detail_image}
          />
          <Text style={[STYLE.x_small_white, {marginTop: SPACING.v20}]}>
            {route.params.userData.description
              ? route.params.userData.description
              : ''}
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default PostDetailScreen;
