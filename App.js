import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {

  componentDidMount() {
    const config = {
       apiKey: "AIzaSyC6mtYTtwmmpyD9TvDsGEUfLnuCuoI97uk",
       authDomain: "duty2go.firebaseapp.com",
       databaseURL: "https://duty2go.firebaseio.com",
       projectId: "duty2go",
       storageBucket: "duty2go.appspot.com",
       messagingSenderId: "926351987271",
       appId: "1:926351987271:web:37d33429c5fa5495"
    };
    firebase.initializeApp(config);
    //console.log("firebase configuration");
    //console.log(config);
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
