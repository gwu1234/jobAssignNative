//import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CameraRoll, FlatList, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Image, Button} from 'react-native';
//import { setClients, setEmployeeName, setTruck} from '../actions';
//import ListItem from './ListItem';
//import { CardSection, Input } from './common';
//import RNFetchBlob from 'rn-fetch-blob';
//const fs = RNFetchBlob.fs
//const Blob = RNFetchBlob.polyfill.Blob
//const fs = RNFetchBlob.fs
//window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//window.Blob = Blob

class PhotoDisplay extends Component {
   state = {
     //workorder: null,
     photos: null,
     photoPath: '',

  };

  componentWillMount() {
    const { workorder, usertag} = this.props;
    const {clientTag, orderKey} = workorder;
    //console.log(usertag);
    //console.log(clientTag);
    //console.log(orderKey);
    const photoPath = usertag + "/" + clientTag + "/" + orderKey;
    //console.log(photoPath);
    this.setState ({photoPath: photoPath});
  }

  _handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };

   onRowPress(item) {
      console.log(item);
      const {photoPath} = this.state;
      const storage = firebase.storage();
      const sessionId = String(new Date().getTime());
      const imageRef = storage.ref(photoPath).child("photo").child(sessionId);
      //return imageRef.put(item.node.image.uri);
      //this.uploadImage(imageRef, uri, mime = 'application/octet-stream');
      this.uploadImage(item.node.image.uri, imageRef);
   }

  uploadImage = async(uri, ref) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      //var ref = firebase.storage().ref().child("my-image");
      return ref.put(blob);
  }

   /*uploadImage(imageRef, uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      //const imageRef = FirebaseClient.storage().ref('images').child('image_001')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }*/

  render() {
   //const { workorder} = this.props;
   const { photos } = this.state;
   //console.log(workorder);



   return (
      <View style={styles.container} >
          <TouchableWithoutFeedback onPress={this._handleButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>
                   Display Photos
              </Text>
          </TouchableWithoutFeedback>

         <FlatList
             data={photos}
             showsVerticalScrollIndicator={true}
             style={styles.scroll}
             renderItem={({item}) => {
                 //console.log (item);
                 return (
                   <View>
                      <Image
                        key={String(item.node.timestamp)}
                        style={styles.image}
                        source={{ uri: item.node.image.uri }}
                      />
                      <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                             <Text style={styles.imageButton}> Submit Photo </Text>
                      </TouchableWithoutFeedback>
                   </View>
                 )
               }
             }
             keyExtractor={item => String(item.node.timestamp)}
         />
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
    fontSize: 20,
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
    width: 200,
    height: 200,
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
const mapStateToProps = state => {
  return {
     usertag: state.auth.userTag,
  };
};

//export default connect(mapStateToProps, {})(PhotoDisplay);
export default connect(mapStateToProps)(PhotoDisplay);
//export default PhotoDisplay;

/*<View style={styles.container}>
  <TouchableWithoutFeedback onPress={this._handleButtonPress} style={styles.button}>
  <Text style={styles.buttonText}>
     Display Photos
  </Text>
  </TouchableWithoutFeedback>
  {this.state.photos && <ScrollView style={styles.scroll}>
    {this.state.photos.map((p, i) => {
    return (
      <Image
        key={i}
        style={styles.image}
        source={{ uri: p.node.image.uri }}
      />
    );
  })}
  </ScrollView>}
</View>*/
