import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLOR, FONT_SIZE, FONTS, SPACING} from '../../constants';

export function InputText(props) {
  const onChange = React.useCallback(text => props.onChange(text), [props]);
  const {marginTop = SPACING.v30, height, onEyePress, right, editable} = props;
  return (
    <View style={{marginTop: marginTop}}>
      <TextInput
        label={props.label}
        value={props.value}
        mode="outlined"
        onChangeText={onChange}
        style={[styles.text_input, {height}]}
        selectionColor={COLOR.white}
        underlineColor={COLOR.blue}
        secureTextEntry={props.secureTextEntry}
        right={right}
        editable={editable}
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

const styles = StyleSheet.create({
  text_input: {
    fontSize: FONT_SIZE.f16,
    fontFamily: FONTS.montThin,
  },
});
