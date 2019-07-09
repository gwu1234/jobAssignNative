import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
//import { setClients, setEmployeeName, setTruck} from '../actions';
import ListItem from './ListItem';

class LeadList extends Component {
   state = {
     assignedClients: null,
  };


  onRowPress(rowItem) {
    //console.log(rowItem);
    Actions.leadDetail({ lead: rowItem });
  }

  render() {
    const {assignedLeads} = this.props;

    return (
       <View style={styles.container} >
          <FlatList
              data={assignedLeads}
              showsVerticalScrollIndicator={true}
              renderItem={({item}) => {
                 //console.log(item);
                 const name = item.name?(item.name !=="undefined"? true: false): false;
                 const street = item.street?(item.street !=="undefined"? true: false): false;
                 const city = item.city?(item.city !=="undefined"? true: false): false;
                 const phone = item.phones?(item.phones.length>0? true: false): false;
                 const cell = item.cells?(item.cells.length>0? true: false): false;
                 const email = item.emails?(item.emails.length>0? true: false): false;

                 return (
                 <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                     <View style={styles.flatview}>
                        {name && <Text style={styles.name}>{item.name}</Text>}
                        {street && <Text style={styles.email}>{item.street}</Text>}
                        {city && <Text style={styles.email}>{item.city}</Text>}
                        {phone && <Text style={styles.email}>{String(item.phones[0])}</Text>}
                        {cell && <Text style={styles.email}>{String(item.cells[0])}</Text>}
                        {email && <Text style={styles.email}>{String(item.emails[0])}</Text>}
                    </View>
                 </TouchableWithoutFeedback>)
               }
              }
              keyExtractor={item => item.leadTag}
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
     assignedLeads: state.auth.leads,
     //truck: state.auth.truck,
  };
};

export default connect(mapStateToProps, null)(LeadList);

/*
{(!item.name && !item.street && !item.city) && (item.phones && item.phones.length>0)
    && <Text style={styles.email}>{String(item.phones[0])}</Text>}
{(!item.name && !item.street && !item.city) && (item.cells && item.cells.length>0)
        && <Text style={styles.email}>{String(item.cells[0])}</Text>}
{(!item.name && !item.street && !item.city) && (item.emails && item.emails.length>0)
        && <Text style={styles.email}>{String(item.emails[0])}</Text>}
*/
