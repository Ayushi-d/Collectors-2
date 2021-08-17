import api from '../api';

export const uploadImagePost = (appToken, title, images) => {
  return api.postToken(appToken, 'user/upload-post', {
    title,
    images,
  });
};
