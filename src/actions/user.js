import api from '../api';

export const registerUser = (name, email, password, appType) => {
  return api.post('auth/register', {
    name,
    email,
    password,
    appType,
  });
};

export function loginUser(email, password, appType) {
  return api.post('auth/login', {
    email,
    password,
    appType,
  });
}

export const forgotPass = (email, appType, resendOtp) => {
  return api.put('auth/forgot-password?', {email, appType, resendOtp});
};
