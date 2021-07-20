import {CommonActions} from '@react-navigation/native';

export const navigateTo = (
  navigation,
  routeName,
  params = {},
  resetStack = false,
) => {
  if (routeName) {
    if (resetStack) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: routeName, params: params}],
      });
      return navigation.dispatch(resetAction);
    } else {
      navigation.navigate(routeName, params);
    }
  } else {
    return navigation.goBack();
  }
};
