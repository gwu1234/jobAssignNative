import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
//import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class ClientList extends Component {
   state = {
     assignedClients: null,
  };

  componentWillMount() {
    //this.props.employeesFetch();

    //this.createDataSource();

    const { usertag, employeeKey } = this.props;
    //console.log("employee List ");
    //console.log(usertag);
    //console.log(employeeKey);

    const employeeTag = "repos/" + usertag +"/employees/" + employeeKey;
    console.log(employeeTag);
    var employeeRef = firebase.database().ref(employeeTag)

    employeeRef.on('value', snapshot => {
        const employees = snapshot.val();
        if (employees) {
            //console.log(employees.assigned);

            const clients = _.map(employees.assigned, (val, uid) => {
              return { ...val};
            });
            console.log(clients);
            this.setState({assignedClients: clients});
        }
        //else {
            //this.props.setEmployeeList(null);
        //}
    });

  }

  //componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

  //  this.createDataSource();
  //}

  /*createDataSource() {
    const {assignedClients} = this.state;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(assignedClients);
  }*/

  //renderRow(employee) {
  //  return <ListItem employee={assignedClient} />;
  //}

  onRowPress(rowItem) {
    //Actions.employeeEdit({ employee: this.props.employee });
    console.log("this row is ");
    console.log(rowItem);
    Actions.clientDetail({ client: rowItem });
  }

  render() {
    const {assignedClients} = this.state;

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
    color: 'red'
  }

});

const mapStateToProps = state => {
  //const employees = _.map(state.employees, (val, uid) => {
  //  return { ...val, uid };
  //});

  return {
     //employees: employees,
     usertag: state.auth.userTag,
     employeeKey: state.auth.employeeKey,
  };
};

export default connect(mapStateToProps, {})(ClientList);
