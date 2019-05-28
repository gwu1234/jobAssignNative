import { Actions } from 'react-native-router-flux';

import {
  LOGIN_USER_SUCCESS,
  SET_USER_TAG,
  SET_EMPLOYEE_KEY,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  userTag: '',
  employeeKey: '',
  clients: [],
  leads: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      Actions.main();
      return { ...state, user: action.payload.user};
    case SET_USER_TAG:
      return { ...state, userTag: action.payload.usertag};
    case SET_EMPLOYEE_KEY:
      return { ...state,
        employeeKey: action.payload.employeeKey,
        userTag: action.payload.userTag,
        clients: action.payload.clients,
        truck: action.payload.truck,
        leads: action.payload.leads,
      };
    default:
      return state;
  }
};
