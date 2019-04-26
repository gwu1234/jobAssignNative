//import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Platform, CameraRoll, FlatList, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Image, Button} from 'react-native';
//import ImageResizer from 'react-native-image-resizer';
import { ImagePicker, ImageManipulator, Permissions} from 'expo';
//import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
//import { ImagePicker } from 'expo';

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
     //photos: [],
     photoPath: '',
     //filePath: null,
     photo: null,
     thumb: null,

  };

  //getPhotos.bind(this);

  componentWillMount() {
    const { workorder, usertag} = this.props;
    const {clientTag, orderKey} = workorder;
    //console.log(usertag);
    //console.log(clientTag);
    //console.log(orderKey);
    const photoPath = usertag + "/" + clientTag + "/" + orderKey;
    //console.log(photoPath);
    this.setState ({photoPath: photoPath});
    //this.getPhotos.bind(this);
     //this.getPhotos();
  }

  componentDidMount() {
     //this.getPhotos();
      const permission = Permissions.getAsync(Permissions.CAMERA_ROLL);
      if (permission.status !== 'granted') {
            const newPermission = Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                console.log("Camera_roll granted");
             } else {
               console.log("Camera_roll not granted");
             }
       } else {
            console.log("Camera_roll granted");
       }
  }

  /*_handleButtonPress = () => {
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
   }; */

   _resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [ {resize: { width :60}}], { format: 'jpg' }
    );
    console.log(manipResult);
    //const {photos} = this.state;
    //photos.push(manipResult);
    this.setState({ thumb: manipResult.uri });
    //return manipResult;
  }

   /*async getPhotos() {
       await CameraRoll.getPhotos({
           first: 10 ,
           assetType: 'Photos'
       })
       .then(r => {
           //console.log(r);
           //this.setState({ photos:r.edges, endCursorPhotos:r.page_info.end_cursor })
           let resizePromiseArray = []
           for(let i=0; i<r.edges.length; i++){
               //resizePromiseArray.push(
                this._resizeImage (r.edges[i].node.image.uri)
               //)
           }
           //this.setState({ photos:resizePromiseArray})
           //return Promise.all(resizePromiseArray)
       })
       //.then(newUris=>{
           // console.log(JSON.stringify(this.state.photos,null,4))
        //   let newPhotos = this.state.photos.map((photo,i) => {
        //       photo.node.image['optiUri'] = newUris[i]
        //       return photo
        //   })
        //   this.setState({ photos:newPhotos })
        //   console.log(newPhotos);
       //})
       .catch(err =>{
           console.log(err)
       })
   }*/

   /*onRowPress(item) {
      //console.log(item);
      const {photoPath} = this.state;
      const storage = firebase.storage();
      const sessionId = String(new Date().getTime())+ ".HEIC";
      const imageRef = storage.ref(photoPath).child("photo").child(sessionId);
      //return imageRef.put(item.node.image.uri);
      //this.uploadImage(imageRef, uri, mime = 'application/octet-stream');
      this.uploadImage(item.node.image.uri, imageRef)
      .catch(err =>{
          console.log(err)
      });
   }*/

  /*uploadImage = async(uri, ref) => {
      const response = await fetch(uri);
      //console.log(response);
      let blob = await response.blob();
      //blob._data = {...blob._data, type: "image/HEIC"};
      //blob._data = {...blob._data, type: "image/jpeg"};
      console.log(blob);

      var metadata = {
           contentType: 'image/jpeg',
      };

      //var ref = firebase.storage().ref().child("my-image");
      return ref.put(blob, metadata)
          .then((snapshot) => {
               console.log('Uploaded a blob to the following path: ');
               console.log(snapshot.metadata.fullPath);
               //console.log('Uploaded a blob!');
           })
          .catch((err) =>{
               console.log("error = " + err);
          });
  }*/

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

  /*chooseFile = () => {
      var options = {
        title: 'Select Image',
        customButtons: [
          { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          let source = response;
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            filePath: source,
          });
        }
      });
    };*/

    _pickImage = async () => {
    console.log("picking image");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
    this._resizeImage(result.uri);
  };

  submitImage = () => {
     const { photo, thumb, photoPath } = this.state;
     //const {photoPath} = this.state;
     const storage = firebase.storage();
     const sessionId = String(new Date().getTime());
     const photoRef = storage.ref(photoPath).child("photo").child(sessionId).child("photo.jpg");
     const thumbRef = storage.ref(photoPath).child("thumb").child(sessionId).child("thumb.jpg");
     //return imageRef.put(item.node.image.uri);
     //this.uploadImage(imageRef, uri, mime = 'application/octet-stream');
     //this.uploadImage(image, imageRef)
     this.uploadImageAsync(photo, photoRef);
     this.uploadImageAsync(thumb, thumbRef);
     //.catch(err =>{
      //   console.log(err)
     //});
  };

  uploadImageAsync = async (uri, ref) => {
  //async function uploadImageAsync(uri, ref) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.onload = function() {
           resolve(xhr.response);
       };
       xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
       };
       xhr.responseType = 'blob';
       xhr.open('GET', uri, true);
       xhr.send(null);
    });

     /*const ref = firebase
     .storage()
     .ref()
     .child(uuid.v4());*/
    //const snapshot = await ref.put(blob)
    await ref.put(blob)
    .then((snapshot) => {
         console.log('Uploaded a blob to the following path: ');
         console.log(snapshot.metadata.fullPath);
         //console.log('Uploaded a blob!');
         //console.log(snapshot.ref.getDownloadURL());
     })
    .catch((err) =>{
         console.log("error = " + err);
    });;

     // We're done with the blob, close and release it
     blob.close();

     //return await snapshot.ref.getDownloadURL();
}

  render() {
   //const { workorder} = this.props;
   const { photo } = this.state;
   //console.log(photos);
   return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <TouchableWithoutFeedback onPress={() =>this._pickImage()} style={styles.button}>
                <Text style={styles.buttonText}>
                     Select Photo from Camera Roll
                </Text>
            </TouchableWithoutFeedback>

            {photo && <Image source={{ uri: photo }} style={{ width: 300, height: 300 }} />}
            {photo && <TouchableWithoutFeedback onPress={ () => this.submitImage ()}>
                      <Text style={styles.imageButton}> Submit Photo </Text>
               </TouchableWithoutFeedback>}
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
    width: 100,
    height: 100,
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

/*<TouchableWithoutFeedback onPress={() => this._handleButtonPress()} style={styles.button}>
    <Text style={styles.buttonText}>
         Photo List
    </Text>
</TouchableWithoutFeedback> */

/*<View style={styles.container} >
    <TouchableWithoutFeedback onPress={() =>this._pickImage()} style={styles.button}>
        <Text style={styles.buttonText}>
             Photo List
        </Text>
    </TouchableWithoutFeedback>

   <FlatList
       data={photos}
       showsVerticalScrollIndicator={true}
       style={styles.scroll}
       renderItem={({item}) => {
           //console.log (item);
           //let uri = Platform.OS === 'ios' ? item.uri.replace('file://', ''):item.uri;
           //console.log(uri);
           //console.log(item.width);
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
);*/
