import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
//import EmployeeForm from './EmployeeForm';
import ClientForm from './ClientForm';
//import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ClientDetail extends Component {
  //state = { showModal: false };

  //componentWillMount() {
  //  _.each(this.props.employee, (value, prop) => {
  //    this.props.employeeUpdate({ prop, value });
  //  });
  //}

  //onButtonPress() {
  //  const { name, phone, shift } = this.props;

  //  this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  //}

  /*onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }*/

  render() {
    const {client} = this.props;
    //console.log("ClientDetails");
    //console.log(client);
    return (
      <Card>
        <ClientForm client={client}/>
      </Card>
    );
  }
}

/*const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);*/

export default ClientDetail;
