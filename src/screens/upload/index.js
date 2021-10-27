import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Alert,
  Image,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScreenContainer, TouchableItem} from '../../elements';
import {LoginButton, STYLE} from '../../common';
import {
  ACCESS_TOKEN,
  COLOR,
  FONT_SIZE,
  FONTS,
  HEIGHT,
  SPACING,
} from '../../constants';
import {NavigationHeader} from '../../components';
import {UPLOAD_STYLE} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigateTo, uploadFileToS3} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {getAllPost, getUserProfile, uploadImagePost} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useDispatch} from 'react-redux';
import ImageResizer from 'react-native-image-resizer';

let mediaOptions = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 550,
  quality: 1,
};
function UploadScreen({navigation}) {
  const dropDownRef = React.useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
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
  const [imageUpload, setImageUploading] = useState(false);
  const [subValue, setSubValue] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [imageSource, setImageSource] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  function openAlert() {
    Alert.alert(
      'Take a picture',
      'Would you like to open camera or gallery ?',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {text: 'Gallery', onPress: () => openGallery()},
        {text: 'Cancel', onPress: () => {}},
      ],
    );
  }

  function resizeImage(res) {
    return ImageResizer.createResizedImage(
      res.uri,
      res.width,
      res.height,
      'JPEG',
      100,
      res?.originalRotation || 0,
      undefined,
      false,
      {},
    )
      .then(resizedImage => {
        console.log('resizedImage', resizedImage);
        return resizedImage;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function openGallery() {
    launchImageLibrary(mediaOptions, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        let imageSize = await resizeImage(response.assets[0]);
        console.log('image size is', imageSize);
        if (imageSize) {
          const name = `CE-${new Date().getTime()}.${
            response.assets[0].type.split('/')[1]
          }`;
          const file = {
            name: name,
            type: response.assets[0].type,
            uri:
              Platform.OS === 'ios'
                ? imageSize.uri.replace('file://', '')
                : imageSize.uri,
          };
          setImageSource([...imageSource, file]);
          // await uploadedToS3(file);
        }
      }
    });
  }

  function openCamera() {
    launchCamera(mediaOptions, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        let imageSize = await resizeImage(response.assets[0]);
        if (imageSize) {
          const name = `CE-${new Date().getTime()}.${
            response.assets[0].type.split('/')[1]
          }`;
          const file = {
            name: name,
            type: response.assets[0].type,
            uri:
              Platform.OS === 'ios'
                ? imageSize.uri.replace('file://', '')
                : imageSize.uri,
          };
          setImageSource([...imageSource, file]);
          // await uploadedToS3(file);
        }
      }
    });
  }

  async function uploadImages() {
    if (!name) {
      alert('Image title is required');
    } else if (!value) {
      alert('Category is required');
    } else if (!subValue) {
      alert('Sub category is required');
    } else if (!description) {
      alert('Description is required');
    } else if (imageSource.length === 0) {
      alert('Images is required');
    } else {
      var promises = imageSource.map(files => {
        console.log('files is', files);
        setImageUploading(true);
        return uploadFileToS3(files)
          .progress(e => {
            console.log(e.loaded / e.total);
          })
          .then(async s3Response => {
            if (s3Response.status !== 201) {
              alert('Failed to upload image');
            } else {
              console.log(
                's3Response complete url',
                `https://collectors-images.s3.us-east-2.amazonaws.com/${s3Response.body.postResponse.key}`,
              );
              setImageUrl([
                ...imageUrl,
                `https://collectors-images.s3.us-east-2.amazonaws.com/${s3Response.body.postResponse.key}`,
              ]);
              myArray.push(
                `https://collectors-images.s3.us-east-2.amazonaws.com/${s3Response.body.postResponse.key}`,
              );
              return `https://collectors-images.s3.us-east-2.amazonaws.com/${s3Response.body.postResponse.key}`;
            }
          })
          .catch(err => {
            console.log('error in what', err);
          });
      });
      Promise.all(promises).then(async function (results) {
        console.log('results are', results);
        if (results.length > 0) {
          await setMyArray(myArray);
          await uploadImageToApi(results);
        }
      });
    }
  }

  async function uploadImageToApi(imagesArray) {
    console.log('images aray is', imagesArray);
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    setImageUploading(true);
    uploadImagePost(
      token,
      name,
      value,
      subValue,
      description,
      imagesArray,
    ).then(async res => {
      console.log('response of list', res);
      setImageUploading(false);
      if (res.success) {
        alert('Images upload successfully');
        await dispatch(getAllPost(token));
        await navigateTo(navigation, Routes.Home);
        await dispatch(getUserProfile(token));
        await setName('');
        await setValue(null);
        await setSubValue(null);
        await setDescription('');
        await setMyArray([]);
        await setImageSource([]);
      }
    });
  }

  function deleteImage(index) {
    imageSource.splice(index, 1);
    setImageSource([...imageSource]);
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
    <TouchableWithoutFeedback onPress={() => dropDownRef.current?.close()}>
      <ScreenContainer>
        <NavigationHeader navigation={navigation} />
        <View style={STYLE.background}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={UPLOAD_STYLE.padding}>
            <Text style={[STYLE.large_white, {textAlign: 'center'}]}>
              Add a collectible
            </Text>
            <Text
              style={[
                STYLE.white_16,
                {
                  textAlign: 'center',
                  marginTop: SPACING.v5,
                  marginBottom: SPACING.v10,
                },
              ]}>
              Post a Collectible to the Collectors Community
            </Text>
            {imageSource && imageSource.length < 8 && (
              <View>
                <TouchableItem
                  onPress={openAlert}
                  style={UPLOAD_STYLE.plus_button}>
                  <Icon name={'plus'} size={30} color={COLOR.white} />
                </TouchableItem>
                <Text
                  style={[
                    STYLE.white_14,
                    {textAlign: 'center', paddingVertical: SPACING.v10},
                  ]}>
                  Add Image
                </Text>
              </View>
            )}
            {imageSource && imageSource.length > 0 && (
              <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                {imageSource.map((item, index) => {
                  return (
                    <View
                      style={{flexDirection: 'row', paddingLeft: SPACING.v15}}>
                      <Image
                        source={{uri: item.uri}}
                        style={UPLOAD_STYLE.image}
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
            <TextInput
              placeholder={'Collectible Name'}
              placeholderTextColor={COLOR.white}
              style={UPLOAD_STYLE.name_input}
              value={name}
              onChangeText={setName}
            />
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
            <LoginButton
              onPress={uploadImages}
              style={STYLE.button_top_margin}
              title={'Upload'}
              isLoading={imageUpload}
              disable={imageUpload}
            />
          </ScrollView>
        </View>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
}

export function mapStateToProps(state) {
  return {
    user: state.userProfile.user,
  };
}

export default connect(mapStateToProps, null)(UploadScreen);
