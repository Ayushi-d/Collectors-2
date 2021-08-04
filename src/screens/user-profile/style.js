import {StyleSheet} from 'react-native';
import {SPACING, COLOR, WIDTH, DIMENSIONS} from '../../constants';

export const PROFILE_STYLE = StyleSheet.create({
  user_image: {
    height: SPACING.v60,
    width: SPACING.v60,
    resizeMode: 'contain',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: COLOR.white,
    marginTop: SPACING.v20,
  },
  post_image: {
    width: WIDTH.w100,
    height: DIMENSIONS.WINDOW_HEIGHT / 6,
    resizeMode: 'contain',
    borderRadius: SPACING.v8,
  },
});
