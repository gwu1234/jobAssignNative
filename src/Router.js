import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import ClientDetail from './components/ClientDetail';
import GpsMapView from './components/GpsMapView';

const RouterComponent = () => {

  return (
    <Router >
     <Scene key="root" hideNavBar >
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="JobAssign Login" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.gpsMap()}
          rightTitle="MapView"
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
        <Scene key="clientDetail" component={ClientDetail} title="Client Detail" />
        <Scene key="gpsMap" component={GpsMapView} title="GPS Map" />
      </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
