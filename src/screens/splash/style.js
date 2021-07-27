import {StyleSheet} from 'react-native';
import {
  DIMENSIONS,
  HEIGHT,
  SPACING,
  FONT_SIZE,
  COLOR,
  FONTS,
} from '../../constants';

export const SPLASH_STYLE = StyleSheet.create({
  app_logo: {
    width: DIMENSIONS.WINDOW_WIDTH,
    height: HEIGHT.h120,
    resizeMode: 'contain',
    marginLeft: SPACING.v20,
  },
  text: {
    fontSize: FONT_SIZE.f36,
    color: COLOR.white,
    textAlign: 'center',
    fontFamily: FONTS.montSemiBold,
    letterSpacing: 3,
  },
  edition_text: {
    fontSize: FONT_SIZE.f18,
    marginLeft: DIMENSIONS.WINDOW_WIDTH / 2,
    color: COLOR.yellow,
    fontFamily: FONTS.montSemiBold,
    letterSpacing: 3,
  },
});
