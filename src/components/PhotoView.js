
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Platform, StyleSheet, View, Text, TouchableWithoutFeedback,Image, Button, ActivityIndicator} from 'react-native';


class PhotoView extends Component {
   state = {
     photoUrl: null,
     photoTag: null,
     photoPath: null,
  };

  componentDidMount() {

     const {photoPath} = this.props;
     const storage = firebase.storage();
     const photoRef = storage.ref(photoPath);

     photoRef.getDownloadURL().then((url) =>{
          const jpg = url.lastIndexOf(".jpg", url.length);
          const p2f = url.lastIndexOf("%2F", url.length) + 3;
          const subUrl = url.slice(p2f, jpg);

          this.setState({photoTag: subUrl, photoUrl: url, photoPath: photoPath});

       }).catch(function(error) {
           console.log(error);
      });
  }



  render() {
   const { photoUrl, photoTag} = this.state;

   return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            {photoUrl && <Image
               key={photoTag}
               style={styles.image}
               source={{ uri: photoUrl }}
            />}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex:1,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 120,
    height: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  imageButton: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 0,
    marginBottom: 20,
    padding: 2,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 0,
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
});

export default PhotoView;
