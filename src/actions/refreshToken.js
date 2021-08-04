import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_REFRESH_TOKEN, ACCESS_TOKEN} from '../constants';
import api from '../api';

export const getRefreshToken = async () => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);
  const refreshToken = await AsyncStorage.getItem(APP_REFRESH_TOKEN);
  if (refreshToken) {
    return api.get(refreshToken, 'auth/refresh-token', false);
  } else {
    return api.get(token, 'auth/refresh-token');
  }
};
