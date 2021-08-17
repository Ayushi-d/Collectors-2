import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {ACCESS_TOKEN, COLOR, DIMENSIONS, FONTS, SPACING} from '../../constants';
import {Loader, NavigationHeader} from '../../components';
import {HOME_STYLE} from './style';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllPost, getUserProfile} from '../../actions';

function HomeScreen({navigation, user, posts}) {
  console.log('all posts are', posts);
  const dispatch = useDispatch();
  console.log('home profile is', user);
  const [activeSlide, setActiveSlide] = useState(0);
  const CarouselData = [
    {
      id: 1,
      img: require('../../assets/jpg/user1.jpg'),
    },
    {
      id: 2,
      img: require('../../assets/png/user.png'),
    },
    {
      id: 3,
      img: require('../../assets/jpg/user1.jpg'),
    },
  ];

  function renderCarouselItem({item, index}) {
    return (
      <TouchableItem
        onPress={() =>
          navigateTo(navigation, Routes.PostDetail, {imageUri: item})
        }
        style={[STYLE.justify_center, {width: '100%'}]}
        key={index}>
        <Image
          blurRadius={0}
          source={{uri: item}}
          style={HOME_STYLE.user_image}
        />
      </TouchableItem>
    );
  }

  useEffect(() => {
    (async function f() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      await dispatch(getUserProfile(token));
      await dispatch(getAllPost(token));
    })();
  }, []);

  useEffect(() => {
    console.log('user is', user);
  }, [user, posts]);

  const DATA = [
    {
      name: 'Isabel bates',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      name: 'John Abrahum',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    },
  ];

  function slideActive(index) {
    setActiveSlide(index);
  }

  function pagination(item) {
    return (
      <Pagination
        dotsLength={item.images.length}
        activeDotIndex={activeSlide}
        containerStyle={HOME_STYLE.pagination_container}
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

  function renderItem({item}) {
    return (
      <View style={HOME_STYLE.black_background}>
        <View style={HOME_STYLE.inside_content}>
          <View style={HOME_STYLE.user_inside}>
            <Image
              source={require('../../assets/png/user.png')}
              style={HOME_STYLE.image}
            />
          </View>
          <View>
            <Text style={[STYLE.white_12, {fontFamily: FONTS.montMedium}]}>
              {item.title}
            </Text>
            <Text style={[STYLE.white_12, {fontFamily: FONTS.montMedium}]}>
              Item for sale
            </Text>
          </View>
        </View>
        <Carousel
          data={item.images}
          renderItem={renderCarouselItem}
          sliderWidth={DIMENSIONS.WINDOW_WIDTH}
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
        {pagination(item)}
        {/*<Text*/}
        {/*  style={[*/}
        {/*    STYLE.white_12,*/}
        {/*    {paddingHorizontal: SPACING.v20, paddingBottom: SPACING.v5},*/}
        {/*  ]}>*/}
        {/*  {item.content}*/}
        {/*</Text>*/}
        <View style={HOME_STYLE.share_icons}>
          <TouchableItem>
            <Icon name={'thumb-up-outline'} color={COLOR.white} size={22} />
          </TouchableItem>
          <TouchableItem style={{marginHorizontal: SPACING.v20}}>
            <Icon name={'comment-outline'} color={COLOR.white} size={22} />
          </TouchableItem>
          <TouchableItem style={STYLE.margin_auto}>
            <Icon name={'share'} color={COLOR.white} size={22} />
          </TouchableItem>
        </View>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <View style={STYLE.background}>
        <ScrollView
          contentContainerStyle={[
            STYLE.padding_wrapper,
            {paddingBottom: SPACING.v20},
          ]}>
          {posts && posts.length > 0 ? (
            <FlatList data={posts} renderItem={renderItem} />
          ) : (
            <Loader />
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

export function mapStateToProps(state) {
  return {
    user: state.userProfile.user,
    posts: state.allUsersPost.data,
  };
}

export default connect(mapStateToProps, null)(HomeScreen);
