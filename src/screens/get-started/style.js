import {StyleSheet} from 'react-native';
import {
  DIMENSIONS,
  HEIGHT,
  SPACING,
  FONT_SIZE,
  COLOR,
  FONTS,
} from '../../constants';

export const GET_STARTED_STYLE = StyleSheet.create({
  justify_center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  app_logo: {
    width: DIMENSIONS.WINDOW_WIDTH / 1.2,
    height: HEIGHT.h120,
    resizeMode: 'contain',
  },
  text: {
    fontSize: FONT_SIZE.f30,
    color: COLOR.white,
    fontFamily: FONTS.montSemiBold,
    letterSpacing: 1,
  },
  sub_heading: {
    fontSize: FONT_SIZE.f15,
    color: COLOR.white,
    fontFamily: FONTS.montLight,
    letterSpacing: 0.2,
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.v30,
  },
});
