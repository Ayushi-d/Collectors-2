import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLOR} from '../../constants';
import {STYLE} from '../../common';

export function Loader(props) {
  return (
    <View style={STYLE.justify_center}>
      <ActivityIndicator size={'small'} color={COLOR.white} />
    </View>
  );
}
