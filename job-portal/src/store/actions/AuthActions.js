import { LOGIN_CONFIRMED_ACTION, LOGIN_ERROR, LOGOUT_ACTION } from '../constants';
import { login } from '../services/AuthService';

export function logoutAction(navigate) {
  localStorage.removeItem('authToken');
  navigate('/login');
  return {
    type: LOGOUT_ACTION,
  };
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFmM2NkMzI0ZDc3MzIxNzg1MDUzY2IiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU2NTUzNjcsImV4cCI6MTY4NzIxMjk2N30.__EeoruOiOqSrLuBEpCKD7xrh_dBNt08P--CprYxzZI';

export function loginAction(data, setSubmitting, navigate) {
  return (dispatch) => {
    login(data, token)
      .then((response) => {
        setSubmitting(false);
        dispatch(loginConfirmedAction(response.data));
        localStorage.setItem('authToken', JSON.stringify(response.data.token));
        navigate('/dashboard/app');
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error.response.data);
        dispatch(loginFailedAction(error.response.data));
      });
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_ERROR,
    payload: data,
  };
}
