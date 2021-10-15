import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {ACCESS_TOKEN, SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {editImagePost, getAllPost, getUserProfile} from '../../actions';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EDIT_POST_STYLE} from './style';

function EditPostScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    setName(route.params.userData.title);
    setImages(route.params.userData.images);
  }, []);

  async function updatePost() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    setLoading(true);
    editImagePost(token, name, images).then(async res => {
      console.log('response success is', res);
      setLoading(false);
      if (res.success) {
        alert('Your Post edited successfully');
        await dispatch(getAllPost(token));
        await dispatch(getUserProfile(token));
        await navigateTo(navigation, Routes.Home);
      }
    });
  }

  function deleteImage(index) {
    images.splice(index, 1);
    setImages([...images]);
  }

  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
        <View style={STYLE.padding_wrapper}>
          <Text style={[STYLE.medium_white, {marginBottom: SPACING.v20}]}>
            Edit post
          </Text>
          <InputText label={'Name'} value={name} onChange={setName} />
          <Text style={[STYLE.white_14, {marginTop: SPACING.v25}]}>Images</Text>
          {images && images.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                marginVertical: SPACING.v10,
              }}>
              {images.map((item, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', marginRight: SPACING.v20}}>
                    <Image source={{uri: item}} style={EDIT_POST_STYLE.image} />
                    <TouchableItem
                      onPress={() => deleteImage(index)}
                      style={{position: 'absolute', top: 3, right: -15}}>
                      <Icon
                        name={'close-circle-outline'}
                        color={'red'}
                        size={20}
                      />
                    </TouchableItem>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <LoginButton
          style={{alignSelf: 'center', marginVertical: SPACING.v50}}
          title={'Update'}
          isLoading={loading}
          onPress={updatePost}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

export default EditPostScreen;
