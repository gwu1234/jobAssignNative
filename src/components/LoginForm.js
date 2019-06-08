import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { PROVIDER_GOOGLE, Constants, Location, Permissions} from 'expo';
import { loginUserSuccess, setUserTag, setEmployeeKey, updatePosition} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const  options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0,
};

const GPS_TIMER_CONST = 3*6*1000;


class LoginForm extends Component {
  constructor() {
       super();
       this._ismounted = false;
       this._gpsTimer = null ;

       this.state = {
          email: "",
          password: "",
          error: '',
          loading: false,
          access: "",
          //truckPath: "",
          //truckKey: "",
       };
  }

  componentDidMount() {
    this._ismounted = true;
    console.log("at componentDidMount");
    //const {usertag, truck} = this.props;
    //const {clients} = this.state;
    //const truckPath = "repos/" + usertag +"/trucks/" + truck.key;

    //this.setState({
    //   truckKey: this.props.truck.key,
    //   truckPath: truckPath,
    //});

    this._getLocationPermisions();
    //this.getCurrentLocation ();
    //this._ismounted = false;
    /*if (this._gpsTimer !== null) {
        clearInterval(this._gpsTimer);
        console.log("gpsTimer Cleared")
        //console.log(this._gpsTimer);
        this._gpsTimer = null ;
    }*/
  }

  componentDidUpdate () {
     this._ismounted = true;
     const {usertag, truck, isLogin, employeeKey} = this.props;
     //console.log("componentDidUpdate()");
     //console.log(usertag);
     //console.log(truck);
     //const {clients} = this.state;
     //const truckPath = "repos/" + usertag +"/trucks/" + truck.key;
     if (!isLogin && this._gpsTimer !== null) {
         clearInterval(this._gpsTimer);
         console.log("gpsTimer Cleared")
         //console.log(this._gpsTimer);
         this._gpsTimer = null ;
     }


     if (this._ismounted && usertag !== null && isLogin && (truck || employeeKey)) {
          //const truckPath = "repos/" + usertag +"/trucks/" + truck.key;
          //this.setState({
          //   truckKey:  truck.key,
          //   truckPath: truckPath,
          //});
         //console.log("componentDidUpdate(): getting Location");
         //this._getLocationPermisions();
         this.getCurrentLocation ();
      }
  }

  componentWillUnmount(){
      console.log("at componentWillUnmount");
      this._ismounted = false;
      //if (this._gpsTimer !== null) {
      //    clearInterval(this._gpsTimer);
      //    console.log("gpsTimer Cleared")
          //console.log(this._gpsTimer);
      //    this._gpsTimer = null ;
      //}
  }

  success = (pos) => {
     var crd = pos.coords;
     console.log("getCurrentLocation() Successfully");
     //console.log('Your current position is:');
     //console.log(`Latitude : ${crd.latitude}`);
     //console.log(`Longitude: ${crd.longitude}`);
     //console.log(`timestamp: ${pos.timestamp}`);
     //console.log(`More or less ${crd.accuracy} meters.`);
     let  {timestamp} = this.state;
     if (!timestamp) {
        timestamp = 0;
     }
     const date = new Date();
     const  currenTimestamp = date.getTime();

     if ((currenTimestamp-timestamp) > GPS_TIMER_CONST  ) {
         //console.log(`state timestamp: ${timestamp}`);
         //console.log(`More or less ${crd.accuracy} meters.`);
         if (this._ismounted) {
             this.setState({
                latitude: crd.latitude,
                longitude: crd.longitude,
                timestamp: pos.timestamp,
             });
         }

         this.updateLocation(pos);

         if (this._ismounted === true && this._gpsTimer === null) {
             this._gpsTimer = setInterval(this.getCurrentLocation, GPS_TIMER_CONST );
             console.log("gpsTimer up")
             //console.log(this._gpsTimer);
         }
     }
  }

  error = (err) => {
     console.log(err);

     if (this._ismounted === true && this._gpsTimer === null) {
         this._gpsTimer = setInterval(this.getCurrentLocation, GPS_TIMER_CONST );
         console.log("gpsTimer up")
         //console.log(this._gpsTimer);
     }
  }

  getCurrentLocation = () => {
     navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }


