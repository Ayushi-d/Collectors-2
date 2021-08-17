import {StyleSheet} from 'react-native';
import {HEIGHT, SPACING, COLOR, FONTS, FONT_SIZE, DIMENSIONS} from '../../constants';

export const UPLOAD_STYLE = StyleSheet.create({
  padding: {
    paddingBottom: SPACING.v20,
    paddingHorizontal: SPACING.v20,
    flexGrow: 1,
  },
  input: {
    // backgroundColor: COLOR.black,
    height: SPACING.v50,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.white,
    marginTop: SPACING.v10,
    color: COLOR.white,
    fontSize: FONT_SIZE.f14,
    fontFamily: FONTS.montRegular,
    borderRadius: SPACING.v5,
    paddingLeft: SPACING.v10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    height: SPACING.v50,
    borderBottomWidth: 1,
    borderColor: COLOR.white,
    borderWidth: 0,
    marginVertical: SPACING.v5,
  },
  image: {
    width: DIMENSIONS.WINDOW_WIDTH / 4,
    height: SPACING.v100,
    marginTop: SPACING.v15,
    resizeMode: 'cover',
  },
  plus_button: {
    height: SPACING.v70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: SPACING.v10,
    width: SPACING.v70,
    borderWidth: 1,
    borderColor: COLOR.white,
  },
  name_input: {
    borderBottomWidth: 1,
    borderColor: COLOR.white,
    fontSize: FONT_SIZE.f14,
    color: COLOR.white,
    fontFamily: FONTS.montRegular,
    marginHorizontal: SPACING.v5,
  },
});
