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

const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;

const  options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0,
};

export class GpsMapView extends React.Component {
  constructor() {
     super();
//     this._ismounted = false;
//     this._gpsTimer = null ;

     this.state = {
         selectedIndex: null,

         // data from employee/assigned of firebase
         clients: [],
         error: null,

         // moving position
         //latitude: null,
         //longitude: null,
         //timestamp: null,
         modalOpen: false,
         //truckKey: null,
         //truckPath: null,
     };
  }

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
     //this._updateClient();
  }

  componentDidMount() {
    /*this._ismounted = true;
    const {usertag, truck} = this.props;
    const {clients} = this.state;
    const truckPath = "repos/" + usertag +"/trucks/" + truck.key;
    //console.log(clients);

    this.setState({
       truckKey: this.props.truck.key,
       truckPath: truckPath,
    });*/

    //this._getLocationPermisions();
    //this.getCurrentLocation ();

    /*this.watchID = navigator.geolocation.watchPosition(
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
     { enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter: 0}
   );*/
  }

  /*success = (pos) => {
     var crd = pos.coords;
     console.log('Your current position is:');
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`timestamp: ${pos.timestamp}`);
     console.log(`More or less ${crd.accuracy} meters.`);
     let  {timestamp} = this.state;
     if (!timestamp) {
        timestamp = 0;
     }
     const date = new Date();
     const  currenTimestamp = date.getTime();

     if ((currenTimestamp-timestamp) > 6*1000 ) {
            console.log(`state timestamp: ${timestamp}`);
            //console.log(`More or less ${crd.accuracy} meters.`);
            //if (this._ismounted) {
            this.setState({
                latitude: crd.latitude,
                longitude: crd.longitude,
                timestamp: pos.timestamp,
            });
         }

         this.updateLocation(pos);
  }

  error = (err) => {
     console.log(err);
  }

  getCurrentLocation = () => {
     navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }*/

