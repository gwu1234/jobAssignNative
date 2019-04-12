import React from 'react';
//import { MapView } from 'expo';
//import { connect } from 'react-redux';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Button} from './common';
//import redDot from './images/redDot.png';
//import { Marker } from 'react-native-maps';

class GpsCalloutView extends React.Component {
    onButtonPress() {
       console.log("onButtonPress");
    }

    onRepeatPress(index) {
      console.log("GpsCalloutView onRepeatPress");
      this.props.onRepeatPress(index);
    }

    onDonePress(index) {
      console.log("GpsCalloutView onDonePress");
      this.props.onDonePress(index);
    }

    render() {
        //console.log("atGpsCalloutView");
        //console.log(this.props.id);
        const {id, workorders, activeOrder} = this.props;
        console.log(workorders);
        return (
            <View style={styles.calloutContainer}>
                <Text style={styles.titleText}>
                    {this.props.title}
                </Text>

                <Text style={styles.calloutText}>
                    {this.props.description}
                </Text>

                <Text style={styles.calloutText}>
                    this client has {activeOrder} active orders
                </Text>

                <Text style={styles.calloutText}>
                    select one to submit a delivery
                </Text>

                 <View style={styles.buttonContainer}>
                     <TouchableOpacity onPress={()=>this.onRepeatPress(id)} style={styles.leftButton}>
                        <Text style={styles.buttonText}>
                           Repeat
                       </Text>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=>this.onDonePress(id)} style={styles.middleButton}>
                     <Text style={styles.buttonText}>
                      Done
                     </Text>
                    </TouchableOpacity>

                </View>
            </View>

        )
    }
}

const styles = {
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
  },
  calloutText: {
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 17,
    color:'black',
    marginBottom: 0,
  },
  calloutContainer: {
    width: 190,
    height: 110,
  },
  leftButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    justifyContent: 'space-between',
    width: '45%',
    height: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  middleButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '50%',
    height: 40,
  },
  rightButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '45%',
    height: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color:'black',
    padding:10
  },
};


export default GpsCalloutView;
