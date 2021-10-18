import api from '../api';

export const uploadImagePost = (appToken, title, images) => {
  return api.postToken(appToken, 'user/upload-post', {
    title,
    images,
  });
};

export const editImagePost = (appToken, id, title, images) => {
  return api.postToken(appToken, 'user/edit-post', {
    id,
    title,
    images,
  });
};

export const deletePost = (appToken, id) => {
  return api.deleteToken(appToken, 'user/delete-post', id);
};
