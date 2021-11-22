import React from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE} from '../../common';
import {DIMENSIONS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';
import ImageZoom from 'react-native-image-pan-zoom';

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
          <ImageZoom
            cropWidth={DIMENSIONS.WINDOW_WIDTH}
            cropHeight={DIMENSIONS.WINDOW_HEIGHT / 2}
            imageWidth={200}
            imageHeight={200}>
            <Image
              source={
                route.params.imageUri
                  ? {uri: route.params.imageUri}
                  : require('../../assets/png/user.png')
              }
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </ImageZoom>
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
