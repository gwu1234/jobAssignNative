import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
  componentWillMount() {
    const config = {
       apiKey: "AIzaSyAUdrYEIfQWtrvkFluxpX2dNWc79tnyes0",
       authDomain: "jobassign2.firebaseapp.com",
       databaseURL: "https://jobassign2.firebaseio.com",
       projectId: "jobassign2",
       storageBucket: "jobassign2.appspot.com",
       messagingSenderId: "224391770489"
    };
    firebase.initializeApp(config);
    console.log("firebase configuration");
    console.log(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
