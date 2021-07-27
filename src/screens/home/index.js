import React, {useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, AssetSmallButton} from '../../common';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {COLOR, DIMENSIONS, FONTS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';
import {HOME_STYLE} from './style';

function HomeScreen({navigation}) {
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
      <View style={[STYLE.justify_center, {width: '100%'}]} key={index}>
        <Image source={item.img} style={HOME_STYLE.user_image} />
      </View>
    );
  }

  function slideActive(index) {
    setActiveSlide(index);
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={CarouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={HOME_STYLE.pagination_container}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        dotColor={COLOR.blue}
        inactiveDotColor={COLOR.white}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: COLOR.white,
        }}
        inactiveDotOpacity={1.1}
        inactiveDotScale={1.1}
      />
    );
  }

  return (
    <ScreenContainer>
      {/*<View style={STYLE.flex_white}>*/}
      <NavigationHeader navigation={navigation} />
      <View style={{flex: 1, backgroundColor: COLOR.white}}>
        <ScrollView
          contentContainerStyle={[
            STYLE.padding_wrapper,
            {paddingBottom: SPACING.v20},
          ]}>
          <Text style={STYLE.medium_black}>Funkos Collection</Text>
          <Text style={STYLE.black_12}>Popular Funkos</Text>
          <View
            style={{
              height: DIMENSIONS.WINDOW_HEIGHT / 1.7,
              backgroundColor: COLOR.black,
              borderWidth: 1,
              borderColor: COLOR.white,
              marginTop: SPACING.v15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SPACING.v15,
                paddingTop: SPACING.v10,
              }}>
              <Image
                source={require('../../assets/png/app-logo.png')}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
              <View>
                <Text style={[STYLE.white_12, {fontFamily: FONTS.montMedium}]}>
                  {'Isabel bates'}
                </Text>
                <Text style={[STYLE.white_12, {fontFamily: FONTS.montMedium}]}>
                  Item for sale
                </Text>
              </View>
              {/*<Text style={[STYLE.white_16, {marginLeft:'auto'}]}>$12</Text>*/}
            </View>
            <Carousel
              data={CarouselData}
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
            {pagination()}
            <Text
              style={[
                STYLE.white_12,
                {paddingHorizontal: SPACING.v20, paddingBottom: SPACING.v5},
              ]}>
              lorem ipsum dummy content inside simply dumjmy text of tysetting
              idustry
            </Text>
            <Text
              style={[
                STYLE.white_14,
                {
                  marginLeft: 'auto',
                  color: COLOR.yellow1,
                  padding: SPACING.v15,
                },
              ]}
            />
          </View>
        </ScrollView>
      </View>

      {/*</View>*/}
    </ScreenContainer>
  );
}

export default HomeScreen;
