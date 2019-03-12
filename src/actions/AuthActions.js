import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  ACCESS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
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

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
         console.log(user);
         loginUserSuccess(dispatch, user);
       })
      .catch((error) => {
        console.log("login failed");
        console.log(firebase.app().options);
        console.log(error);
        loginUserFail(dispatch);
        /*firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
             console.log("user created");
             console.log(user)
             loginUserSuccess(dispatch, user);
          })
          .catch((err) => {
             console.log("user creatation failed");
             console.log(err)
             loginUserFail(dispatch);
          });*/
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
