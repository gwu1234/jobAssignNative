import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';
//import EmployeeForm from './EmployeeForm';
import ClientForm from './ClientForm';
import WorkOrders from './WorkOrders';
//import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Input, Button, Confirm } from './common';

class LeadDetail extends Component {
  state = {
    name: "",
    street: "",
    city: '',
    postcode: "",
    country: "",
    province: "",
    phone: null,
    cell: null,
    email: null,
  };

componentDidMount() {
   const {lead} = this.props;
   const {phones, cells, emails} = lead;

   if (lead) {
     const {phones, cells, emails} = lead;
     let phone = null;
     let cell = null;
     let email = null;

     if (phones && phones.length > 0) {
        phone = phones[0];
     }

     if (cells && cells.length > 0) {
        cell = cells[0];
     }

     if (emails && emails.length > 0) {
        email = emails[0];
     }

     this.setState ({
         name: lead.name,
         street: lead.street,
         city:  lead.city,
         postcode: lead.postcode,
         country: lead.country,
         province: lead.province,
         phone: phone,
         cell: cell,
         email: email,
     });
   }
}

onButtonPress() {
    Actions.leadList();
}

  render() {
    const {lead} = this.props;
    //console.log(lead);
    return (
      <View style={styles.containerStyle}>
        <View style={styles.horizontalStyle}>
           <Text style={styles.labelStyle}>name: </Text>
           <TextInput
              placeholder= "name"
              autoCorrect= {false}
              style={styles.inputStyle}
              value= {this.state.name}
              onChangeText={(name) => this.setState({name: name})}
          />
        </View>
        <View style={styles.horizontalStyle}>
           <Text style={styles.labelStyle}>street: </Text>
           <TextInput
              placeholder= "street"
              autoCorrect= {false}
              style={styles.inputStyle}
              value= {this.state.street}
              onChangeText={(street) => this.setState({street: street})}
          />
        </View>
        <View style={styles.horizontalStyle}>
           <Text style={styles.labelStyle}>city: </Text>
           <TextInput
              placeholder= "city"
              autoCorrect= {false}
              style={styles.inputStyle}
              value= {this.state.city}
              onChangeText={(city) => this.setState({city: city})}
          />
        </View>
        <View style={styles.horizontalStyle}>
          <Text style={styles.labelStyle}>postcode: </Text>
          <TextInput
             placeholder= "postcode"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.postcode}
             onChangeText={(postcode) => this.setState({postcode: postcode})}
         />
        </View>
        <View style={styles.horizontalStyle}>
          <Text style={styles.labelStyle}>province: </Text>
          <TextInput
             placeholder= "province"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.province}
             onChangeText={(province) => this.setState({province: province})}
         />
        </View>
        <View style={styles.horizontalStyle}>
          <Text style={styles.labelStyle}>phone: </Text>
          <TextInput
             placeholder= "phone"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.phone}
             onChangeText={(phone) => this.setState({phone: phone})}
         />
        </View>
        <View style={styles.horizontalStyle}>
          <Text style={styles.labelStyle}>cell: </Text>
          <TextInput
             placeholder= "cell"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.cell}
             onChangeText={(cell) => this.setState({cell: cell})}
         />
        </View>
        <View style={styles.horizontalStyle}>
          <Text style={styles.labelStyle}>email: </Text>
          <TextInput
             placeholder= "email"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.email}
             onChangeText={(email) => this.setState({email: email})}
         />
        </View>
        <View style={styles.buttonContainer}>
             <Button onPress={this.onButtonPress.bind(this)}>
                 Cancel
             </Button>
             <Button onPress={this.onButtonPress.bind(this)}>
                 Submit
             </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    paddingLeft: 5,
    fontSize: 17,
    paddingTop: 3,
    flex: 2
  },
  labelStyle: {
    fontSize: 17,
    paddingLeft: 20,
    paddingTop: 3,
    flex: 1
  },
  horizontalStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: "#e8ebef",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#b8cef2',
  },
  containerStyle: {
    height: 400,
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginTop: 10,
    backgroundColor: "#e8ebef",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#b8cef2',
  },
};

export default LeadDetail;
