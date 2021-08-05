import React, {useState} from 'react';
import {ScrollView, Text, TextInput, Alert, Image, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScreenContainer, TouchableItem} from '../../elements';
import {LoginButton, STYLE} from '../../common';
import {COLOR, FONT_SIZE, FONTS, HEIGHT, SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import {UPLOAD_STYLE} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigateTo, uploadFileToS3} from '../../helpers';
import {Routes} from '../../navigation/routes';

let mediaOptions = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 550,
  quality: 1,
};
function UploadScreen({navigation}) {
  const [name, setName] = useState('');
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'cat1', value: 'bbb'},
    {label: 'cat2', value: 'mkmk'},
    {label: 'hdshhf', value: 'fbjsfjbsd'},
    {label: 'ddsjh', value: 'fsfgjh'},
    {label: 'Others', value: 'others'},
  ]);
  const [subOpen, setSubOpen] = useState(false);
  const [subValue, setSubValue] = useState(null);
  const [subCategory, setSubCategory] = useState([
    {label: 'abc', value: 'absd'},
    {label: 'cdf', value: 'bdcdsbjc'},
    {label: 'ghft', value: 'hvcdsh'},
    {label: 'dfbdsbf', value: 'scvhd'},
    {label: 'fsdfjsfj', value: 'scvhd'},
  ]);
  const [imageSource, setImageSource] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  function openAlert() {
    Alert.alert(
      'Take a picture',
      'Would you like to open camera or gallery ?',
      [
        {
          text: 'Open Camera',
          onPress: () => openCamera(),
          style: 'cancel',
        },
        {text: 'Open Gallery', onPress: () => openGallery()},
      ],
    );
  }

  function openGallery() {
    launchImageLibrary(mediaOptions, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('source', source);
        const name = `CE-${new Date().getTime()}.${
          response.assets[0].type.split('/')[1]
        }`;
        const file = {
          name: name,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        setImageSource([...imageSource, file]);
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
        const source = {uri: response.assets[0].uri};
        console.log('source', source);
        const name = `CE-${new Date().getTime()}.${
          response.assets[0].type.split('/')[1]
        }`;
        const file = {
          name: name,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        setImageSource([...imageSource, file]);
      }
    });
  }

  async function uploadImages() {
    // imageSource.map(files => {
    //   console.log('files is', files);
    //   return uploadFileToS3(files)
    //     .progress(e => {
    //       console.log(e.loaded / e.total);
    //     })
    //     .then(async s3Response => {
    //       if (s3Response.status !== 201) {
    //         alert('Failed to upload image');
    //       } else {
    //         console.log(
    //           's3Response complete url',
    //           `https://collectors-images.s3.us-east-2.amazonaws.com${s3Response.body.postResponse.key}`,
    //         );
    //         setImageUrl([
    //           ...imageUrl,
    //           `https://collectors-images.s3.us-east-2.amazonaws.com${s3Response.body.postResponse.key}`,
    //         ]);
    //         myArray.push(
    //           `https://collectors-images.s3.us-east-2.amazonaws.com${s3Response.body.postResponse.key}`,
    //         );
    //       }
    //     })
    //     .catch(err => {
    //       console.log('error is', err);
    //     });
    // });
    // setMyArray(myArray);
  }

  console.log('image source is', imageSource);
  console.log('image url is', imageUrl);
  console.log('my array is', myArray);
  return (
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
          {/*<InputText*/}
          {/*  label={'Collectible name'}*/}
          {/*  value={name}*/}
          {/*  onChange={setName}*/}
          {/*  marginTop={0}*/}
          {/*  height={SPACING.v50}*/}
          {/*/>*/}
          <TextInput
            placeholder={'Collectible Name'}
            placeholderTextColor={COLOR.white}
            style={UPLOAD_STYLE.name_input}
          />
          {/*<Text style={[STYLE.button_text, {marginVertical: SPACING.v10}]}>*/}
          {/*  Category*/}
          {/*</Text>*/}
          <DropDownPicker
            showArrowIcon={false}
            style={UPLOAD_STYLE.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            placeholder={'Select Category'}
            setValue={setValue}
            setItems={setItems}
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
              <Text style={[STYLE.button_text, {marginVertical: SPACING.v10}]}>
                Enter Category
              </Text>
              <TextInput
                placeholder={'Write Something'}
                placeholderTextColor={COLOR.black}
                style={[
                  UPLOAD_STYLE.input,
                  {height: HEIGHT.h150, textAlignVertical: 'top'},
                ]}
              />
            </View>
          ) : (
            <View>
              {/*<Text style={[STYLE.button_text, {marginVertical: SPACING.v10}]}>*/}
              {/*  Sub-Category*/}
              {/*</Text>*/}
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
          {/*<Text style={[STYLE.button_text, {marginTop: SPACING.v10}]}>*/}
          {/*  Description*/}
          {/*</Text>*/}
          <TextInput
            placeholder={'Description'}
            placeholderTextColor={COLOR.white}
            multiline={true}
            onContentSizeChange={event => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
            style={[
              UPLOAD_STYLE.input,
              {
                textAlignVertical: 'top',
                height: Math.max(35, height),
                marginHorizontal: SPACING.v5,
              },
            ]}
          />
          {imageSource.map((item, index) => {
            return (
              <Image source={{uri: item.uri}} style={UPLOAD_STYLE.image} />
            );
          })}
          <LoginButton
            onPress={uploadImages}
            style={STYLE.button_top_margin}
            title={'Upload'}
          />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

export default UploadScreen;
