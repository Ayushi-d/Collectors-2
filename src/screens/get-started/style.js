import {StyleSheet} from 'react-native';
import {DIMENSIONS, SPACING, FONT_SIZE, COLOR, FONTS} from '../../constants';

export const GET_STARTED_STYLE = StyleSheet.create({
  justify_center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  app_logo: {
    width: DIMENSIONS.WINDOW_WIDTH / 1.3,
    height: SPACING.v70,
    marginBottom: SPACING.v10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: FONT_SIZE.f25,
    color: COLOR.white,
    fontFamily: FONTS.montSemiBold,
    letterSpacing: 1,
    textAlign: 'center',
  },
  sub_heading: {
    fontSize: FONT_SIZE.f15,
    color: COLOR.white,
    fontFamily: FONTS.montLight,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.v30,
  },
});
