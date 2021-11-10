import api from '../api';

export const getCategories = token => async dispatch => {
  try {
    const res: any = await api.get(token, 'user/get-category');
    console.log('get cattetet', res);
    if (res.success) {
      dispatch({
        type: 'CATEGORY_SUCCESS',
        payload: res.data,
      });
    } else {
      dispatch({
        type: 'CATEGORY_FAILED',
        payload: res.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'CATEGORY_FAILED',
    });
  }
};

export const getSubCategory = (token, categoryId) => async dispatch => {
  try {
    const res: any = await api.get(
      token,
      `user/get-sub-category/${categoryId}`,
    );
    console.log('get sub categ', res);
    if (res.success) {
      dispatch({
        type: 'SUB_CATEGORY_SUCCESS',
        payload: res.data,
      });
    } else {
      dispatch({
        type: 'SUB_CATEGORY_FAILED',
        payload: res.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'SUB_CATEGORY_FAILED',
    });
  }
};
