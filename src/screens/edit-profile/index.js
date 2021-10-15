import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {ACCESS_TOKEN, APP_REFRESH_TOKEN, SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile, updateUserProfile} from '../../actions';
import {connect, useDispatch} from 'react-redux';

function EditProfileScreen({navigation, user}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('lorem');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function f() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      await dispatch(getUserProfile(token));
    })();
  }, []);

  useEffect(() => {
    console.log('user in edit profile', user);
    setName(user.name);
    setEmail(user.email);
    setBio(user.userBio);
  }, [user]);

  async function logoutUser() {
    await AsyncStorage.removeItem(APP_REFRESH_TOKEN);
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    navigateTo(navigation, Routes.Login, {}, true);
  }

  async function editUserProfile() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    setLoading(true);
    updateUserProfile(token, name, bio, 'APP_USER').then(async res => {
      console.log('update user profile', res);
      setLoading(false);
      if (res.success) {
        alert(res.message);
        await dispatch(getUserProfile(token));
        navigateTo(navigation, Routes.UserProfile);
      } else {
        alert(res.message);
      }
    });
  }
  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
        <View style={STYLE.padding_wrapper}>
          <Text style={STYLE.medium_white}>Edit Profile</Text>
          <InputText label={'Name'} value={name} onChange={setName} />
          <InputText
            editable={false}
            label={'Email'}
            value={email}
            onChange={setEmail}
          />
          <InputText label={'Bio'} value={bio} onChange={setBio} />
          <LoginButton
            title={'Save'}
            style={STYLE.button_top_margin}
            onPress={editUserProfile}
            isLoading={loading}
          />
          <LoginButton
            title={'Logout'}
            style={[STYLE.button_top_margin, {marginTop: SPACING.v20}]}
            onPress={logoutUser}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export function mapStateToProps(state) {
  return {
    user: state.userProfile.user,
  };
}

export default connect(mapStateToProps, {getUserProfile})(EditProfileScreen);
