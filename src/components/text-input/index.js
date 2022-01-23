import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {COLOR, DIMENSIONS, FONT_SIZE, FONTS, SPACING} from '../../constants';
// import {TextInput} from 'react-native-paper';
import {STYLE} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function InputText(props) {
  const onChange = React.useCallback(text => props.onChange(text), [props]);
  const {
    marginTop = SPACING.v30,
    height,
    onEyePress,
    right,
    editable,
    placeholder,
    showEye,
  } = props;
  return (
    <View
      style={{
        marginTop: marginTop,
        backgroundColor: COLOR.dark_input,
        borderRadius: SPACING.v15,
        borderColor:
          props.label !== 'Password' ? COLOR.royal_blue : 'transparent',
        borderWidth: 2,
        height: SPACING.v70,
      }}>
      {!showEye && (
        <Text
          style={[
            STYLE.grey_12,
            {marginLeft: SPACING.v10, marginTop: SPACING.v10, fontSize: 12},
          ]}>
          {props.label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        selectionColor={COLOR.royal_blue}
        style={{
          fontSize: FONT_SIZE.f12,
          marginTop: props.label === 'Password' ? SPACING.v15 : 0,
          fontFamily: FONTS.poppinsRegular,
          color: COLOR.white,
          height: SPACING.v40,
          paddingLeft: SPACING.v10,
          marginBottom: SPACING.v10,
        }}
      />
      {showEye && (
        <Icon
          name={'eye-off'}
          color={COLOR.darkest_grey}
          size={20}
          style={{position: 'absolute', right: 10, top: 25}}
        />
      )}
      {/*<TextInput*/}
      {/*    label={props.label}*/}
      {/*    value={props.value}*/}
      {/*    mode="flat"*/}
      {/*    onChangeText={onChange}*/}
      {/*    style={[styles.text_input, {height}]}*/}
      {/*    selectionColor={COLOR.white}*/}
      {/*    underlineColor={'transparent'}*/}
      {/*    secureTextEntry={props.secureTextEntry}*/}
      {/*    right={right}*/}
      {/*    editable={editable}*/}
      {/*    dense={false}*/}
      {/*    onFocus={(focus) => {console.log('focus', focus)}}*/}
      {/*    theme={{*/}
      {/*      colors: {*/}
      {/*        placeholder: COLOR.white,*/}
      {/*        text: COLOR.white,*/}
      {/*        primary: COLOR.royal_blue,*/}
      {/*        underlineColor: 'transparent',*/}
      {/*        background: COLOR.dark_input,*/}
      {/*        // roundness: 0,*/}
      {/*      },*/}
      {/*    }}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  text_input: {
    fontSize: FONT_SIZE.f12,
    fontFamily: FONTS.montThin,
    borderRadius: 20,
    //   width: DIMENSIONS.WINDOW_WIDTH / 1.2,
    // position: 'absolute',
    // bottom: 5,
  },
});
