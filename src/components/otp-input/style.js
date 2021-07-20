import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE, SPACING} from '../../constants';

export const OTP_INPUT_STYLE = StyleSheet.create({
  input: {
    width: SPACING.h50,
    height: SPACING.h50,
    fontSize: FONT_SIZE.f14,
    backgroundColor: COLOR.white,
    color: COLOR.primary,
    borderRadius: SPACING.v5,
    textAlign: 'center',
  },
});
