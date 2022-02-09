export const LOGIN = 'LOGIN';

export const sendEmailuser = (email) => ({
  type: LOGIN,
  payload: email,
});
