import { Actions } from 'react-native-router-flux';

import {
  //EMAIL_CHANGED,
  //PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  SET_USER_TAG,
  //LOGIN_USER_FAIL,
  //LOGIN_USER,
  //ACCESS_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  //email: '',
  //password: '',
  //access: '',
  user: null,
  userTag: '',
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
      console.log(action.payload.user);
      Actions.main();
      return { ...state, user: action.payload.user};
    case SET_USER_TAG:
      console.log("set_user_tag");
      console.log(action.payload.usertag);
      return { ...state, userTag: action.payload.usertag};
    /*case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };*/
    default:
      return state;
  }
};
