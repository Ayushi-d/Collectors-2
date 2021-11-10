import React, {useState} from 'react';
import {View, ScrollView, Text, Image, FlatList, Alert} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {ACCESS_TOKEN, COLOR, DIMENSIONS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {HOME_STYLE} from '../home/style';
import {deletePost, getAllPost, getUserProfile} from '../../actions';
import {connect, useDispatch} from 'react-redux';

function UserDetailScreen({navigation, route}) {
  console.log('route', route.params);
  const dispatch = useDispatch();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  function renderCarouselItem({item, index}) {
    return (
      <View style={{width: '100%', marginRight: SPACING.v30}} key={index}>
        <Image source={{uri: item}} style={STYLE.detail_image} />
      </View>
    );
  }

  function slideActive(index) {
    setActiveSlide(index);
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={route.params.userData.images.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          padding: 0,
          position: 'absolute',
          bottom: -SPACING.v50,
          left: '45%',
          paddingTop: SPACING.v10,
        }}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 3,
        }}
        dotColor={COLOR.yellow1}
        inactiveDotColor={COLOR.white}
        inactiveDotStyle={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: COLOR.white,
        }}
        inactiveDotOpacity={1.1}
        inactiveDotScale={1.1}
      />
    );
  }

  async function deleteThisPost() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    setLoading(true);
    deletePost(token, route.params.userData.id).then(async res => {
      setLoading(false);
      if (res.success) {
        alert(res.message);
        await dispatch(getUserProfile(token));
        await dispatch(getAllPost(token));
        navigateTo(navigation, Routes.UserProfile);
      } else {
        alert(res.message);
      }
    });
  }

  async function deletePostAction() {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post ?', [
      {
        text: 'Yes',
        onPress: () => deleteThisPost(),
        style: 'cancel',
      },
      {text: 'No', onPress: () => console.log('OK Pressed')},
    ]);
  }

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
                {route.params.userData.title ? route.params.userData.title : ''}
              </Text>
            </View>
          </View>
          <Carousel
            data={route.params.userData.images}
            renderItem={renderCarouselItem}
            sliderWidth={DIMENSIONS.WINDOW_WIDTH / 1.1}
            sliderHeight={DIMENSIONS.WINDOW_HEIGHT}
            itemWidth={DIMENSIONS.WINDOW_WIDTH}
            hasParallaxImages={false}
            inactiveSlideOpacity={0.4}
            inactiveSlideScale={6}
            enableMomentum={true}
            firstItem={0}
            contentContainerCustomStyle={{alignItems: 'center'}}
            onSnapToItem={slideActive}
          />
          {pagination()}
        </View>
        <LoginButton
          style={{marginTop: SPACING.v50, alignSelf: 'center'}}
          title={'Delete Post'}
          onPress={deletePostAction}
          isLoading={loading}
        />
        <LoginButton
          style={{alignSelf: 'center', marginTop: SPACING.v20}}
          title={'Edit Post'}
          onPress={() =>
            navigateTo(navigation, Routes.EditPost, {
              userData: route.params.userData,
            })
          }
        />
      </ScrollView>
    </ScreenContainer>
  );
}

export default UserDetailScreen;
