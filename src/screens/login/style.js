import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE, SPACING} from '../../constants';

export const LOGIN_STYLE = StyleSheet.create({
  forgot: {
    marginLeft: 'auto',
    fontSize: FONT_SIZE.f14,
    color: COLOR.secondary,
    borderBottomWidth: 1,
    borderColor: COLOR.secondary,
  },
  or: {
    color: COLOR.secondary,
    fontSize: FONT_SIZE.f14,
    textAlign: 'center',
    marginVertical: SPACING.v20,
  },
});
