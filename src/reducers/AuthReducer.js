import { Actions } from 'react-native-router-flux';

import {
  //EMAIL_CHANGED,
  //PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  //LOGIN_USER_ACCESS,
  //LOGIN_USER_FAIL,
  //LOGIN_USER,
  //ACCESS_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  //email: '',
  //password: '',
  //access: '',
  user: null,
  //error: '',
  //loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case ACCESS_CHANGED:
        return { ...state, access: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };*/
    case LOGIN_USER_SUCCESS:
      console.log("login_user_success");
      console.log(action.payload);
      Actions.main();
      return { ...state, ...INITIAL_STATE, user: action.payload.user};
    /*case LOGIN_USER_ACCESS:
      console.log("login_user_access");
      console.log(action.payload);
      //return { ...state, ...INITIAL_STATE, accessArray: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };*/
    default:
      return state;
  }
};
