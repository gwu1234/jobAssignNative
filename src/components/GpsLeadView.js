import React from 'react';
import firebase from 'firebase';
import { PROVIDER_GOOGLE } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
//import * as MapView from 'expo-file-system';
//import * as PROVIDER_GOOGLE from 'expo-file-system';
//import * as Constants from 'expo-file-system';
//import * as Permissions from 'expo-file-system';

import { connect } from 'react-redux';
import {Image, View, Text, Platform, StyleSheet } from 'react-native';
import pinkSnowplow from './images/pinkSnowplow.png';
import redDot from './images/mRed.png';
import greenDot from './images/mGreen.png';
import blueDot from './images/mBlue.png';
import GpsLeadModal from './GpsLeadModal';


export class GpsLeadView extends React.Component {
  constructor() {
     super();
     this.state = {
         selectedIndex: null,
         error: null,
         //latitude: null,
         //longitude: null,
         //timestamp: null,
         modalOpen: false,
     };
  }

  componentDidMount() {
    /*this._getLocationPermisions();

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
        });
        this.updateLocation(position);
      },
      error => {console.log(error);this.setState({ error: error.message })},
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
   );*/
  }

  /*updateLocation (position){
       const pos = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           timestamp: position.timestamp,
       }
  }

  _getLocationPermisions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
      console.log("GPS permission not granted");
    }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }*/

  onPressMarker(e, index) {
      if (index < -1) {
        "GpsMapView onPressMarker -1"
        //return;
      } else {
         console.log("GpsMapView onPressMarker");
         console.log(index);
         this.setState({
            selectedIndex: index,
            modalOpen: true,
         });
      }
  }


  onCancelPress (index) {
     console.log("GpsMapView onCancelPress");
     console.log(index);
      this.setState({
         modalOpen: false,
         selectedIndex: null,
      });
  }



  render() {

    let lat = null;
    let lng = null;

    /*if (this.state.latitude && this.state.longitude) {
        lat = this.state.latitude;
        lng = this.state.longitude;
        console.log("lat = " + lat) ;
        console.log("lng = " + lng) ;
    }*/
    const {position} = this.props;
    if (position) {
        lat = position.latitude;
        lng = position.longitude;
        //console.log("lat = " + lat) ;
        //console.log("lng = " + lng) ;
    }

    let {selectedIndex, modalOpen} = this.state;
    let {leads} = this.props;

    leads = leads.map((lead, index) => {
      if (/^(\-)?[0-9]+(\.)?[0-9]+$/.test(lead.lat) &&
          /^(\-)?[0-9]+(\.)?[0-9]+$/.test(lead.lng)) {
            const lat = parseFloat(lead.lat) ;
            const lng = parseFloat(lead.lng) ;

            return {  ...lead,
                      lat: lat,
                      lng: lng,
                   };
        }
    });

    const {employeeName} = this.props;
    const clat = lat === null ? 45.465318 : lat  ;
    const clng = lng === null ? -73.833466 : lng  ;

    return (
      <MapView
         provider={PROVIDER_GOOGLE}
         style={{ flex: 1 }}
         initialRegion={{
            latitude: clat ,
            longitude: clng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
         }}
         //showsUserLocation
       >
       {leads.map((lead, index) => (
            <MapView.Marker
                coordinate={{latitude:lead.lat, longitude: lead.lng}}
                key={lead.leadTag}
                ref={_marker => {
                         this.marker = _marker;
                     }}
                id = {index}

                onPress={(e) => this.onPressMarker(e, index)}
                //onPress={() => {}}
                onCalloutPress={(index) => {}}
          >

          <View style={styles.bluecircle} key="bluecircle">
          </View>

              { modalOpen === true && selectedIndex !==null &&selectedIndex === index &&
                    <GpsLeadModal
                          title={lead.name}
                          street={lead.street}
                          city={lead.city}
                          postcode={lead.postcode}
                          provinnce={lead.province}
                          emails ={lead.emails}
                          phones ={lead.phones}
                          cells ={lead.cells}
                          id={index}
                          onCancelPress ={(index)=> this.onCancelPress(index)}
                          modalOpen = {this.state.modalOpen}
                          selectedIndex = {this.state.selectedIndex}
                      />}

            </MapView.Marker>
        ))}


        {clat && clng && <MapView.Marker
            coordinate={{latitude:clat, longitude:clng}}
            key={"employee_m"}
            ref={_marker => {
                     this.marker = _marker;
                 }}
            id = {1234}
            //onPress={(e) => {this.onPressMarker(e, -1)}}
            //onPress={() => {}}
            onCalloutPress={() => {
                   //this.marker.hideCallout();
            }}
        >
            <View style={styles.blackcircle} key="blackcircle">
            </View>



        </MapView.Marker>}
      </MapView>
    );
  }
}

const styles = {
  imageStyle: {
    width: 16,
    height: 16,
  },
  redcircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'red',
  },
  bluecircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'blue',
  },
  greencircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'green',
  },
  blackcircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'green',
    borderWidth: 4,
    borderColor: 'black',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 0,
  },
  pin: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 0,
  },
  calloutText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color:'black',
    marginBottom: 0,
  },
  calloutContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      width: 100,
      height: 30,
    },
};

const mapStateToProps = state => {
  return {
     leads: state.auth.leads,
     employeeName: state.employees.employeeName,
     truck: state.auth.truck,
     usertag: state.auth.userTag,
     employeeKey: state.auth.employeeKey,
     position: state.auth.position,
  };
};

export default connect(mapStateToProps, {})(GpsLeadView);
