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
import WorkOrder from './WorkOrder';

class WorkOrders extends Component {
   state = {
     workorders: null,
     photos: null,
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

  //onRowPress(rowItem) {
    //console.log("submit photo");
    //Actions.clientDetail({ client: rowItem });

    /*CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });*/

     //console.log(this.state.photos);
  //   Actions.photos({ workorder: rowItem });
  //}

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
              renderItem={({item}) =>(
                 <View style={styles.flatitem}>
                   <WorkOrder order={item}/>
                 </View>
               )
              }
              keyExtractor={item => item.orderKey}
          />
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


export default WorkOrders;