  updateLocation (position){
         //const {truckPath, truckKey} = this.state;
         const {usertag, truck, employeeKey} = this.props;

         if (truck) {
              const truckPath = "repos/" + usertag +"/trucks/" + truck.key;
              //console.log("updatelocation()");
              //console.log(usertag);
              //console.log(truck);
              //console.log(position);
              //console.log("truckPath = " + truckPath);

              const pos = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  timestamp: position.timestamp,
              }

              //if (truckPath !== "" && truck !== "") {
              const truckRef = firebase.database().ref(truckPath)
              truckRef.update (pos) ;
              //console.log("at LoginForm.js, executing this.props.updateLocation")
              this.props.updatePosition(pos);
         } else if (employeeKey) {
              const employeePath = "repos/" + usertag +"/employees/" + employeeKey +"/currentLocation";
              //console.log("employeePath = " + employeePath);

              const currentLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  timestamp: position.timestamp,
              }
              const employeeRef = firebase.database().ref(employeePath)
              employeeRef.update (currentLocation) ;

              const pos = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  timestamp: position.timestamp,
              }
              this.props.updatePosition(pos);
         }
    }


    _getLocationPermisions = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log("GPS permission = " + status);
      if (status !== 'granted') {
        this.setState({
          error: 'Permission to access location was denied',
        });
        console.log("GPS permission not granted");
      }
    };


  onEmailChange(text) {
    //this.props.emailChanged(text);
    this.setState({email: text});
  }

  onPasswordChange(text) {
    //this.props.passwordChanged(text);
    this.setState({password: text});
  }

  onAccessChange(text) {
    //this.props.accessChanged(text);
    this.setState({access: text});
  }

  onButtonPress() {
    const { email, password, access} = this.state;
    console.log(email);
    console.log(password);
    console.log(access);
    //this.props.loginUser({ email, password });
    //return { ...state, loading: true, error: '' };
    this.setState({error: "", loading: true, });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
         const emailString = user.user.email.replace(/[.,#$\[\]@ ]/g,'');
         const nameString = user.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
         const tagName = (nameString + '+' + emailString).toLowerCase();

         this.props.setUserTag(tagName);
         const accessName = (nameString + '+' + emailString +"/accesses").toLowerCase();
         //console.log(accessName);
         //console.log(access);
         let accessMatch = false;

         const accessRef = firebase.database().ref("users").child(accessName);

         accessRef.once('value')
           .then((snapshot) => {
             let accessArray = [];
             const accesses = snapshot.val();
             for (var key in accesses) {
                accessArray.push ({...accesses[key], uid: key, key: key}) ;
             }

             const length = accessArray.length;
             //console.log(length);
             for (i = 0; i < length; i++) {
                  if (accessArray[i].access === access) {
                    this.props.setEmployeeKey({employeeKey: accessArray[i].employeeKey, userTag:tagName});
                    accessMatch = true;
                  }
             }
             if (accessMatch === true) {
                 this.setState({
                     error: "",
                     email: "",
                     password: "",
                     access: "",
                     loading: false,
                 });

                 this.props.loginUserSuccess (user);

             } else {
                 this.setState({
                    error: "Invalid Access Code",
                    email: "",
                    password: "",
                    access: "",
                    loading: false,
                 });

                 firebase.auth().signOut()
                   .then(() => {
                        console.log("logout");
                        if (this._gpsTimer !== null) {
                           clearInterval(this._gpsTimer);
                           console.log("gpsTimer Cleared")
                           //console.log(this._gpsTimer);
                           this._gpsTimer = null ;
                       }
                   });
             }
          });

       })
      .catch((error) => {
          console.log(error);
          this.setState({
             error: "Wrong Email or Password",
             email: "",
             password: "",
             access: "",
             loading: false, });
      });
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Access"
            placeholder="access"
            onChangeText={this.onAccessChange.bind(this)}
            value={this.state.access}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = state => {
  //console.log("GpsMapView");
  //console.log (state.employees.truck);
  return {
     employeeName: state.employees.employeeName,
     truck: state.auth.truck,
     usertag: state.auth.userTag,
     isLogin: state.auth.isLogin,
     employeeKey: state.auth.employeeKey,
  };
};

export default connect(mapStateToProps, {
  loginUserSuccess, setUserTag, setEmployeeKey, updatePosition
})(LoginForm);