/*  _updateClient =  () => {
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
  }; */


  /*updateLocation (position){
       const {truckPath} = this.state;
       const pos = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           timestamp: position.timestamp,
       }

       const truckRef = firebase.database().ref(truckPath)
       truckRef.update (pos) ;
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
  };*/

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


  onDonePress (index, selectedOrder) {
      let {clients} = this.props;
      const {usertag, employeeName, employeeKey} = this.props;
      //this.setState({selectedMarkerIndex: index});
      //console.log("GpsMapView onDonePress");
      //console.log(index);
      let client = clients[index];
      //console.log(client);
      //client = {...client, status:"done"}
      //clients[index] = client;

      //console.log(index);
      this.setState({
         //clients: clients,
         modalOpen: false,
         selectedIndex: null,
      });

      //console.log(selectedOrder);
      //console.log(client.orderKey);
      //console.log(employeeKey);

      const deliveryPath = `/repos/${usertag}/clients/data/${client.clientKey}/deliverys`;
      console.log(deliveryPath);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      const day = new Date();
      const date = day.toLocaleDateString("en-US", options);

      const deliveryRef = firebase.database().ref(deliveryPath);
      const deliveryKey = deliveryRef.push().getKey();
      //const date = (new Date()).
      const delivery = {
         work: selectedOrder.work,
         clientKey: client.clientKey,
         clientTag: client.clientKey,
         employee: selectedOrder.employeeName,
         employeeKey: employeeKey,
         linkedOrderId: selectedOrder.orderId,
         linkedOrderKey:selectedOrder.orderKey,
         date: date,
         deliveryKey: deliveryKey,
         deliveryId: deliveryKey,
      }
      //console.log(delivery);
      deliveryRef.child(deliveryKey).set(delivery);

      //let {presentDelivery} = selectedOrder;
      //presentDelivery = presentDelivery? parseInt(presentDelivery): 0;
      //presentDelivery++;
      var currentStamp = Date.now();
      const employeePath = `/repos/${usertag}/employees/${employeeKey}`;
      console.log(employeePath);
      console.log(currentStamp);
      const employeeRef = firebase.database().ref(employeePath);
      //employeeRef.update ({presentDelivery: String(presentDelivery)});
      employeeRef.child("lastDeliveryUpdate").set(currentStamp);

      const {coworkers} = selectedOrder;
      for (var coworkerkey in coworkers) {
         if (employeeKey !== coworkerkey) {
             const employeePath = `/repos/${usertag}/employees/${coworkerkey}`;
             console.log(employeePath);
             const employeeRef = firebase.database().ref(employeePath);
             employeeRef.child("lastDeliveryUpdate").set(currentStamp);
         }
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

  status4ThisClient(workorders) {
    let statusArray = [];
    let activeOrders = 0;
    let deliveryTimes = 0;
    let status = 0;

    for (var orderKey in workorders) {
       let {isActive,isRepeat,repeatTimes,deliverys}
             = workorders[orderKey];

       isActive = (isActive && isActive === "true")? true:false;
       //isRepeat = (isRepeat && isRepeat === "true")? true:false;
       //repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
       isRepeat = isRepeat?(isRepeat==="true"?true:false):false;
       //const previousDelivery = order.previousDelivery?parseInt (order.previousDelivery):0 ;
       //const presentDelivery = order.presentDelivery? parseInt (order.presentDelivery):0 ;
       //const deliverys = previousDelivery + presentDelivery;
       repeatTimes = repeatTimes?parseInt (repeatTimes):0;
       //previousDelivery = previousDelivery? parseInt(previousDelivery, 10) : 0;
       //presentDelivery = presentDelivery? parseInt(presentDelivery, 10) : 0;

       //deliveryTimes = presentDelivery + previousDelivery ;
       deliveryTimes = 0;
       for (var deliverykey in deliverys) {
           deliveryTimes ++;
       }

       //if (isActive) {
           if (!isRepeat && deliveryTimes > 0) {
              statusArray.push(JOB_DONE);
           } else if (isRepeat && repeatTimes === 0 && deliveryTimes === 0) {
              statusArray.push(JOB_NEW);
           } else if (isRepeat && repeatTimes === 0 && deliveryTimes > 0) {
              statusArray.push(JOB_PROGRESS);
           } else if (isRepeat && repeatTimes !== 0 && deliveryTimes === 0) {
              statusArray.push(JOB_NEW);
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
              statusArray.push(JOB_DONE);
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
              statusArray.push(JOB_PROGRESS);
           }
           else {
             statusArray.push(JOB_NEW);
           }
       //}

       activeOrders = statusArray.length;
       if (statusArray.length > 0) {
          status = statusArray[0];
       }
       for (var i=0; i++; i < statusArray.length) {
           status = status < statusArray[i]? status: statusArray[i];
       }
     }
      return {status: status, activeOrder: activeOrders};
  }


  render() {

    let lat = null;
    let lng = null;

    /*if (this.state.latitude && this.state.longitude) {
        lat = this.state.latitude;
        lng = this.state.longitude;
    }*/

    const {position} = this.props;
    //console.log(position);
    if (position) {
        lat = position.latitude;
        lng = position.longitude;
    }

    let {selectedIndex, modalOpen} = this.state;
    let {clients} = this.props;

    clients = clients.map((client, index) => {
       if (/^(\-)?[0-9]+(\.)?[0-9]+$/.test(client.lat) &&
           /^(\-)?[0-9]+(\.)?[0-9]+$/.test(client.lng)) {
            const lat = parseFloat(client.lat) ;
            const lng = parseFloat(client.lng) ;

            const {workorders} = client;
            const orderStatus = this.status4ThisClient(workorders);

            return {  ...client,
                      clientLat: lat,
                      clientLng: lng,
                      status: orderStatus.status,
                      activeOrder: orderStatus.activeOrder,
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
                          title={client.name}
                          street={client.street}
                          city={client.city}
                          id={index}
                          onDonePress ={(index, activeOrder)=> this.onDonePress(index, activeOrder)}
                          onCancelPress ={(index)=> this.onCancelPress(index)}
                          modalOpen = {this.state.modalOpen}
                          selectedIndex = {this.state.selectedIndex}
                          status={client.status}
                          activeOrder = {client.activeOrder}
                          workorders = {client.workorders}
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
   //console.log("GpsMapView props state.auth.position = ");
   //console.log (state.auth.position);
    const orders = state.auth.assignedOrders;
    //console.log(orders);
    let clients = [];
    for (var clientkey in orders) {
        //console.log("client Key = " + orderkey);
        //console.log("client name = " + orders[orderkey].name)
       clients.push({...orders[clientkey]});
    }

    //console.log(clients);
    return {
        //clients: state.auth.clients,
        clients: clients,
        employeeName: state.employees.employeeName,
        truck: state.auth.truck,
        usertag: state.auth.userTag,
        employeeKey: state.auth.employeeKey,
        position: state.auth.position,
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
