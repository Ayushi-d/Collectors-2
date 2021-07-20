import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {COLOR} from '../../../constants';
import {TouchableItem} from '../../../elements';
import {STYLE} from '../../css';

export function LoginButton(props) {
  const {isLoading, onPress, disable, title, style} = props;
  return (
    <TouchableItem
      onPress={onPress}
      disable={disable}
      style={[STYLE.login_button, style]}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={COLOR.white} />
      ) : (
        <Text style={STYLE.button_text}>{title}</Text>
      )}
    </TouchableItem>
  );
}
