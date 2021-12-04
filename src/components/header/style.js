import {StyleSheet, Platform} from 'react-native';
import {COLOR, DIMENSIONS, FONT_SIZE, HEIGHT, SPACING, WIDTH} from '../../constants';

export const HEADER_STYLE = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? SPACING.v80 : SPACING.v60,
    paddingBottom: SPACING.v10,
    backgroundColor: COLOR.black,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? SPACING.v40 : SPACING.v20,
    alignItems: 'center',
    paddingHorizontal: SPACING.v20,
  },
  user_image: {
    height: SPACING.v30,
    width: SPACING.v30,
    resizeMode: 'contain',
    borderRadius: SPACING.v20,
  },
  logo: {
    height: HEIGHT.h100,
    width: DIMENSIONS.WINDOW_WIDTH / 2,
    resizeMode: 'contain',
  }
});
