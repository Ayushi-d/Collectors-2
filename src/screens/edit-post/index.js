import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Image, TextInput} from 'react-native';
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
import {editImagePost, getAllPost, getUserProfile} from '../../actions';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EDIT_POST_STYLE} from './style';
import {UPLOAD_STYLE} from '../upload/style';
import DropDownPicker from 'react-native-dropdown-picker';

function EditPostScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const dropDownRef = React.useRef();
  const [description, setDescription] = useState('');
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Books', value: 'books'},
    {label: 'Breweriana', value: 'breweriana'},
    {label: 'Trading Cards', value: 'trading_cards'},
    {label: 'Comics', value: 'comics'},
    {label: 'Numismatics', value: 'numismatics'},
    {label: 'Philately', value: 'philately'},
    {label: 'Electronics', value: 'electronics'},
    {label: 'Lamps', value: 'lamps'},
    {label: 'Movies', value: 'movies'},
    {label: 'Music', value: 'music'},
  ]);
  const [subOpen, setSubOpen] = useState(false);
  const [subValue, setSubValue] = useState(null);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    setName(route.params.userData.title);
    setImages(route.params.userData.images);
    setDescription(route.params.userData.description);
    setValue(route.params.userData.category);
    setSubValue(route.params.userData.subCategory);
  }, []);

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

  function changeSubCategoryValue(val) {
    if (val === 'books') {
      setSubCategory([
        {
          label: 'Crime',
          value: 'crime',
        },
        {
          label: 'Fable',
          value: 'fable',
        },
        {
          label: 'Fantasy',
          value: 'fantasy',
        },
        {
          label: 'History',
          value: 'history',
        },
      ]);
    } else if (val === 'breweriana') {
      setSubCategory([
        {
          label: 'Beer Packaging',
          value: 'beer_packaging',
        },
        {
          label: 'Beer Bottles',
          value: 'beer_bottles',
        },
      ]);
    } else if (val === 'trading_cards') {
      setSubCategory([
        {
          label: 'Game Cards',
          value: 'game_cards',
        },
        {
          label: 'Sports Cards',
          value: 'sports_cards',
        },
      ]);
    } else if (val === 'comics') {
      setSubCategory([
        {
          label: 'Anime & Manga',
          value: 'anime_manga',
        },
        {
          label: 'Superhero Comics',
          value: 'superhero_comics',
        },
      ]);
    } else if (val === 'numismatics') {
      setSubCategory([
        {
          label: 'Coins',
          value: 'coins',
        },
        {
          label: 'Bills',
          value: 'bills',
        },
      ]);
    } else if (val === 'philately') {
      setSubCategory([
        {
          label: 'Stamps',
          value: 'stamps',
        },
        {
          label: 'Postal Envelopes',
          value: 'postal_envelopes',
        },
      ]);
    } else if (val === 'electronics') {
      setSubCategory([
        {
          label: 'Consumer Electronics',
          value: 'consumer_electronics',
        },
        {
          label: 'Gadgets',
          value: 'gadgets',
        },
      ]);
    } else if (val === 'lamps') {
      setSubCategory([
        {
          label: 'Desk Lamps',
          value: 'desk_lamps',
        },
        {
          label: 'Floor Lamps',
          value: 'floor_lamps',
        },
      ]);
    } else if (val === 'movies') {
      setSubCategory([
        {
          label: 'Discs',
          value: 'discs',
        },
        {
          label: 'VHS',
          value: 'vhs',
        },
      ]);
    } else if (val === 'music') {
      setSubCategory([
        {
          label: 'Cassette Taps',
          value: 'cassette_taps',
        },
        {
          label: 'Discs',
          value: 'discs',
        },
      ]);
    }
  }

  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: SPACING.v20}}>
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
            style={UPLOAD_STYLE.dropdown}
            open={open}
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
