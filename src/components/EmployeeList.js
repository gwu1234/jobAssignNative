import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
   state = {
     assignedClients: null,
  };

  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);

    const { usertag, employeeKey } = this.props;
    console.log("employee List ");
    console.log(usertag);
    console.log(employeeKey);

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

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return {
     employees: employees,
     usertag: state.auth.userTag,
     employeeKey: state.auth.employeeKey,
  };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
