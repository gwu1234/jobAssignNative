import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//import _ from 'lodash';
import {
  //EMAIL_CHANGED,
  //PASSWORD_CHANGED,
  //ACCESS_CHANGED,
  LOGIN_USER_SUCCESS,
  //LOGIN_USER_ACCESS,
  //LOGIN_USER_FAIL,
  //LOGIN_USER
} from './types';

/*export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const accessChanged = (text) => {
  return {
    type: ACCESS_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    console.log(email);
    console.log(password);
    dispatch({ type: LOGIN_USER });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserAccess = (dispatch, accessArray) => {
  dispatch({
    type: LOGIN_USER_ACCESS,
    payload: accessArray
  });
};*/

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
  Actions.main();
};
