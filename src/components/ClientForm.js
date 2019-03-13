import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

class ClientForm extends Component {
  render() {
    const {client} = this.props;

    return (
      <View>
        <CardSection>
          <Text style={styles.textName}>
             {client.clientName}
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.text}>
             {client.clientStreet}
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.text}>
             {client.clientCity}
          </Text>
        </CardSection>
        <CardSection>
           <Text style={styles.text}>
               {client.clientPostcode}
           </Text>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  text: {
    fontSize: 18,
    paddingLeft: 20,
    color: '#242D99',
  },
  textName: {
    fontSize: 22,
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
