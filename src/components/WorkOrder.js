import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
//import { setClients, setEmployeeName, setTruck} from '../actions';
//import ListItem from './ListItem';
import PhotoDisplay from './PhotoDisplay';
//import { CardSection, Input } from './common';

class WorkOrder extends Component {
   state = {
     orderId: null,
     work: null,
     isRepeat: null,
     repeatTimes: null,
     deliverys: null,
  };

  componentWillMount() {
     const {order} = this.props;

     const isRepeat = order.isRepeat?(order.isRepeat==="true"?true:false):false;
     const previousDelivery = order.previousDelivery?parseInt (order.previousDelivery):0 ;
     const presentDelivery = order.presentDelivery? parseInt (order.presentDelivery):0 ;
     const deliverys = previousDelivery + presentDelivery;
     const repeatTimes = order.repeatTimes?parseInt (order.repeatTimes):0;

     let status = "NEW";
     if (isRepeat){
       if (deliverys >= repeatTimes) {
         status = "DONE";
       } else if (deliverys > 0) {
         status = "PROGRESS";
       }
     } else if (deliverys >=1) {
        status = "DONE";
     }

     this.setState ({
          orderId: order.orderId,
          work: order.work,
          isRepeat: isRepeat,
          repeatTimes: repeatTimes,
          deliverys: deliverys,
          status: status,
      });
  }

  onRowPress(order) {
     Actions.photos({ workorder: order });
  }

  render() {
    const {orderId, work, isRepeat, repeatTimes, deliverys, status} = this.state;
    const {order} = this.props;
    return (
      <View style={styles.flatitem}>
          <Text style={styles.order}>
              Order Id: {orderId}
          </Text>
          <Text style={styles.text}>
             Work: {work}
          </Text>
          <Text style={styles.text}>
             Is Repeat: {String(isRepeat)}
          </Text>
          {isRepeat && <Text style={styles.text}>
             Expected Repeat Times: {repeatTimes}
          </Text>}
          <Text style={styles.text}>
             Actual Delivery Times: {deliverys}
          </Text>
          <Text style={styles.text}>
             Status: {status}
          </Text>

          <TouchableWithoutFeedback onPress={ () => this.onRowPress(order)}>
          <Text style={styles.photo}>
             Select Photos
          </Text>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:4,
    marginTop: 15,
  },

  flatview: {
    marginTop: 10,
  },
  flatitem: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "green",
  },
  photo: {
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft: 20,
    height: 30,
    width: 140,
    color: 'white',
    fontWeight: "bold",
    fontSize: 18,
  },
  order: {
    fontSize: 16,
    color: 'green',
    fontStyle: "italic",
    paddingLeft: 20,
  },
  text: {
    fontSize: 16,
    paddingLeft: 20,
    color: '#242D99',
  },
  textName: {
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  thumbContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 90,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});


export default WorkOrder;
