import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import LeadList from './components/LeadList';
import ClientDetail from './components/ClientDetail';
import GpsMapView from './components/GpsMapView';
import PhotoDisplay from './components/PhotoDisplay';
import PhotoView from './components/PhotoView';
import {Text} from 'react-native';

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
          renderTitle= { ()=> { return (
                                  <Text
                                      style={{fontWeight:"normal", fontSize:18}}
                                      onPress={()=>Actions.leadList()}
                                   >
                                      Tasks
                                  </Text>)
                              }
                       }
          titleStyle={{ flex:1, alignSelf: 'center', textAlign: 'center'}}
          initial

        />
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
          key="leadList"
          component={LeadList}
          renderTitle= { ()=> { return (
                                  <Text
                                      style={{fontWeight:"normal", fontSize:18}}
                                      onPress={()=>Actions.clientList()}
                                   >
                                      Leads
                                  </Text>)
                              }
                       }
          titleStyle={{ flex:1, alignSelf: 'center', textAlign: 'center'}}
        />
        <Scene key="clientDetail" component={ClientDetail} title="Client Detail" />
        <Scene key="gpsMap" component={GpsMapView} title="GPS Map" />
        <Scene key="photos" component={PhotoDisplay} title="Select Photo" />
        <Scene key="photoView" component={PhotoView} title="View Photo" />
      </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
