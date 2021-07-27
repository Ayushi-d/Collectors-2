import * as React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLOR, FONT_SIZE, FONTS, SPACING} from '../../constants';

export function InputText(props) {
  const onChange = React.useCallback(text => props.onChange(text), [props]);
  return (
    <View style={{marginTop: SPACING.v30}}>
      <TextInput
        label={props.label}
        value={props.value}
        mode="outlined"
        onChangeText={onChange}
        style={{
          fontSize: FONT_SIZE.f16,
          fontFamily: FONTS.montThin,
        }}
        selectionColor={COLOR.white}
        underlineColor={COLOR.blue}
        theme={{
          colors: {
            placeholder: COLOR.white,
            text: COLOR.white,
            primary: COLOR.error,
            underlineColor: COLOR.error,
            background: COLOR.black,
            roundness: 2,
          },
        }}
      />
    </View>
  );
}
