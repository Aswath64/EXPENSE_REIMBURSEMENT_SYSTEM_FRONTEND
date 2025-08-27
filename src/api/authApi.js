import axiosClient from './axiosClient';

export const loginApi = (username, password) =>
  axiosClient.post('/auth/login', { username, password }).then(res => res.data);

export const signupApi = (payload) =>
  axiosClient.post('/auth/signup', payload).then(res => res.data);

// Step 1: Request OTP
export const requestOtpApi = (email) =>
  axiosClient
    .post('/password-reset/request-otp', { email })
    .then(res => {
      console.log(`OTP requested successfully for email: ${email}`);
      return res.data;
    });

// Step 2: Verify OTP and reset password
export const verifyOtpApi = (email, otp, newPassword) =>
  axiosClient
    .post('/password-reset/verify-otp', { email, otp, newPassword })
    .then(res => {
      console.log(`OTP verified and password reset for email: ${email}`);
      return res.data;
    });