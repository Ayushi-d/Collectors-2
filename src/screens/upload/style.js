import {StyleSheet} from 'react-native';
import {HEIGHT, SPACING, COLOR, FONTS} from '../../constants';

export const UPLOAD_STYLE = StyleSheet.create({
  padding: {
    paddingBottom: SPACING.v20,
    paddingHorizontal: SPACING.v20,
    flexGrow: 1,
  },
  input: {
    backgroundColor: COLOR.black,
    height: SPACING.v50,
    marginTop: SPACING.v10,
    color: COLOR.white,
    fontFamily: FONTS.montRegular,
    borderRadius: SPACING.v5,
    paddingLeft: SPACING.v10,
  },
  dropdown: {
    backgroundColor: COLOR.black,
  },
  image: {
    width: '100%',
    height: HEIGHT.h150,
    marginTop: SPACING.v15,
    resizeMode: 'cover',
  },
});
