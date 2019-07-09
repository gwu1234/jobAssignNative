import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
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
    log: null,
    fieldChange: false,
    logChange: false,
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
         log: null,
         fieldChange: false,
         logChange: false,
     });
   }
}

onButtonPress() {
    Actions.leadList();
}

onSubmitPress() {
   const { name, street, city, postcode, country, province,
          phone, cell, email, log, fieldChange, logChange} = this.state;
   const {usertag, employeeKey, employeeName, lead} = this.props;

   //console.log("usertag = " + usertag);
   //console.log("employeeKey = " + employeeKey);
   //console.log("employeeName = " + employeeName);

   if (!fieldChange && !logChange) {
       Actions.leadList();
       return;
   }

   const leadPath = `/repos/${usertag}/leads/${lead.leadTag}/contact`;
   const assignedPath = `/repos/${usertag}/employees/${employeeKey}/leads/${lead.leadTag}`;
   const logPath = `/repos/${usertag}/leads/${lead.leadTag}/leadlogs`;

   //console.log(logPath);

   let emails = [];
   let phones = [];
   let cells = [];

   if (email) {
        emails.push (email)
   } else {
        emails = null;
   }
   if (phone) {
        phones.push(phone);
   } else {
        phones = null;
   }
   if (cell) {
        cells.push(cell);
   } else {
        cells = null;
   }

   if (fieldChange) {
       const newLead = {
          name: name,
          street: street,
          city:  city,
          postcode: postcode,
          country: country,
          province: province,
          phones: phones,
          cells: cells,
          emails: emails,
      };
      //console.log(leadPath);
      //console.log(assignedPath);
      //console.log(newLead);
      const leadRef = firebase.database().ref(leadPath);
      const assignedRef = firebase.database().ref(assignedPath);
      leadRef.update(newLead);
      assignedRef.update(newLead);
   }

   if (logChange) {
      console.log(logPath);

      const date = new Date();
      // timestamp in second
      const timestamp = Math.round(date.getTime()/1000 + 0.5);
      const localtime = date.toLocaleString();
      const logRef = firebase.database().ref(logPath);
      const logKey = logRef.push().getKey();

      const leadName = lead.leadName?(lead.leadName !=="undefined"? lead.leadName: null) : null;

      const newLog = {
          date: localtime,
          timestamp: timestamp,
          employeeName: employeeName,
          leadName: leadName,
          logTag: logKey,
          logMsg: log,
      }
     console.log(newLog);
     logRef.child(logKey).set(newLog);
   }

   this.clearState();
   Actions.leadList();
}

clearState () {
    this.setState ({
        log: null,
        fieldChange: false,
        logChange: false,
    });
}

  render() {
    const {lead} = this.props;
    //console.log(lead);
    return (
      <KeyboardAvoidingView style={styles.containerStyle} contentContainerStyle ={{...styles.containerStyle, height: 250}} behavior="position" enabled>
        <View style={styles.horizontalStyle}>
           <Text style={styles.labelStyle}>name: </Text>
           <TextInput
              placeholder= "name"
              autoCorrect= {false}
              style={styles.inputStyle}
              value= {this.state.name}
              onChangeText={(name) => this.setState({name: name, fieldChange: true})}
          />
        </View>
        <View style={styles.horizontalStyle}>
           <Text style={styles.labelStyle}>address: </Text>
           <TextInput
              placeholder= "street"
              autoCorrect= {false}
              style={styles.inputStyle}
              value= {this.state.street}
              onChangeText={(street) => this.setState({street: street,  fieldChange: true})}
          />
        </View>
        <View style={styles.horizontalStyle}>
           <TextInput
              placeholder= "city"
              autoCorrect= {false}
              style={styles.labelStyle}
              value= {this.state.city}
              onChangeText={(city) => this.setState({city: city,  fieldChange: true})}
          />
          <TextInput
             placeholder= "postcode"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.postcode}
             onChangeText={(postcode) => this.setState({postcode: postcode,  fieldChange: true})}
         />
        </View>
        <View style={styles.horizontalStyle}>
          <TextInput
             placeholder= "phone"
             autoCorrect= {false}
             style={styles.labelStyle}
             value= {this.state.phone}
             onChangeText={(phone) => this.setState({phone: phone,  fieldChange: true})}
         />
          <TextInput
             placeholder= "cell"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.cell}
             onChangeText={(cell) => this.setState({cell: cell,  fieldChange: true})}
         />
        </View>
        <View style={styles.horizontalStyle} >
          <Text style={styles.labelStyle}>email: </Text>
          <TextInput
             placeholder= "email"
             autoCorrect= {false}
             style={styles.inputStyle}
             value= {this.state.email}
             onChangeText={(email) => this.setState({email: email,  fieldChange: true})}
         />
        </View>
        <View style={styles.verticalStyle} >
          <TextInput
             placeholder= "activity log"
             autoCorrect= {false}
             style={{paddingLeft: 5, fontSize: 18, paddingTop: 3}}
             numberOfLines = {2}
             value= {this.state.log}
             onChangeText={(log) => this.setState({log: log,  logChange: true})}
         />
        </View>
        <View style={styles.buttonContainer}>
             <Button onPress={this.onButtonPress.bind(this)}>
                 Cancel
             </Button>
             <Button onPress={this.onSubmitPress.bind(this)}>
                 Submit
             </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  inputStyle: {
    paddingLeft: 5,
    fontSize: 18,
    paddingTop: 1,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 1,
    flex: 1
  },
  horizontalStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    backgroundColor: "#e8ebef",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#b8cef2',
  },
  verticalStyle: {
    flexDirection: 'column',
    height: 50,
    marginTop: 5,
    backgroundColor: "#e8ebef",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#b8cef2',
  },
  containerStyle: {
    height: 350,
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 5,
    backgroundColor: "#e8ebef",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#b8cef2',
  },
};

const mapStateToProps = state => {

  return {
     usertag: state.auth.userTag,
     employeeKey: state.auth.employeeKey,
     employeeName: state.auth.employeeName,
  };
};

export default connect(mapStateToProps, null)(LeadDetail);
