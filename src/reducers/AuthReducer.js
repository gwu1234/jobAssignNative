import { Actions } from 'react-native-router-flux';

import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  SET_USER_TAG,
  SET_EMPLOYEE_KEY,
  UPDATE_GPS_POSITION,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  userTag: '',
  employeeKey: '',
  clients: [],
  leads: [],
  employeeName: "",
  isLogin: false,
  position: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      Actions.main();
      return { ...state, user: action.payload.user, isLogin: true};
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null, isLogin: false};
    case SET_USER_TAG:
      return { ...state, userTag: action.payload.usertag};
    case SET_EMPLOYEE_KEY:
      return { ...state,
        employeeKey: action.payload.employeeKey,
        userTag: action.payload.userTag,
        clients: action.payload.clients,
        truck: action.payload.truck,
        leads: action.payload.leads,
        employeeName: action.payload.employeeName,
      };
    case UPDATE_GPS_POSITION:
      console.log("reducer: UPDATE_GPS_POSITION")
      console.log(action.payload.position)
      return { ...state,
         position: action.payload.position,
     };
    default:
      return state;
  }
};
