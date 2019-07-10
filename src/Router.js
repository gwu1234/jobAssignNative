//import React from 'react';
import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {logoutUserSuccess} from './actions';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import LeadList from './components/LeadList';
import ClientDetail from './components/ClientDetail';
import GpsMapView from './components/GpsMapView';
import PhotoDisplay from './components/PhotoDisplay';
import PhotoView from './components/PhotoView';
import GpsLeadView from './components/GpsLeadView';
import LeadDetail from './components/LeadDetail';
import {Text} from 'react-native';

//const RouterComponent = () => {
class RouterComponent extends Component {
    constructor() {
          super();
    }
    render() {

       return (
         <Router >
           <Scene key="root" hideNavBar >
           <Scene key="auth">
               <Scene key="login" component={LoginForm} title="Duty2Go" />
           </Scene>

           <Scene key="main">
              <Scene
                 onRight={() => Actions.gpsMap()}
                 rightTitle="ClientsOnMap"
                 onLeft={() => {
                     firebase.auth().signOut()
                        .then(() => {
                         this.props.logoutUserSuccess();
                         Actions.auth();
                     });
                 }}
                leftTitle="Logout"
                key="clientList"
                component={ClientList}
                renderTitle= { ()=> { return (
                                  <Text
                                      style={{fontWeight:"normal", fontSize:18, flex:1, alignSelf: 'center', textAlign: 'center'}}
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
             onRight={() => Actions.leadMap()}
             rightTitle="LeadsOnMap"
             onLeft={() => {
                firebase.auth().signOut()
                 .then(() => {
                    console.log("logout");
                    this.props.logoutUserSuccess();
                    Actions.auth();
                });
             }}
             leftTitle="Logout"
             key="leadList"
             component={LeadList}
             renderTitle= { ()=> { return (
                                  <Text
                                      style={{fontWeight:"normal", fontSize:18, flex:1, alignSelf: 'center', textAlign: 'center'}}
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
           <Scene key="leadMap" component={GpsLeadView} title="Lead Map" />
           <Scene key="leadDetail" component={LeadDetail} title="Lead Detail" />
         </Scene>
      </Scene>
    </Router>
  );
};
};

//export default RouterComponent;
export default connect(null, {
  logoutUserSuccess
})(RouterComponent);
