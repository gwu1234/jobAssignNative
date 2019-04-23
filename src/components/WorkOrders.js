import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import { setClients, setEmployeeName, setTruck} from '../actions';
import ListItem from './ListItem';
import { CardSection, Input } from './common';

class WorkOrders extends Component {
   state = {
     workorders: null,
  };

  componentWillMount() {
     const {workorders} = this.props;

     let orders = [];
     for (var key in workorders) {
        //console.log(key);
        //console.log(workorders[key]);
        orders.push (workorders[key]);
     }

     //console.log(orders);
     this.setState ({workorders: orders}) ;
  }

  onRowPress(rowItem) {
    //Actions.clientDetail({ client: rowItem });
  }

  render() {
    const {workorders} = this.state;

    return (
       <View style={styles.container}>

            <Text style={styles.textName}>
            Active Work Orders :
            </Text>

          <FlatList
              style={styles.flatview}
              data={workorders}
              showsVerticalScrollIndicator={true}
              renderItem={({item}) =>{
              const isRepeat = item.isRepeat?(item.isRepeat==="true"?true:false):false;
              const previousDelivery = item.previousDelivery?parseInt (item.previousDelivery):0 ;
              const presentDelivery = item.presentDelivery? parseInt (item.presentDelivery):0 ;
              const deliverys = previousDelivery + presentDelivery;
              const repeatTimes = item.repeatTimes?parseInt (item.repeatTimes):0;

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

              return (
                 <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                 <View style={styles.flatitem}>

                   <Text style={styles.order}>
                       Order Id: {item.orderId}
                   </Text>
                   <Text style={styles.text}>
                      Work: {item.work}
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

                 </View>
                 </TouchableWithoutFeedback>
               )
              }
              }
              keyExtractor={item => item.orderKey}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  flatview: {
    marginTop: 10,
  },
  flatitem: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18
  },
  email: {
    color: 'blue'
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
  }
});


export default WorkOrders;
