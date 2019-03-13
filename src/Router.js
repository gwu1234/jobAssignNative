import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {

  return (
    <Router >
     <Scene key="root" hideNavBar >
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="JobAssign Login" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          onLeft={() => {
                firebase.auth().signOut()
                 .then(() => {
                    console.log("logout");
                    Actions.auth();
                });
          }}
          leftTitle="Logout"
          key="clientList"
          component={ClientList}
          title="Assigned Tasks"
          titleStyle={{ flex:1, alignSelf: 'center', textAlign: 'center' }}
          initial
        />
        <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
        <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
      </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
