//import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//import _ from 'lodash';
import {
  SET_CLIENTS
} from './types';


export const setClients = clients => {
  //console.log("client action clients = ");
  //console.log(clients);
  return {
    type: SET_CLIENTS,
    payload: {
      clients: clients
    }
  };
};
