import React, {useEffect} from 'react';
import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {ACCESS_TOKEN, FONTS, SPACING} from '../../constants';
import {NavigationHeader} from '../../components';
import {PROFILE_STYLE} from './style';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from '../../actions';

function UserProfileScreen({navigation, user}) {
  const dispatch = useDispatch();
  const DATA = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

  useEffect(() => {
    (async function f() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      await dispatch(getUserProfile(token));
    })();
  }, []);

  useEffect(() => {
    console.log('user is', user);
  }, [user]);

  function renderItem({item, index}) {
    return (
      <TouchableItem
        onPress={() => navigateTo(navigation, Routes.PostDetail)}
        key={index}
        style={{paddingLeft: SPACING.v15}}>
        <Image
          source={require('../../assets/png/user.png')}
          style={PROFILE_STYLE.post_image}
        />
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
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>6</Text>
                  <Text style={STYLE.white_12}>Posts</Text>
                </View>
                <View style={{marginHorizontal: SPACING.v15}}>
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>6</Text>
                  <Text style={STYLE.white_12}>followers</Text>
                </View>
                <View>
                  <Text style={[STYLE.white_12, {textAlign: 'center'}]}>
                    12
                  </Text>
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
                  {user ? user.name : 'Ammy'}
                </Text>
                <Text style={STYLE.white_12}>
                  {user ? user.email : 'lorem email'}
                </Text>
                <Text style={STYLE.white_12}>User Bio</Text>
                <Text style={STYLE.white_12}>Dummy data</Text>
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
            data={DATA}
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
  console.log('state is', state);
  return {
    user: state.userProfile.user,
  };
}

export default connect(mapStateToProps, {getUserProfile})(UserProfileScreen);