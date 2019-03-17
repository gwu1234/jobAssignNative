import {
  EMPLOYEES_FETCH_SUCCESS,
  SET_EMPLOYEE_NAME,
} from '../actions/types';

const INITIAL_STATE = {
   employeeName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;

    case SET_EMPLOYEE_NAME:
      return { ...state, employeeName: action.payload.name};
    default:
      return state;
  }
};
