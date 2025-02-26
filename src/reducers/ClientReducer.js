import { Actions } from 'react-native-router-flux';

import {
  SET_CLIENTS,
} from '../actions/types';

const INITIAL_STATE = {
  clients: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLIENTS:
      return { ...state, clients: action.payload.clients};
    default:
      return state;
  }
};
