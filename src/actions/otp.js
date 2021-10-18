import api from '../api';

export const verifyOtp = (email, otp, appType) => {
  return api.put('auth/verify-otp', {email, otp, appType});
};

export const verifyEmailApi = (email, otp, appType, resendOtp, verifyEmail) => {
  return api.put('auth/verify-email', {
    email,
    otp,
    appType,
    resendOtp,
    verifyEmail,
  });
};
