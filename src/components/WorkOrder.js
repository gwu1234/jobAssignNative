import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback, Image, Dimensions, PixelRatio} from 'react-native';
import {setThumbs} from '../actions';
//import ListItem from './ListItem';
import PhotoDisplay from './PhotoDisplay';
//import { CardSection, Input } from './common';
const { width, height } = Dimensions.get('window');

class WorkOrder extends Component {
   state = {
     orderId: null,
     work: null,
     isRepeat: null,
     repeatTimes: null,
     deliveryForOrder: 0,
     thumbPath: null,
     photoPath: null,
     thumbs: [],
  };

  componentDidMount() {
     const { usertag, order} = this.props;
     const {clientTag, orderKey, photo, deliverys} = order;
     let {thumbs} = this.state;
     //const {order} = this.props;
     //const {photo} = order;
     let deliveryForOrder = 0;
     for (var deliverykey in deliverys) {
         deliveryForOrder ++;
     }


     const isRepeat = order.isRepeat?(order.isRepeat==="true"?true:false):false;
     //const previousDelivery = order.previousDelivery?parseInt (order.previousDelivery):0 ;
     //const presentDelivery = order.presentDelivery? parseInt (order.presentDelivery):0 ;
     //const deliverys = previousDelivery + presentDelivery;
     const repeatTimes = order.repeatTimes?parseInt (order.repeatTimes):0;

     let status = "NEW";
     if (isRepeat){
       if (deliveryForOrder >= repeatTimes) {
         status = "DONE";
       } else if (deliveryForOrder > 0) {
         status = "PROGRESS";
       }
     } else if (deliveryForOrder >=1) {
        status = "DONE";
     }

     this.setState ({
          ...this.state,
          orderId: order.orderId,
          work: order.work,
          isRepeat: isRepeat,
          repeatTimes: repeatTimes,
          deliveryForOrder: deliveryForOrder,
          status: status,
      });

       //const { usertag, order} = this.props;
       //const {clientTag, orderKey} = order;
       const thumbPath = usertag + "/" + clientTag + "/" + orderKey + "/thumb";
       const photoPath = usertag + "/" + clientTag + "/" + orderKey + "/photo";
       //this.setState ({thumbPath: thumbPath, photoPath: photoPath});
       //const {photoPath} = this.state;
       //console.log(photo);
       for (var photokey in photo) {
          //console.log("photokey = " + photokey);
          //console.log("photoTag =" + photo[photokey].photoTag);
          const photoName = photokey + ".jpg"

          const storage = firebase.storage();
          const thumbRef = storage.ref(thumbPath);
          //const sessionId = String(new Date().getTime());
          //const photoRef = storage.ref(photoPath).child("photo").child(sessionId).child("photo.jpg");
          //const thumbRef = storage.ref(photoPath).child("thumb").child(sessionId).child("thumb.jpg");
          thumbRef.child(photo[photokey].photoTag).child(photoName).getDownloadURL().then((url) =>{
          // `url` is the download URL for 'images/stars.jpg'
          //console.log("key = " + key);
          //console.log("photoTag =" + photo[key].photoTag);
          const jpg = url.lastIndexOf(".jpg", url.length);
          const p2f = url.lastIndexOf("%2F", url.length) + 3;
          const subUrl = url.slice(p2f, jpg);
          //console.log("suburl = " + subUrl);
          //console.log(url);

          thumbs.push ({photoTag: subUrl, url: url});
          //this.props.setThumbs(thumbs);
          //this.props.setClients(clients);
          //setThumbs
          //console.log(thumbs);
          this.setState({...this.state, thumbs: thumbs});
          // This can be downloaded directly:
          /*var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
                 var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();*/

          // Or inserted into an <img> element:
          //var img = document.getElementById('myimg');
          //img.src = url;
       }).catch(function(error) {
           console.log(error);
       });
     };

     this.setState ({
          ...this.state,
          orderId: order.orderId,
          work: order.work,
          isRepeat: isRepeat,
          repeatTimes: repeatTimes,
          deliveryForOrder: deliveryForOrder,
          status: status,
          //thumbs: thumbs,
      });
  }


