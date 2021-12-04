import {StyleSheet} from 'react-native';
import {
  SPACING,
  DIMENSIONS,
  COLOR,
  FONT_SIZE,
  WIDTH,
  HEIGHT,
  FONTS,
} from '../../constants';
export const STYLE = StyleSheet.create({
  commonHorizontalPad: {
    paddingHorizontal: SPACING.v20,
    flex: 1,
  },
  commonTopHorizontalPad: {
    paddingHorizontal: SPACING.v20,
    flex: 1,
    paddingTop: SPACING.v20,
  },
  app_logo: {
    width: DIMENSIONS.WINDOW_WIDTH / 1.2,
    height: SPACING.v70,
    marginTop: SPACING.v60,
    resizeMode: 'contain',
  },
  classified_logo: {
    width: DIMENSIONS.WINDOW_WIDTH / 1.1,
    height: DIMENSIONS.WINDOW_HEIGHT / 9.5,
    resizeMode: 'contain',
  },
  input: {
    height: SPACING.h50,
    width: '100%',
    borderWidth: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: SPACING.h15,
    paddingLeft: SPACING.v15,
    fontSize: FONT_SIZE.f14,
    marginVertical: SPACING.v10,
    borderRadius: SPACING.v25,
    color: COLOR.black,
    justifyContent: 'center',
  },
  login_button: {
    height: SPACING.v60,
    width: '85%',
    borderWidth: 2,
    borderColor: COLOR.light_grey,
    borderRadius: SPACING.v30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    // height: SPACING.v60,
    // width: '100%',
    // borderRadius: SPACING.v30,
    // backgroundColor: COLOR.blue,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button_text: {
    fontSize: FONT_SIZE.f15,
    color: COLOR.white,
    fontFamily: FONTS.montSemiBold,
    letterSpacing: 1,
  },
  x_small_white: {
    fontSize: FONT_SIZE.f13,
    color: COLOR.white,
    fontFamily: FONTS.montLight,
  },
  justify_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.v20
  },
  x_small_orange: {
    fontSize: FONT_SIZE.f13,
    color: COLOR.secondary,
    paddingLeft: SPACING.v5,
  },
  justify_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  large_white: {
    fontSize: FONT_SIZE.f25,
    color: COLOR.white,
    marginTop: SPACING.v10,
    fontFamily: FONTS.montSemiBold,
  },
  large_black: {
    fontSize: FONT_SIZE.f22,
    color: COLOR.black,
  },
  large_black_20: {
    fontSize: FONT_SIZE.f20,
    color: COLOR.black,
  },
  medium_white: {
    fontSize: FONT_SIZE.f18,
    color: COLOR.white,
    fontFamily: FONTS.montSemiBold,
  },
  medium_black: {
    fontSize: FONT_SIZE.f18,
    color: COLOR.black,
    fontFamily: FONTS.montSemiBold,
  },
  align_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_white: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  asset_button: {
    backgroundColor: COLOR.secondary,
    width: DIMENSIONS.WINDOW_WIDTH / 3,
    height: SPACING.v30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category_10: {
    color: COLOR.background_light,
    fontSize: FONT_SIZE.f10,
  },
  padding_wrapper: {
    paddingHorizontal: SPACING.v20,
    paddingTop: SPACING.v20,
  },
  border_margin: {
    borderBottomWidth: 1,
    marginTop: SPACING.v15,
  },
  margin_auto: {
    marginLeft: 'auto',
  },
  user_image_view: {
    width: DIMENSIONS.WINDOW_HEIGHT / 6.7,
    marginTop: SPACING.v30,
    borderColor: COLOR.secondary,
    height: DIMENSIONS.WINDOW_HEIGHT / 6.7,
    borderRadius: DIMENSIONS.WINDOW_HEIGHT / 3.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: SPACING.v15,
  },
  user_image: {
    width: WIDTH.w100,
    height: WIDTH.w100,
    resizeMode: 'contain',
  },
  white_14: {
    color: COLOR.white,
    fontSize: FONT_SIZE.f14,
    fontFamily: FONTS.montRegular,
  },
  border_light: {
    borderBottomWidth: 1,
    borderColor: COLOR.placeholder,
    width: DIMENSIONS.WINDOW_WIDTH,
  },
  drawer_icon: {
    width: SPACING.v25,
    height: SPACING.v25,
    resizeMode: 'contain',
    marginBottom: SPACING.v10,
  },
  row_margin: {
    flexDirection: 'row',
    marginTop: SPACING.v10,
  },
  asset_image: {
    height: DIMENSIONS.WINDOW_HEIGHT / 6.5,
    width: WIDTH.w150,
    resizeMode: 'contain',
  },
  flex: {
    flex: 1,
  },
  margin_padding: {
    marginTop: SPACING.v20,
    backgroundColor: COLOR.white,
    paddingHorizontal: SPACING.v20,
  },
  light_14: {
    color: COLOR.placeholder,
    fontSize: FONT_SIZE.f14,
  },
  down_arrow: {
    height: SPACING.v20,
    width: SPACING.v20,
    resizeMode: 'contain',
  },
  text_center: {
    fontSize: FONT_SIZE.f25,
    textAlign: 'center',
    color: COLOR.primary,
  },
  light_16: {
    color: COLOR.placeholder,
    fontSize: FONT_SIZE.f16,
  },
  black_16: {
    color: COLOR.black,
    fontSize: FONT_SIZE.f16,
  },
  grey_text: {
    color: 'rgba(0, 0, 0, 0.39)',
    fontSize: FONT_SIZE.f12,
  },
  padding_hor: {
    paddingHorizontal: SPACING.v10,
  },
  logo_app: {
    height: SPACING.v70,
    width: SPACING.v70,
    marginRight: SPACING.v20,
    resizeMode: 'contain',
  },
  terms: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: FONT_SIZE.f14,
    // marginTop: SPACING.v35,
  },
  forgot_pass: {
    color: COLOR.yellow1,
    textAlign: 'center',
    fontSize: FONT_SIZE.f14,
    marginTop: SPACING.v40,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.yellow1,
    fontFamily: FONTS.montLight,
  },
  white_16: {
    fontSize: FONT_SIZE.f16,
    color: COLOR.white,
    fontFamily: FONTS.montRegular,
  },
  space_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.v20,
  },
  white_12: {
    fontSize: FONT_SIZE.f12,
    color: COLOR.white,
    fontFamily: FONTS.montLight,
  },
  white_10: {
    fontSize: FONT_SIZE.f10,
    color: COLOR.white,
    fontFamily: FONTS.montLight,
  },
  black_12: {
    fontSize: FONT_SIZE.f12,
    color: COLOR.black,
    fontFamily: FONTS.montLight,
  },
  detail_image: {
    height: DIMENSIONS.WINDOW_HEIGHT / 2,
    width: '100%',
    resizeMode: 'contain',
  },
  background: {
   
    flex: 1,
    backgroundColor: 'rgba(41,41,41,1.2)',
  },
  image_background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resend: {
    marginLeft: 'auto',
    marginTop: SPACING.v10,
    borderBottomWidth: 1,
    borderColor: COLOR.white,
  },
  button_top_margin: {
    marginTop: SPACING.v50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
