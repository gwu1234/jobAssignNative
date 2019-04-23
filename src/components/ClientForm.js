import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

class ClientForm extends Component {
  render() {
    const {client} = this.props;

    return (
      <View style={styles.container}>

          <Text style={styles.textName}>
             {client.clientName}
          </Text>


          <Text style={styles.text}>
             {client.clientStreet}
          </Text>

          <Text style={styles.text}>
             {client.clientCity}
          </Text>

           <Text style={styles.text}>
               {client.clientPostcode}
           </Text>

      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
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
};

/*const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);*/
export default ClientForm;
