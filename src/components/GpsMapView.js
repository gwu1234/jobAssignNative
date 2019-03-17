import React from 'react';
import { MapView , PROVIDER_GOOGLE, Constants, Location, Permissions} from 'expo';
import { connect } from 'react-redux';
import {Image, View, Text, Platform, StyleSheet } from 'react-native';
import pinkSnowplow from './images/pinkSnowplow.png';
import redDot from './images/mRed.png';
import greenDot from './images/mGreen.png';
import blueDot from './images/mBlue.png';
import GpsModalView from './GpsModalView';
//import { Marker } from 'react-native-maps';

//import React, { Component } from 'react';
//import { Platform, Text, View, StyleSheet } from 'react-native';
//import { Constants, Location, Permissions } from 'expo';


export class GpsMapView extends React.Component {
  constructor() {
     super();
     this.state = {
         selectedIndex: null,

         // data from employee/assigned of firebase
         clients: [],

         // initial location
         //location.coords.latitude;
         //location.coords.longitude;
         //location.timestamp;
         location: null,
         error: null,

         // moving position
         latitude: null,
         longitude: null,
         timestamp: null,
         modalOpen: false,
     };
  }

   /*state = {
      //markerColor: 'red',
      selectedMarkerIndex: '',
      //calloutVisible: false,
      //cancelPressed: false,
      clients: this.props.clients,
      location: null,
      errorMessage: null,
  };*/

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    this.setState({
       clients: this.props.clients,
    });

    navigator.geolocation.getCurrentPosition(
      position => {
         this.setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             //latitudeDelta: LATITUDE_DELTA,
             //longitudeDelta: LONGITUDE_DELTA,
             timestamp: position.timestamp,
             error: null,
         });
         //console.log(position.coords.latitude);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000, distanceFilter: 5 },
    );

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
            //latitudeDelta: LATITUDE_DELTA,
            //longitudeDelta: LONGITUDE_DELTA,
        });
        //console.log(position.coords.latitude);
        //console.log(position);
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

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

  onRepeatPress (index) {
      let {clients} = this.state;
      //this.setState({selectedMarkerIndex: index});
      console.log("GpsMapView onRepeatPress");
      console.log(index);
      let client = clients[index];
      client = {...client, status:"repeat"}
      clients[index] = client;

      //console.log(index);
      this.setState({
         clients: clients,
         modalOpen: false,
         selectedIndex: null,
      });
  }

  onDonePress (index) {
      let {clients} = this.state;
      //this.setState({selectedMarkerIndex: index});
      console.log("GpsMapView onDonePress");
      console.log(index);
      let client = clients[index];
      client = {...client, status:"done"}
      clients[index] = client;

      //console.log(index);
      this.setState({
         clients: clients,
         modalOpen: false,
         selectedIndex: null,
      });
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
    /*var markers = [
      {
        latlng: {
            latitude: 45.449485,
            longitude: -73.841047,
        },
        title: 'my place',
        subtitle: '450 Bruce',
        description: '450 Bruce Street',
      }
    ];*/

    /*let text = 'Waiting..';
    if (this.state.errorMessage) {
          text = this.state.errorMessage;
        } else if (this.state.location) {
          text = JSON.stringify(this.state.location);
    }*/

    let lat = null;
    let lng = null;
    if (this.state.location) {
        //console.log(text);
        //console.log(this.state.location.coords.latitude);
        //console.log(this.state.location.coords.longitude);

        //console.log(this.state.location.timestamp);
        //console.log(this.state.location);
        lat = this.state.location.coords.latitude;
        lng = this.state.location.coords.longitude;
    }
    /*coords": Object {
    "accuracy": 65,
    "altitude": 52.230979919433594,
    "altitudeAccuracy": 10,
    "heading": -1,
    "latitude": 45.44958298968795,
    "longitude": -73.8410947429255,
    "speed": -1,
    },
    "timestamp": 1552656499270.3618,*/

    /*if (this.state.latitude && this.state.longitude) {
        lat = this.state.latitude;
        lng = this.state.longitude;
    }*/

    const {clients, selectedIndex, modalOpen} = this.state;
    const {employeeName} = this.props;
    //const {markerColor} = this.state;
    //console.log("at GpsMapView");
    //console.log(clients);
    //const red = false;
    //const blue = true;
    //fairview
    //45.465318, -73.833466
    //if (clients) {
    //   console.log(clients[selectedIndex].status);
    //}
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
       {clients.map((client, index) => (
            <MapView.Marker
                coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
                key={client.clientKey}
                ref={_marker => {
                         this.marker = _marker;
                     }}
                id = {index}

                onPress={(e) => this.onPressMarker(e, index)}
                //onPress={() => {}}
                onCalloutPress={(index) => {}}

                image ={(!client.status || client.status === "undefined") ? redDot: (client.status ==="repeat"? blueDot : greenDot )}
            >







                { modalOpen === true && selectedIndex !==null &&selectedIndex === index &&
                    <GpsModalView
                          title={client.clientName}
                          description={client.clientStreet}
                          id={index}
                          onRepeatPress ={(index)=> this.onRepeatPress(index)}
                          onDonePress ={(index)=> this.onDonePress(index)}
                          onCancelPress ={(index)=> this.onCancelPress(index)}
                          modalOpen = {this.state.modalOpen}
                          selectedIndex = {this.state.selectedIndex}
                          status={client.status}
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
            onPress={(e) => {this.onPressMarker(e, -1)}}
            //onPress={() => {}}
            onCalloutPress={() => {
                   //this.marker.hideCallout();
            }}
        >
            <View style={styles.blackcircle} key="blackcircle">
            </View>

            <MapView.Callout
                  tooltip={false}>
                  <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>
                            {employeeName}
                      </Text>
                  </View>
           </MapView.Callout>

        </MapView.Marker>}
      </MapView>
    );
  }
}

const styles = {
  imageStyle: {
    width: 17,
    height: 17,
  },
  redcircle: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: 'red',
  },
  bluecircle: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: 'blue',
  },
  greencircle: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: 'green',
  },
  blackcircle: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: 'black',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
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
     clients: state.clients.clients,
     employeeName: state.employees.employeeName
  };
};

