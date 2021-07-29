import React, {useState} from 'react';
import {ScrollView, Text, TextInput, Alert, Image, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScreenContainer} from '../../elements';
import {LoginButton, STYLE} from '../../common';
import {COLOR, FONT_SIZE, HEIGHT, SPACING} from '../../constants';
import {InputText, NavigationHeader} from '../../components';
import {UPLOAD_STYLE} from './style';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';

let mediaOptions = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 550,
  quality: 1,
};
function UploadScreen({navigation}) {
  const [name, setName] = useState('');
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
        setImageSource([...imageSource, source]);
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
        setImageSource([...imageSource, source]);
      }
    });
  }

  console.log('image source is', imageSource);
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
                marginBottom: SPACING.v30,
              },
            ]}>
            Post a collectible to the collectors community
          </Text>
          <InputText
            label={'Collectible name'}
            value={name}
            onChange={setName}
            marginTop={0}
          />
          <Text style={[STYLE.button_text, {marginVertical: SPACING.v10}]}>
            Category
          </Text>
          <DropDownPicker
            style={UPLOAD_STYLE.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
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
            }}
          />
          {value === 'others' ?
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
              :
              <View>
                <Text style={[STYLE.button_text, {marginVertical: SPACING.v10}]}>
                  Sub-Category
                </Text>
                <DropDownPicker
                    style={UPLOAD_STYLE.dropdown}
                    open={subOpen}
                    value={subValue}
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
                    }}
                />
              </View>
          }

          <Text style={[STYLE.button_text, {marginTop: SPACING.v10}]}>Description</Text>
          <TextInput
            placeholder={'Write Something'}
            placeholderTextColor={COLOR.black}
            style={[
              UPLOAD_STYLE.input,
              {height: HEIGHT.h150, textAlignVertical: 'top'},
            ]}
          />
          <LoginButton
            onPress={openAlert}
            style={{marginVertical: SPACING.v20}}
            title={'Add Images'}
          />
          {imageSource.map((item, index) => {
            return (
              <Image source={{uri: item.uri}} style={UPLOAD_STYLE.image} />
            );
          })}
          {imageSource.length > 0 && (
            <LoginButton
              onPress={() => navigateTo(navigation, Routes.Home)}
              style={{marginVertical: SPACING.v20}}
              title={'Upload'}
            />
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

export default UploadScreen;
