import {StyleSheet} from 'react-native';
import {DIMENSIONS, SPACING} from '../../constants';

export const EDIT_POST_STYLE = StyleSheet.create({
  image: {
    width: DIMENSIONS.WINDOW_WIDTH / 3.98,
    height: SPACING.v100,
    marginTop: SPACING.v15,
    resizeMode: 'cover',
  },
});
