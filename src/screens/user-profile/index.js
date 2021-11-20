import React, {useEffect} from 'react';
import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {ACCESS_TOKEN, COLOR, FONT_SIZE, FONTS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';
import {PROFILE_STYLE} from './style';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from '../../actions';

function UserProfileScreen({navigation, user}) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function f() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      await dispatch(getUserProfile(token));
    })();
  }, []);

  useEffect(() => {}, [user]);

  function renderItem({item, index}) {
    return (
      <TouchableItem
        onPress={() =>
          navigateTo(navigation, Routes.UserDetail, {userData: item})
        }
        key={index}
        style={{paddingLeft: SPACING.v15, paddingVertical: SPACING.v10}}>
        {item.images.length > 1 ? (
          <View>
            <Image
              source={{uri: item.images[0]}}
              style={PROFILE_STYLE.post_image}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                width: SPACING.v15,
                height: SPACING.v15,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SPACING.v7,
                backgroundColor: COLOR.white,
                opacity: 0.5,
              }}>
              <Text
                style={{
                  fontSize: 8,
                  color: COLOR.black,
                  fontFamily: FONTS.montSemiBold,
                }}>
                {item.images.length}
              </Text>
            </View>
          </View>
        ) : (
          <Image
            source={{uri: item.images[0]}}
            style={PROFILE_STYLE.post_image}
          />
        )}
      </TouchableItem>
    );
  }

  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <View style={STYLE.background}>
        <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
          <View style={STYLE.padding_wrapper}>
            <View style={[STYLE.align_row, {paddingBottom: SPACING.v10}]}>
              <Image
                source={require('../../assets/png/user.png')}
                style={PROFILE_STYLE.user_image}
              />
              {/*<Text*/}
              {/*  style={[*/}
              {/*    STYLE.large_white,*/}
              {/*    {paddingLeft: SPACING.v15, marginTop: 0},*/}
              {/*  ]}>*/}
              {/*  {user ? user.name : 'Ammy'}*/}
              {/*</Text>*/}
              <View style={[STYLE.margin_auto, {flexDirection: 'row'}]}>
                <View>
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>
                    {user.uploads.length}
                  </Text>
                  <Text style={STYLE.white_12}>Posts</Text>
                </View>
                <View style={{marginHorizontal: SPACING.v15}}>
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>0</Text>
                  <Text style={STYLE.white_12}>followers</Text>
                </View>
                <View>
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>0</Text>
                  <Text style={STYLE.white_12}>following</Text>
                </View>
              </View>
            </View>
            <View style={STYLE.align_row}>
              <View>
                <Text
                  style={[
                    STYLE.white_16,
                    {marginTop: 0, fontFamily: FONTS.montSemiBold},
                  ]}>
                  {user ? user.name : ''}
                </Text>
                <Text style={STYLE.white_12}>
                  {user ? user.email : 'lorem email'}
                </Text>
                <Text style={STYLE.white_12}>{user.userBio ? user.userBio : ''}</Text>
              </View>
              {/*<View style={[STYLE.margin_auto, {flexDirection: 'row',}]}>*/}
              {/*  <View>*/}
              {/*    <Text style={[STYLE.white_10, {textAlign: 'center'}]}>6</Text>*/}
              {/*    <Text style={STYLE.white_10}>Posts</Text>*/}
              {/*  </View>*/}
              {/*  <View style={{marginHorizontal: SPACING.v15}}>*/}
              {/*    <Text style={[STYLE.white_10, {textAlign: 'center'}]}>6</Text>*/}
              {/*    <Text style={STYLE.white_10}>followers</Text>*/}
              {/*  </View>*/}
              {/*  <View>*/}
              {/*    <Text style={[STYLE.white_10, {textAlign: 'center'}]}>*/}
              {/*      12*/}
              {/*    </Text>*/}
              {/*    <Text style={STYLE.white_10}>following</Text>*/}
              {/*  </View>*/}
              {/*</View>*/}
            </View>
            <LoginButton
              onPress={() => navigateTo(navigation, Routes.EditProfile)}
              title={'Edit Profile'}
              style={{marginTop: SPACING.v15, alignSelf: 'center'}}
            />
          </View>
          <View style={PROFILE_STYLE.border} />
          <FlatList
            data={user?.uploads.reverse()}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item, index) => `${item.id}`}
          />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

export function mapStateToProps(state) {
  return {
    user: state.userProfile.user,
  };
}

export default connect(mapStateToProps, {getUserProfile})(UserProfileScreen);
