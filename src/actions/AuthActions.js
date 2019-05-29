import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {
  LOGIN_USER_SUCCESS,
  SET_USER_TAG,
  SET_EMPLOYEE_KEY,
  //LOGIN_USER
} from './types';

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      user: user
    }
  };
  Actions.main();
};

export const setUserTag = userTag => {
  //console.log("action usertag = " + tag);
  return {
    type: SET_USER_TAG,
    payload: {
      usertag: userTag
    }
  };
};

export const setEmployeeKey = ({employeeKey: employeeKey, userTag: userTag}) => {
  const employeeTag = "repos/" + userTag +"/employees/" + employeeKey;
  var employeeRef = firebase.database().ref(employeeTag)
  var employeeRef = firebase.database().ref(employeeTag)

  return (dispatch) => {
      employeeRef.on('value', snapshot => {
          const employee = snapshot.val();
          let truck = null;
          let clients = [];
          let leads = [];
          let employeeName  = "";
          if (employee) {
              if (employee.truckAssigned) {
                 truck = {
                     model: employee.truckModel,
                     color: employee.truckColor,
                     year: employee.truckYear,
                     key: employee.truckKey,
                     id: employee.truckId,
                 }
              }

              const assignedClients = employee.assigned;
              for (var key in assignedClients) {
                 const {workorders} = assignedClients[key];
                 let activeOrders = 0;
                 for (var orderkey in workorders) {
                      activeOrders ++;
                 }

                 clients.push ({
                     ...assignedClients[key], uid : key, clientKey: key,
                    clientTag: key, activeOrders: activeOrders
                 }) ;
             }

             const assignedLeads = employee.leads;
             for (var key in assignedLeads) {
                leads.push ({...assignedLeads[key]});
              }

             employeeName  = employee.name;
          }

          dispatch({
            type: SET_EMPLOYEE_KEY,
            payload: {
              employeeKey: employeeKey,
              userTag: userTag,
              clients: clients,
              truck: truck,
              leads: leads,
              employeeName: employeeName,
            },
          });
     });
   }
}