export default connect(mapStateToProps, {})(GpsMapView);

/*<MapView.Callout tooltip={false}>
      <GpsCalloutView
          title={client.clientName}
          description={client.clientStreet}
          id={index}
          onRepeatPress ={(index)=> this.onRepeatPress(index)}
          onDonePress ={(index)=> this.onDonePress(index)}
      />
</MapView.Callout>*/

/*<Image
   source={pinkSnowplow}
   style={styles.imageStyle}
/>*/
/*
<MapView.Marker
    coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
    title={client.clientName}
    description={client.clientStreet}
    key={client.clientKey} >
    <Image
        source={redDot}
        style={styles.imageStyle}
    />
</MapView.Marker>
*/

/*<MapView
   style={{ flex: 1 }}
   initialRegion={{
      latitude: 45.449485,
      longitude: -73.841047,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   }}
 >
 {clients.map(client => (
      <MapView.Marker
          coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
          title={client.clientName}
          description={client.clientStreet}
          key={client.clientKey}
          ref={_marker => {
                   this.marker = _marker;
               }}
         onPress={() => {}}
         onCalloutPress={() => {
                this.marker.hideCallout();
         }}
      >
          {client.clientCity === "Kirkland" && <View style={styles.circle}>
               <Text style={styles.pinText}>{1}</Text>
          </View>}
          {client.clientCity !== "Kirkland" && <View style={styles.bluecircle}>
               <Text style={styles.pinText}>{2}</Text>
          </View>}

          <MapView.Callout
                tooltip={false}>
                <View>
                    <Text style={styles.calloutText}>
                          callout text
                    </Text>
                </View>
         </MapView.Callout>

      </MapView.Marker>
  ))}
</MapView>*/

/*<MapView.Marker
    coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
    title={client.clientName}
    description={`marker-${index}`}
    key={client.clientKey}
    ref={_marker => {
             this.marker = _marker;
         }}
    onCalloutPress={() => {
          this.setState({markerColor:'blue'});
          //console.log(this.marker.props.description);
          //console.log(this.marker.props.title);
          //console.log(this.marker.props.children.toArray());
          //console.log(this.marker.props.children.redcircle);
    }}
    onPress={(e) => this.onPressMarker(e, index)}
>
    {this.state.selectedMarkerIndex === index  && <View style={styles.circle} key="redcircle">
         <Text style={styles.pinText}>{1}</Text>
    </View>}
    {this.state.selectedMarkerIndex !== index  && <View style={styles.bluecircle} key="bluecircle">
         <Text style={styles.pinText}>{2}</Text>
    </View>}

</MapView.Marker>*/


/*{lat && lng && <MapView.Marker
    coordinate={{latitude:lat, longitude:lng}}
    title={"current location"}
    description={"current location"}
    key={"current location"}
    ref={_marker
    => {
             this.marker = _marker;
         }}
    id = {1234}
    onCalloutPress={() => {}}
    onPress={()=>{}}
>
    <View style={styles.blackcircle} key="blackcircle">
         <Text style={styles.pinText}>{0}</Text>
    </View>
</MapView.Marker>}*/

/*
{client.status==="done"  && <View style={styles.greencircle} key="greencircle">
</View>}
{client.status === "repeat"  && <View style={styles.bluecircle} key="bluecircle">
</View>}
{(!client.status || client.status==="undefined")  && <View style={styles.redcircle} key="redcircle">
</View>}*/

/*
not working for android 4-6
<View style = {client.status === "done" ? styles.greencircle :
    (client.status ==="repeat"? styles.bluecircle : styles.redcircle ) }
/>*/
/* best for android-6
<View style = {client.status === "done" ? styles.greencircle :
    (client.status ==="repeat"? styles.bluecircle : styles.redcircle ) }
/>*/

/*
{false && <Image
    source={client.status === "done" ? greenDot:
        (client.status ==="repeat"? blueDot : redDot )}
    style={styles.imageStyle}
/>}
*/
