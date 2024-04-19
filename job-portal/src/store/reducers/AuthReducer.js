/* eslint-disable */
import { LOGIN_CONFIRMED_ACTION, LOGIN_ERROR } from '../constants';

const initialState = { errorMessage: '' };

export function AuthReducer(state = initialState, action) {
  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      ...action.payload,
      errorMessage: '',
    };
  }

  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      errorMessage: action.payload.message,
    };
  }
  return state;
}
