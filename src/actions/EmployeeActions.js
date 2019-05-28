import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SET_EMPLOYEE_NAME,
  SET_TRUCK,
  //SET_THUMBS,
} from './types';

export const setEmployeeName = name => {
  return {
    type: SET_EMPLOYEE_NAME,
    payload: {
      name: name
    }
  };
};

export const setTruck = truck => {
  //console.log("employee action setTruck truck = ");
  //console.log(truck);
  return {
    type: SET_TRUCK,
    payload: {
      truck: truck
    }
  };
};