  onRowPress(order) {
     Actions.photos({ workorder: order });
  }

  onImagePress(clientTag, orderKey, photoTag) {
     const {usertag} = this.props;
     //console.log("onImagePress");
     //console.log("clientTag = " + clientTag);
     //console.log("orderKey = " + orderKey);
     //console.log("photoTag = " + photoTag);
     const photoName = photoTag + ".jpg";
     const photoPath = usertag + "/" + clientTag + "/" + orderKey + "/photo/" + photoTag + "/" + photoName;
     console.log("photoPath = ");
     console.log(photoPath);
     Actions.photoView({ photoPath: photoPath });
  }

  render() {
    const {orderId, work, isRepeat, repeatTimes, deliveryForOrder, status, thumbs} = this.state;
    const {order} = this.props;
    //console.log(thumbs);
    //if (thumbs.length>0) {console.log(thumbs)};
    return (
      <View style={styles.container}>
          <Text style={styles.order}>
              Order Id: {orderId}
          </Text>
          <Text style={styles.text}>
             Work: {work}
          </Text>
          <Text style={styles.text}>
             Is Repeat: {String(isRepeat)}
          </Text>
          {isRepeat && <Text style={styles.text}>
             Expected Repeat Times: {repeatTimes}
          </Text>}
          <Text style={styles.text}>
             Actual Delivery Times: {deliveryForOrder}
          </Text>
          <Text style={styles.text}>
             Status: {status}
          </Text>
          <Text style={styles.text}>
             photos: {thumbs.length}
          </Text>

          {thumbs.length > 0 && <View style={styles.thumbContainer}>
            <FlatList
              data={thumbs}
              style={styles.flatview}
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              renderItem={({item}) =>(
              <TouchableWithoutFeedback onPress={ () => this.onImagePress(order.clientTag, order.orderKey, item.photoTag)} style={styles.button1}>
                <Image
                  key={item.photoTag}
                  style={styles.image}
                  source={{ uri: item.url }}
                />
              </TouchableWithoutFeedback>
               )
              }
              keyExtractor={item => item.photoTag}
          />

          <TouchableWithoutFeedback onPress={ () => this.onRowPress(order)} style={styles.button1}>
          <Text style={styles.buttonText}>
             add photo
          </Text>
          </TouchableWithoutFeedback>
          </View>}

          {thumbs.length === 0 &&
          <TouchableWithoutFeedback onPress={ () => this.onRowPress(order)}>
          <Text style={styles.button}>
             add photo
          </Text>
          </TouchableWithoutFeedback>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 15,
    marginRight: 10,
  },

  flatview: {
    flex:3,
    flexDirection: 'row',
    height: 70,
  },
  flatitem: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "green",
  },
  buttonText: {
    backgroundColor: 'grey',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    padding: 5,
    marginTop: 15,
    marginLeft: 5,
    height: 35,
    color: 'white',
    fontWeight: "bold",
    fontSize: 15,
  },
  button1: {
    flex: 1
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    padding: 5,
    marginTop: 10,
    marginLeft: 20,
    height: 35,
    width: 100,
    color: 'white',
    fontWeight: "bold",
    fontSize: 15,
  },
  order: {
    fontSize: 16,
    color: 'green',
    fontStyle: "italic",
    paddingLeft: 20,
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
  },
  thumbContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 15,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 5,
  },
});

const mapStateToProps = state => {
  //this.setState({thumbs: state.employees.thumbs});
  //console.log(state.employees.thumbs);
  return {
     usertag: state.auth.userTag,
     //thumbs: state.employees.thumbs,
  };
};

export default connect(mapStateToProps)(WorkOrder);
//export default connect(mapStateToProps)(WorkOrder);
//export default WorkOrder;
