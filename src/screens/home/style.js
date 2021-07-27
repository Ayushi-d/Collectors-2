import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE, SPACING, DIMENSIONS} from '../../constants';

export const HOME_STYLE = StyleSheet.create({
    pagination_container: {
        padding: 0,
        position: 'absolute',
        bottom: DIMENSIONS.WINDOW_HEIGHT / 9,
        left: DIMENSIONS.WINDOW_WIDTH / 3.4,
        paddingTop: SPACING.v10,
    },
    user_image: {
        height: DIMENSIONS.WINDOW_HEIGHT / 3,
        width: '80%',
        marginRight: SPACING.v40,
        resizeMode: 'cover',
        marginBottom: SPACING.v30
    }
});
