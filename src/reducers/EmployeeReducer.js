import {
  EMPLOYEES_FETCH_SUCCESS,
  SET_EMPLOYEE_NAME,
  SET_TRUCK,
  //SET_THUMBS
} from '../actions/types';

const INITIAL_STATE = {
   employeeName: '',
   truck: null,
   thumbs: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    case SET_EMPLOYEE_NAME:
      return { ...state, employeeName: action.payload.name};
    case SET_TRUCK:
      return { ...state, truck: action.payload.truck};
    default:
      return state;
  }
};
