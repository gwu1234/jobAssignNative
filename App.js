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
        apiKey: "AIzaSyAHKpkb44diLWWawGOpA7KoVdg-9-R-D0w",
        authDomain: "fir-basic-1cc3f.firebaseapp.com",
        databaseURL: "https://fir-basic-1cc3f.firebaseio.com",
        projectId: "fir-basic-1cc3f",
        storageBucket: "fir-basic-1cc3f.appspot.com",
        messagingSenderId: "990731683588"
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
