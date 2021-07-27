import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';

function EditProfileScreen({navigation}) {
  const [name, setName] = useState('lorem ipsum');
  const [email, setEmail] = useState('loremipsum@yopmail.com');
  const [bio, setBio] = useState('lorem ipsum dummy d');
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
            onPress={() => navigateTo(navigation, Routes.Login, {}, true)}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default EditProfileScreen;
