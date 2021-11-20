import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import {ScreenContainer, TouchableItem} from '../../elements';
import {STYLE, LoginButton} from '../../common';
import {
  ACCESS_TOKEN,
  COLOR,
  FONT_SIZE,
  FONTS,
  HEIGHT,
  SPACING,
} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {
  editImagePost,
  getAllPost,
  getCategories,
  getSubCategory,
  getUserProfile,
} from '../../actions';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EDIT_POST_STYLE} from './style';
import {UPLOAD_STYLE} from '../upload/style';
import DropDownPicker from 'react-native-dropdown-picker';

function EditPostScreen({navigation, route, categories, subCategories}) {
  console.log('cat', categories);
  console.log('route', route);
  console.log('subyy', subCategories);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const dropDownRef = React.useRef();
  const [description, setDescription] = useState('');
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [subOpen, setSubOpen] = useState(false);
  const [subValue, setSubValue] = useState(null);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    (async function f() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      await dispatch(getCategories(token));
      await dispatch(getSubCategory(token, route.params?.userData.categoryId));
    })();
  }, []);

  useEffect(() => {
    (async function f() {
      setName(route.params.userData.title);
      setImages(route.params.userData.images);
      setDescription(route.params.userData.description);
      if (categories.length > 0) {
        let catArray = [];
        categories.map(item => {
          catArray.push({
            label: item.title,
            value: item.id,
          });
        });
        setItems(catArray);
      }
      if (subCategories.length > 0) {
        let subArray = [];
        subCategories.map(item => {
          subArray.push({
            label: item.title,
            value: item.id,
          });
        });
        setSubCategory(subArray);
      }
    })();
    return () => {}
  }, [categories, subCategories]);

  useEffect(() => {
    if(categories.length > 0) {
      let index = categories.findIndex(
        ele => ele.id === route.params?.userData.categoryId,
      );
      setValue(items[index]?.value);
    } else if(subCategories.length > 0) {
      let index = subCategories.findIndex(
        ele => ele.id === route.params?.userData.subCategoryId,
      );
      setSubValue(subCategory[index].id);
    }
  }, [])

  async function updatePost() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    setLoading(true);
    console.log('route params id', route.params.userData.id);
    editImagePost(
      token,
      route.params.userData.id,
      name,
      value,
      subValue,
      description,
      images,
    ).then(async res => {
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
    if (images.length > 1) {
      images.splice(index, 1);
      setImages([...images]);
    } else {
      alert('There is only one image in this post, so you can not delete it');
    }
  }

  async function changeSubCategoryValue(val) {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    await dispatch(getSubCategory(token, val));
  }

  return (
    <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => {
          setOpen(false)
          setSubOpen(false)}}>
      <ScreenContainer>
        <NavigationHeader navigation={navigation} />
        <ScrollView
          nestedScrollEnabled={true}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          contentContainerStyle={{paddingBottom: SPACING.v20}}>
          <View style={STYLE.padding_wrapper}>
            <Text style={[STYLE.medium_white, {marginBottom: SPACING.v20}]}>
              Edit post
            </Text>
            {/*<InputText label={'Name'} value={name} onChange={setName} />*/}
            <Text
              style={[
                STYLE.white_14,
                {marginHorizontal: 10, fontFamily: FONTS.montserratExtraBold},
              ]}>
              Name
            </Text>
            <TextInput
              placeholder={'Collectible Name'}
              placeholderTextColor={COLOR.white}
              style={[UPLOAD_STYLE.name_input]}
              value={name}
              onChangeText={setName}
            />
            <Text
              style={[
                STYLE.white_14,
                {
                  marginTop: 10,
                  marginHorizontal: 10,
                  fontFamily: FONTS.montserratExtraBold,
                },
              ]}>
              Category
            </Text>
            <DropDownPicker
              ref={dropDownRef}
              showArrowIcon={false}
              open={subOpen ? false : open}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              controller={instance => (dropDownRef.current = instance)}
              style={UPLOAD_STYLE.dropdown}
              value={value}
              items={items}
              setOpen={setOpen}
              placeholder={'Select Category'}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={val => changeSubCategoryValue(val)}
              zIndex={2000}
              zIndexReverse={1000}
              dropDownContainerStyle={{
                backgroundColor: COLOR.black,
                color: COLOR.white,
              }}
              textStyle={{
                fontSize: FONT_SIZE.f14,
                color: COLOR.white,
                fontFamily: FONTS.montRegular,
              }}
            />
            {value === 'others' ? (
              <View>
                {/*<Text style={[STYLE.button_text, {marginVertical: SPACING.v10, fontFamily: FONTS.montRegular, paddingLeft: SPACING.v10}]}>*/}
                {/*  Enter Category*/}
                {/*</Text>*/}
                <TextInput
                  placeholder={'Write Something'}
                  placeholderTextColor={COLOR.white}
                  multiline={true}
                  style={[
                    UPLOAD_STYLE.input,
                    {
                      height: HEIGHT.h150,
                      textAlignVertical: 'top',
                      fontFamily: FONTS.montRegular,
                    },
                  ]}
                />
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    STYLE.white_14,
                    {
                      marginHorizontal: 10,
                      marginTop: 10,
                      fontFamily: FONTS.montserratExtraBold,
                    },
                  ]}>
                  Sub-Category
                </Text>
                <DropDownPicker
                  style={UPLOAD_STYLE.dropdown}
                  open={subOpen}
                  showArrowIcon={false}
                  value={subValue}
                  placeholder={'Select Sub-Category'}
                  items={subCategory}
                  setOpen={setSubOpen}
                  // open={open ? false : subOpen}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  setValue={setSubValue}
                  setItems={setSubCategory}
                  zIndex={1000}
                  zIndexReverse={2000}
                  dropDownContainerStyle={{
                    backgroundColor: COLOR.black,
                    color: COLOR.white,
                  }}
                  textStyle={{
                    fontSize: FONT_SIZE.f14,
                    color: COLOR.white,
                    fontFamily: FONTS.montRegular,
                  }}
                />
              </View>
            )}
            <Text
              style={[
                STYLE.white_14,
                {
                  marginHorizontal: 10,
                  marginTop: 10,
                  fontFamily: FONTS.montserratExtraBold,
                },
              ]}>
              Description
            </Text>
            <TextInput
              placeholder={'Description'}
              placeholderTextColor={COLOR.white}
              multiline={true}
              value={description}
              onChangeText={setDescription}
              onContentSizeChange={event => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              style={[
                UPLOAD_STYLE.input,
                {
                  textAlignVertical: 'top',
                  height: Math.max(35, height),
                },
              ]}
            />
            <Text
              style={[
                STYLE.white_14,
                {
                  marginTop: SPACING.v25,
                  fontFamily: FONTS.montserratExtraBold,
                  marginHorizontal: 10,
                },
              ]}>
              Images
            </Text>
            {images && images.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  marginVertical: SPACING.v10,
                  // marginHorizontal: 10,
                }}>
                {images.map((item, index) => {
                  return (
                    <View
                      style={{flexDirection: 'row', marginRight: SPACING.v20}}>
                      <Image
                        source={{uri: item}}
                        style={EDIT_POST_STYLE.image}
                      />
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
    </TouchableOpacity>
  );
}

export function mapStateToProps(state) {
  return {
    categories: state.catList.categoriesList,
    subCategories: state.catList.subCategories,
  };
}

export default connect(mapStateToProps, null)(EditPostScreen);
