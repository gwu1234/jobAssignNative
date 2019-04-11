import React from 'react';
import firebase from 'firebase';
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
const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;


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
         //location: null,
         error: null,

         // moving position
         latitude: null,
         longitude: null,
         timestamp: null,
         modalOpen: false,
         truckKey: null,
         truckPath: null,
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

  /*componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log("not on android devices");
      this.setState({
        error: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      console.log("getting gps location");
    }
  }*/

  componentWillMount() {
     this._updateClient();
  }

  _updateClient =  () => {
     const {usertag, clients} = this.props;

     clients.map((client, index) => {
        const orderPath = `/repos/${usertag}/clients/data/${client.clientTag}/workorders`;
        //console.log(orderPath);
        firebase.database().ref(orderPath).once('value')
          .then((snapshot) => {
              const orders = snapshot.val();
              if (orders) {
                  let date = new Date("January 1, 1900");
                  let orderId ="";
                  let orkerKey ="";
                  let orderWork="";
                  for (var key in orders) {
                     //console.log(orders[key].orderId);
                     //console.log(key);
                     const thisdate = new Date (orders[key].date)
                     if (thisdate > date) {
                         date = thisdate;
                         orderId = orders[key].orderId;
                         orderKey = orders[key].orderKey;
                         orderWork = orders[key].work;
                     }
                 }
                 //console.log(orderKey);
                 //console.log(orderId);
                 client = {...client, orderId: orderId, orderKey: orderKey, orderWork: orderWork}
                 //console.log(client);
                 stateclients = this.state.clients;
                 stateclients.push(client);
                 this.setState({
                    clients: stateclients,
                 });
              }
         })
     });
     //console.log(newclients);
  };

  componentDidMount() {
    const {usertag, truck} = this.props;
    const {clients} = this.state;
    const truckPath = "repos/" + usertag +"/trucks/" + truck.key;
    //console.log(clients);

    this.setState({
       //clients: this.props.clients,
       truckKey: this.props.truck.key,
       truckPath: truckPath,
    });
    //console.log ("truckKey = " + this.props.truck.key);
    //console.log ("truckKey = " + this.state.truckKey);
    /*navigator.geolocation.getCurrentPosition(
      position => {
         this.setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             //latitudeDelta: LATITUDE_DELTA,
             //longitudeDelta: LONGITUDE_DELTA,
             timestamp: position.timestamp,
             error: null,
         });
         console.log(position.coords.latitude);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000, distanceFilter: 5 },
      //error => console.log(error),
     //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
   );*/

    this._getLocationPermisions();

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
        this.updateLocation(position);
      },
      error => {console.log(error);this.setState({ error: error.message })},
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
    );
  }

  updateLocation (position){
       const {truckPath} = this.state;
       const pos = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           timestamp: position.timestamp,
       }

       const truckRef = firebase.database().ref(truckPath)
       truckRef.update (pos) ;
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  /*_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
      console.log("GPS permission not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location });
  };*/

  _getLocationPermisions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
      console.log("GPS permission not granted");
    }

    //let location = await Location.getCurrentPositionAsync({});
    //console.log(location);
    //this.setState({ location });
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
      const {usertag, employeeName} = this.props;
      //this.setState({selectedMarkerIndex: index});
      //console.log("GpsMapView onDonePress");
      //console.log(index);
      let client = clients[index];
      //console.log(client);
      client = {...client, status:"done"}
      clients[index] = client;

      //console.log(index);
      this.setState({
         clients: clients,
         modalOpen: false,
         selectedIndex: null,
      });

      const deliveryPath = `/repos/${usertag}/clients/data/${clients[index].clientTag}/deliverys`;
      //console.log(deliveryPath);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      const day = new Date();
      const date = day.toLocaleDateString("en-US", options);

      const deliveryRef = firebase.database().ref(deliveryPath);
      const deliveryKey = deliveryRef.push().getKey();
      //const date = (new Date()).
      const delivery = {
         work: clients[index].orderWork,
         clientKey: clients[index].clientKey,
         clientTag: clients[index].clientTag,
         employee: employeeName,
         orderId: client[index]&&client[index].orderId?clients[index].orderId:'',
         orderKey:client[index]&&client[index].orderId?clients[index].orderKey:'',
         date: date,
         deliveryKey: deliveryKey,
         status: "Done",
         deliveryId: deliveryKey,
      }
      //console.log(delivery);
      deliveryRef.child(deliveryKey).set(delivery);
  }

  onCancelPress (index) {
     console.log("GpsMapView onCancelPress");
     console.log(index);
      this.setState({
         modalOpen: false,
         selectedIndex: null,
      });
  }

  status4ThisClient(workorders) {
    let statusArray = [];
    let activeOrders = 0;
    let deliveryTimes = 0;
    let status = 0;
    for (var orderKey in workorders) {
       let {isActive,isRepeat,repeatTimes, previousDelivery, deliverys} = workorders[orderKey];

       isActive = (isActive && isActive === "true")? true:false;
       isRepeat = (isRepeat && isRepeat === "true")? true:false;
       repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
       previousDelivery = previousDelivery? parseInt(previousDelivery, 10) : 0;

       for (var deliveryKey in deliverys) {
          let {linkedOrderKey} = deliverys[deliveryKey];

          if (linkedOrderKey === orderKey) {
              //console.log("delivery found");
              deliveryTimes ++;
          }
       }

       //console.log(deliveryTimes);
       deliveryTimes = deliveryTimes + previousDelivery ;

       if (isActive) {
           if (!isRepeat && deliveryTimes > 0) {
              //status = JOB_DONE;
              statusArray.push(JOB_DONE);
           } else if (isRepeat && repeatTimes === 0) {
              statusArray.push(JOB_PROGRESS);
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
              statusArray.push(JOB_DONE);
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
              statusArray.push(JOB_PROGRESS);
           }
           else {
             statusArray.push(JOB_NEW);
           }
           activeOrders ++;
       }

       if (statusArray.length > 0) {
          status = statusArray[0];
       }
       for (var i=0; i++; i < statusArray.length) {
           status = status < statusArray[i]? status: statusArray[i];
       }
       return {status: status, activeOrder: activeOrders};
     }
     return {};
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
    /*if (this.state.location) {
        //console.log(text);
        //console.log(this.state.location.coords.latitude);
        //console.log(this.state.location.coords.longitude);

        //console.log(this.state.location.timestamp);
        //console.log(this.state.location);
        lat = this.state.location.coords.latitude;
        lng = this.state.location.coords.longitude;
    }*/
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

    if (this.state.latitude && this.state.longitude) {
        lat = this.state.latitude;
        lng = this.state.longitude;
    }

    let {clients, selectedIndex, modalOpen} = this.state;

    // convert lat and lng string to float
    clients = clients.map((client, index) => {
       if (/^(\-)?[0-9]+(\.)?[0-9]+$/.test(client.clientLat) &&
           /^(\-)?[0-9]+(\.)?[0-9]+$/.test(client.clientLng)) {
            const lat = parseFloat(client.clientLat) ;
            const lng = parseFloat(client.clientLng) ;

            const {workorders} = client;
            const orderStatus = this.status4ThisClient(workorders);
            //console.log(orderStatus);

            return {  ...client,
                      clientLat: lat,
                      clientLng: lng,
                      status: orderStatus.status,
                      activeOrder: orderStatus.activeOrder,
                   };
        }

        //console.log("index = " + index);
        //console.log("client lat = ", client.clientLat);
        //console.log("client lng = ", client.clientLng);
        //console.log("client clientKey = ", client.clientKey);
        //console.log("client clientTag = ", client.clientTag);
    });



    //console.log(clients);
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
                coordinate={{latitude:client.clientLat, longitude: client.clientLng}}
                key={client.clientKey}
                ref={_marker => {
                         this.marker = _marker;
                     }}
                id = {index}

                onPress={(e) => this.onPressMarker(e, index)}
                //onPress={() => {}}
                onCalloutPress={(index) => {}}


            >

            <View style = {(client.status===JOB_NEW) ? styles.redcircle :
                (client.status ===JOB_PROGRESS? styles.bluecircle : styles.greencircle ) } >
                <Text style={styles.pin}> {client.activeOrder}</Text>
                </View>
              { modalOpen === true && selectedIndex !==null &&selectedIndex === index &&
                    <GpsModalView
                          title={client.clientName}
                          description={client.clientStreet}
                          orderId = {client.orderId}
                          orderKey = {client.orderKey}
                          orderWork = {client.orderWork}
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
  //console.log("GpsMapView");
  //console.log (state.employees.truck);
  return {
     clients: state.clients.clients,
     employeeName: state.employees.employeeName,
     truck: state.employees.truck,
     usertag: state.auth.userTag,
  };
};

export default connect(mapStateToProps, {})(GpsMapView);



/*<Image
   source={pinkSnowplow}
   style={styles.imageStyle}
/>*/
/*

/* best for android-6
<View style = {client.status === "done" ? styles.greencircle :
    (client.status ==="repeat"? styles.bluecircle : styles.redcircle ) }
/>*/

/* very good for android 6
image ={(!client.status )
         ? redDot: (client.status ==="repeat"? blueDot : greenDot )}
*/

/* good for both android 6 and apple 6
<View style = {(!client.status) ? styles.redcircle :
    (client.status ==="repeat"? styles.bluecircle : styles.greencircle ) } />*/

    /*<MapView.Callout
          tooltip={false}>
          <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>
                    {employeeName}
              </Text>
          </View>
   </MapView.Callout>*/
