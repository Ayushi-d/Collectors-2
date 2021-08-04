import api from '../api';

export const getUserProfile = token => async dispatch => {
  try {
    const res: any = await api.get(token, 'user/my-profile');
    if (res.success) {
      dispatch({
        type: 'USER_SUCCESS',
        payload: res.data,
      });
    } else {
      dispatch({
        type: 'USER_FAILED',
        payload: res.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'USER_FAILED',
    });
  }
};
