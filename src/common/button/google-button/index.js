import React from 'react';
import {Text, ActivityIndicator, Platform} from 'react-native';
import {COLOR, SPACING} from '../../../constants';
import {TouchableItem} from '../../../elements';
import {STYLE} from '../../css';

export function GoogleButton(props) {
  const {isLoading, onPress, disable, title} = props;
  return (
    <TouchableItem
      onPress={onPress}
      disable={disable}
      style={{
        // width: Platform?.OS === 'android' ? '100%' : '50%',
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        height: SPACING.v50,
        backgroundColor: COLOR.google,
        borderRadius: SPACING.v10,
        marginTop: SPACING.v10,
      }}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={COLOR.white} />
      ) : (
        <Text style={STYLE.button_text}>{title}</Text>
      )}
    </TouchableItem>
  );
}
