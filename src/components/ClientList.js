import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
//import { setClients, setEmployeeName, setTruck} from '../actions';
import ListItem from './ListItem';

class ClientList extends Component {
   state = {
     assignedClients: null,
  };


  onRowPress(rowItem) {
    //Actions.employeeEdit({ employee: this.props.employee });
    //console.log("this row is ");
    //console.log(rowItem);
    Actions.clientDetail({ client: rowItem });
  }

  render() {
    const {assignedClients} = this.props;

    return (
       <View style={styles.container} >
          <FlatList
              data={assignedClients}
              showsVerticalScrollIndicator={true}
              renderItem={({item}) =>
                 <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                     <View style={styles.flatview}>
                        <Text style={styles.name}>{item.clientName}</Text>
                        <Text style={styles.email}>{item.clientStreet}</Text>
                        <Text style={styles.email}>{item.clientCity}</Text>
                        <Text style={styles.order}>Active Work Orders: {item.activeOrders}</Text>
                    </View>
                 </TouchableWithoutFeedback>
              }
              keyExtractor={item => item.clientKey}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontSize: 18
  },
  email: {
    color: 'blue'
  },
  order: {
    fontSize: 16,
    color: 'green'
  }
});

const mapStateToProps = state => {

  return {
     //employees: employees,
     usertag: state.auth.userTag,
     employeeKey: state.auth.employeeKey,
     assignedClients: state.auth.clients,
     truck: state.auth.truck,
  };
};

export default connect(mapStateToProps, null)(ClientList);
