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
             {client.name}
          </Text>


          <Text style={styles.text}>
             {client.street}
          </Text>

          <Text style={styles.text}>
             {client.city}
          </Text>

           <Text style={styles.text}>
               {client.postcode}
           </Text>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
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
