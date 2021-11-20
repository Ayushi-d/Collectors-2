import {StyleSheet} from 'react-native';
import {COLOR, SPACING, DIMENSIONS} from '../../constants';

export const HOME_STYLE = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(41,41,41,1.2)',
  },
  pagination_container: {
    padding: 0,
    position: 'absolute',
    bottom: DIMENSIONS.WINDOW_HEIGHT / 22,
    left: DIMENSIONS.WINDOW_WIDTH / 3.2,
    paddingTop: SPACING.v10,
  },
  user_image: {
    height: DIMENSIONS.WINDOW_HEIGHT / 2.9,
    width: 300,
    marginRight: SPACING.v40,
    resizeMode: 'center',
    marginBottom: SPACING.v30,
    borderRadius: SPACING.v10,
  },
  black_background: {
    height: DIMENSIONS.WINDOW_HEIGHT / 1.9,
    backgroundColor: COLOR.black,
    marginTop: SPACING.v15,
    borderRadius: SPACING.v10,
  },
  inside_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.v15,
    paddingTop: SPACING.v10,
  },
  user_inside: {
    height: SPACING.v40,
    justifyContent: 'center',
    alignItems: 'center',
    width: SPACING.v40,
    marginRight: SPACING.v10,
    borderRadius: SPACING.v20,
    borderColor: COLOR.white,
    borderWidth: 1,
  },
  image: {
    height: SPACING.v30,
    width: SPACING.v30,
    resizeMode: 'cover',
  },
  share_icons: {
    flexDirection: 'row',
    margin: SPACING.v10,
    paddingHorizontal: SPACING.v10,
  }
});
