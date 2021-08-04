import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {ACCESS_TOKEN, APP_REFRESH_TOKEN, SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from '../../actions';
import {connect, useDispatch} from 'react-redux';

function EditProfileScreen({navigation, user}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('lorem');

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
  }, [user]);

  async function logoutUser() {
    await AsyncStorage.removeItem(APP_REFRESH_TOKEN);
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    navigateTo(navigation, Routes.Login, {}, true);
  }
  
  async function editUserProfile() {
    
  }
  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
        <View style={STYLE.padding_wrapper}>
          <Text style={STYLE.medium_white}>Edit Profile</Text>
          <InputText label={'Name'} value={name} onChange={setName} />
          <InputText label={'Email'} value={email} onChange={setEmail} />
          <InputText label={'Bio'} value={bio} onChange={setBio} />
          <LoginButton
            title={'Save'}
            style={{marginTop: SPACING.v40}}
            onPress={() => navigateTo(navigation, Routes.UserProfile)}
          />
          <LoginButton
            title={'Logout'}
            style={{marginTop: SPACING.v20}}
            onPress={logoutUser}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export function mapStateToProps(state) {
  console.log('state is', state);
  return {
    user: state.userProfile.user,
  };
}

export default connect(mapStateToProps, {getUserProfile})(EditProfileScreen);
