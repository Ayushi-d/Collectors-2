import * as React from 'react';
import {TextInput} from 'react-native';
import {COLOR} from '../../constants';
import {OTP_INPUT_STYLE} from './style';

export function OtpInput(props) {
  const onChange = React.useCallback(text => props.onChange(text), [props]);
  return (
    <TextInput
      selectionColor={COLOR.primary}
      style={OTP_INPUT_STYLE.input}
      value={props.value}
      maxLength={1}
      onChangeText={onChange}
      keyboardType={'phone-pad'}
      {...props.fieldProps}
    />
  );
}
