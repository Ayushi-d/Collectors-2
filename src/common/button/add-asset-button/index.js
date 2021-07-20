import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {TouchableItem} from '../../../elements';
import {STYLE} from '../../css';

export function AssetSmallButton(props) {
  const {isLoading, onPress, disable, title, style} = props;
  return (
    <TouchableItem
      onPress={onPress}
      disable={disable}
      style={[STYLE.asset_button, style]}>
      <Text style={STYLE.x_small_white}>{title}</Text>
    </TouchableItem>
  );
}
