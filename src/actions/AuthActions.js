import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import 'firebase/functions';

import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  SET_USER_TAG,
  SET_EMPLOYEE_KEY,
  UPDATE_GPS_POSITION,
  SET_FRENCH,
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

export const updatePosition = (position) => {
  return {
    type: UPDATE_GPS_POSITION,
    payload: {
      position: position
    }
  };
};

export const setFrench = (isFrench) => {
  return {
    type: SET_FRENCH,
    payload: {
      isFrench: isFrench
    }
  };
};


export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  }
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
          let assignedOrders = null;
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

             //console.log("employee assignedOrders:");
             //console.log(employee.assignedOrders);
             //console.log("calling selectOrders");

             const assignedLeads = employee.leads;
             for (var key in assignedLeads) {
                leads.push ({...assignedLeads[key]});
              }

             employeeName  = employee.name;
             let lastDeliveryRead = employee.lastDeliveryRead;
             let lastDeliveryUpdate = employee.lastDeliveryUpdate;
             lastDeliveryRead = (lastDeliveryRead === null ||
                                 lastDeliveryRead === undefined ||
                                 lastDeliveryRead === "undefined") ?
                                 0 : lastDeliveryRead;
             lastDeliveryUpdate = (lastDeliveryUpdate === null ||
                                   lastDeliveryUpdate === undefined ||
                                   lastDeliveryUpdate === "undefined") ?
                                   0 : lastDeliveryUpdate;

             var currentStamp = Date.now();

             const minute1 = 1 * 60 * 1000;
             if (lastDeliveryRead === 0 || lastDeliveryUpdate === 0
                 || lastDeliveryRead < lastDeliveryUpdate
                 || (currentStamp - lastDeliveryRead > minute1)) {
                  var selectOrders = firebase.functions().httpsCallable('selectOrders');
                  selectOrders({orders:employee.assignedOrders}).then(function(result) {
                       //console.log("employee.assignedOrders return results");
                       //console.log(result.data.assigned);
                       //var currentStamp = Date.now();
                       employeeRef.child("lastDeliveryRead").set(currentStamp);
                       employeeRef.child("lastDeliveryUpdate").set(currentStamp);
                       assignedOrders = result.data.assigned;

                       dispatch({
                           type: SET_EMPLOYEE_KEY,
                           payload: {
                              employeeKey: employeeKey,
                              userTag: userTag,
                              clients: clients,
                              truck: truck,
                              leads: leads,
                              employeeName: employeeName,
                              assignedOrders: assignedOrders,
                          },
                       });
                 });
             }
          }
          //console.log(assignedOrders);
          /*dispatch({
            type: SET_EMPLOYEE_KEY,
            payload: {
              employeeKey: employeeKey,
              userTag: userTag,
              clients: clients,
              truck: truck,
              leads: leads,
              employeeName: employeeName,
              assignedOrders: assignedOrders,
            },
          });*/
     });
   }
}
