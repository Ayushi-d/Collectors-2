import api from '../api';

export const uploadImagePost = (
  appToken,
  title,
  category,
  subCategory,
  description,
  images,
) => {
  return api.postToken(appToken, 'user/upload-post', {
    title,
    category,
    subCategory,
    description,
    images,
  });
};

export const editImagePost = (
  appToken,
  id,
  title,
  category,
  subCategory,
  description,
  images,
) => {
  return api.postToken(appToken, 'user/edit-post', {
    id,
    title,
    category,
    subCategory,
    description,
    images,
  });
};

export const deletePost = (appToken, id) => {
  return api.deleteToken(appToken, 'user/delete-post', id);
};
