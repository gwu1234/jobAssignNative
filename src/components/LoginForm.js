import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
//import _ from 'lodash';
import { loginUserSuccess, setUserTag, setEmployeeKey } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  state = {
    email: "",
    password: "",
    error: '',
    loading: false,
    access: "",
    //usersRef: firebase.database().ref("users"),
  };

  onEmailChange(text) {
    //this.props.emailChanged(text);
    this.setState({email: text});
  }

  onPasswordChange(text) {
    //this.props.passwordChanged(text);
    this.setState({password: text});
  }

  onAccessChange(text) {
    //this.props.accessChanged(text);
    this.setState({access: text});
  }

  onButtonPress() {
    const { email, password, access} = this.state;
    console.log(email);
    console.log(password);
    console.log(access);
    //this.props.loginUser({ email, password });
    //return { ...state, loading: true, error: '' };
    this.setState({error: "", loading: true, });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
         const emailString = user.user.email.replace(/[.,#$\[\]@ ]/g,'');
         const nameString = user.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
         const tagName = (nameString + '+' + emailString).toLowerCase();

         this.props.setUserTag(tagName);
         const accessName = (nameString + '+' + emailString +"/accesses").toLowerCase();
         //console.log(accessName);
         //console.log(access);
         let accessMatch = false;

         const accessRef = firebase.database().ref("users").child(accessName);

         accessRef.once('value')
           .then((snapshot) => {
             let accessArray = [];
             const accesses = snapshot.val();
             for (var key in accesses) {
                accessArray.push ({...accesses[key], uid: key, key: key}) ;
             }

             const length = accessArray.length;
             //console.log(length);
             for (i = 0; i < length; i++) {
                  if (accessArray[i].access === access) {
                    this.props.setEmployeeKey({employeeKey: accessArray[i].employeeKey, userTag:tagName});
                    accessMatch = true;
                  }
             }
             if (accessMatch === true) {
                 this.setState({
                     error: "",
                     email: "",
                     password: "",
                     access: "",
                     loading: false,
                 });

                 this.props.loginUserSuccess (user);

             } else {
                 this.setState({
                    error: "Invalid Access Code",
                    email: "",
                    password: "",
                    access: "",
                    loading: false,
                 });

                 firebase.auth().signOut()
                   .then(() => console.log("logout"));
             }
          });

       })
      .catch((error) => {
          console.log(error);
          this.setState({
             error: "Wrong Email or Password",
             email: "",
             password: "",
             access: "",
             loading: false, });
      });
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Access"
            placeholder="access"
            onChangeText={this.onAccessChange.bind(this)}
            value={this.state.access}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(null, {
  loginUserSuccess, setUserTag, setEmployeeKey
})(LoginForm);
