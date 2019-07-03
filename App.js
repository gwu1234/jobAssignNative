import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
  /*componentWillMount() {
    const config = {
      apiKey: "AIzaSyCBxBrARUtxlMlCdWUDsMEIuqeWapU5mWE",
          authDomain: "jobassign3.firebaseapp.com",
          databaseURL: "https://jobassign3.firebaseio.com",
          projectId: "jobassign3",
          storageBucket: "jobassign3.appspot.com",
          messagingSenderId: "1088029675584"
    };
    firebase.initializeApp(config);
    console.log("firebase configuration");
    console.log(config);
  }*/

  componentDidMount() {
    const config = {
       apiKey: "AIzaSyDuKonQxaHIwr3Luxfl0HEmAIYA0vKwDHg",
       authDomain: "jobassign4.firebaseapp.com",
       databaseURL: "https://jobassign4.firebaseio.com",
       projectId: "jobassign4",
       storageBucket: "jobassign4.appspot.com",
       messagingSenderId: "63214700687",
       appId: "1:63214700687:web:63f29bd2ab3e96d3"
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
