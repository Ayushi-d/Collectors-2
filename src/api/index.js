import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {
  NAVIGATION_REF,
  BASE_URL,
  ACCESS_TOKEN,
  APP_REFRESH_TOKEN,
} from '../constants';
import {Routes} from '../navigation/routes';
import {navigateTo} from '../helpers';
import {getRefreshToken} from '../actions';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  params: {},
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  async post(url, body) {
    console.log('body of signup', body);
    console.log('url is', `${BASE_URL}/${url}`);
    try {
      let res = await axiosInstance.post(
        `${BASE_URL}/${url}`,
        JSON.stringify(body),
      );
      console.log('response of post', res);
      return res.data;
    } catch (error) {
      if (error.response.status === 500) {
        console.log('hi i m 500');
      }
      return error;
    }
  },
  async postFormDataWithToken(appToken, url, body) {
    const refreshed_token = await validateToken(appToken);
    try {
      let res = await axiosInstance.post(`${BASE_URL}/${url}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${refreshed_token}`,
        },
      });
      console.log('response of post', res);
      return res.data;
    } catch (error) {
      if (error.response.status === 500) {
        console.log('hi i m 500');
      }
      return error;
    }
  },
  async postToken(appToken, url, body) {
    const refreshed_token = await validateToken(appToken);
    try {
      let res = await axios.post(`${BASE_URL}/${url}`, JSON.stringify(body), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshed_token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log('error here is', error);
      if (error.response.status === 401) {
        await tokenExpire();
      }
      if (error.response.status === 500) {
      }
      return error;
    }
  },
  async putToken(appToken, url, body) {
    console.log('body in put token', body);
    const refreshed_token = await validateToken(appToken);
    try {
      let res = await axios.put(`${BASE_URL}/${url}`, JSON.stringify(body), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshed_token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        await tokenExpire();
      }
      if (error.response.status === 500) {
      }
      return error;
    }
  },
  async put(url, body) {
    try {
      let res = await axiosInstance.put(
        `${BASE_URL}/${url}`,
        JSON.stringify(body),
      );
      return res.data;
    } catch (error) {
      if (error.response.status === 500) {
      }
      return error;
    }
  },
  async get(appToken, url, tokenRefresh = true) {
    const refreshed_token = await validateToken(appToken, tokenRefresh);
    try {
      let res = await axios.get(`${BASE_URL}/${url}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshed_token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        await tokenExpire();
      }
      if (error.response.status === 500) {
      }
      return error;
    }
  },
};

export async function tokenExpire() {
  await AsyncStorage.removeItem(ACCESS_TOKEN);
  await AsyncStorage.removeItem(APP_REFRESH_TOKEN);
  await navigateTo(NAVIGATION_REF.current, Routes.Login, {}, true);
}

export function validateToken(token, tokenRefresh = true) {
  return new Promise(async (resolve: any) => {
    let decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    if (currentTime > decodedToken.exp) {
      console.log('token expire');
      if (tokenRefresh) {
        const res: any = await getRefreshToken();
        if (res.success) {
          console.log('token refresh done');
          AsyncStorage.setItem(ACCESS_TOKEN, res.data.token);
          const new_token = res.data.token;
          resolve(new_token);
        } else {
          await tokenExpire();
        }
      } else {
        await tokenExpire();
      }
    } else {
      resolve(token);
    }
  });
}
