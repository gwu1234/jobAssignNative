import { Actions } from 'react-native-router-flux';

import {
  //EMAIL_CHANGED,
  //PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  SET_USER_TAG,
  SET_EMPLOYEE_KEY,
  //LOGIN_USER,
  //ACCESS_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  //email: '',
  //password: '',
  //access: '',
  user: null,
  userTag: '',
  employeeKey: '',
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
      //console.log("login_user_success");
      //console.log(action.payload.user);
      Actions.main();
      return { ...state, user: action.payload.user};
    case SET_USER_TAG:
      //console.log("set_user_tag");
      //console.log(action.payload.usertag);
      return { ...state, userTag: action.payload.usertag};
    case SET_EMPLOYEE_KEY:
      //console.log("set_employee_key");
      //console.log(action.payload.employeeKey);
      return { ...state, employeeKey: action.payload.employeeKey };
    default:
      return state;
  }
};
