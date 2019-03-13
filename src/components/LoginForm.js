import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
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
         console.log(user);

         const emailString = user.user.email.replace(/[.,#$\[\]@ ]/g,'');
         const nameString = user.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
         const tagName = (nameString + '+' + emailString).toLowerCase();

         this.props.setUserTag(tagName);
         const accessName = (nameString + '+' + emailString +"/accesses").toLowerCase();
         console.log(accessName);
         let accessMatch = false;

         const accessRef = firebase.database().ref("users").child(accessName);

         accessRef.once('value')
           .then((snapshot) => {
             const accesses = snapshot.val();
             //console.log(accesses);
             const accessArray = _.map(accesses, (val, uid) => {
               return { ...val, uid };
             });

             console.log(accessArray);
             const length = accessArray.length;
             for (i = 0; i < length; i++) {
                  //console.log(accessArray[i].access);
                  //console.log(accessArray[i].employeeKey);
                  if (accessArray[i].access === access) {
                    console.log("access matched");
                    //console.log(accessArray[i].access);
                    //console.log(accessArray[i].employeeKey);
                    this.props.setEmployeeKey(accessArray[i].employeeKey);
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

          /*const employeeTag = "repos/" + tagName +"/employees";
          console.log(employeeTag);
          var employeeRef = firebase.database().ref(employeeTag)

          employeeRef.on('value', snapshot => {
              const employees = snapshot.val();
              if (employees) {
                  console.log(employees);
              } else {
                  //this.props.setEmployeeList(null);
              }
          });*/
       })
      .catch((error) => {
          //console.log("login failed");
          //console.log(firebase.app().options);
          console.log(error);
          //loginUserFail(dispatch);
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
    //const {error} = this.state;

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

/*const mapStateToProps = ({ auth }) => {
  const { email, password, access, error, loading } = auth;

  return { email, password, access, error, loading };
};*/

export default connect(null, {
  loginUserSuccess, setUserTag, setEmployeeKey
})(LoginForm);
