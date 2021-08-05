import {StyleSheet} from 'react-native';
import {DIMENSIONS, SPACING} from '../../constants';

export const SPLASH_STYLE = StyleSheet.create({
  app_logo: {
    width: DIMENSIONS.WINDOW_WIDTH / 1.2,
    height: SPACING.v70,
    resizeMode: 'contain',
  },
  image_background: {
    width: '100%',
    height: DIMENSIONS.WINDOW_HEIGHT,
  },
  collector_text: {
    height: SPACING.v70,
    width: DIMENSIONS.WINDOW_WIDTH / 1.1,
    resizeMode: 'contain',
  },
});
