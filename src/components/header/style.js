import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE, SPACING} from '../../constants';

export const HEADER_STYLE = StyleSheet.create({
  container: {
    height: SPACING.v60,
    borderBottomWidth: 1,
    paddingBottom: SPACING.v10,
    borderBottomColor: COLOR.white,
    backgroundColor: COLOR.black,
    flexDirection: 'row',
    paddingTop: SPACING.v20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.v20,
  },
  user_image: {
    height: SPACING.v30,
    width: SPACING.v30,
    resizeMode: 'contain',
    borderRadius: SPACING.v15,
  },
});
