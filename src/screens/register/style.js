import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLOR, SPACING} from '../../constants';

export const REGISTER_STYLE = StyleSheet.create({
  row_margin: {
    flexDirection: 'row',
    marginTop: SPACING.v35,
  },
  terms_text: {
    color: COLOR.yellow1,
    borderWidth: 1,
    paddingBottom: 1,
    borderBottomColor: COLOR.yellow1,
    fontSize: FONT_SIZE.f14,
  },
});
