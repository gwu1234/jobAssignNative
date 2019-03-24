import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

class GpsModalView extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
       this.setState({modalVisible: visible});
   }

    onButtonPress() {
       console.log("onButtonPress");
    }

    onRepeatPress(index) {
       console.log("GpsModalView onRepeatPress");
       this.props.onRepeatPress(index);
    }

    onDonePress(index) {
      console.log("GpsModalView onDonePress");
      this.props.onDonePress(index);
    }

    onCancelPress(index) {
        console.log("GpsModalView onCancelPress");
        console.log(index);
        this.props.onCancelPress(index);
      }

    render() {
        //console.log("atGpsCalloutView");
        //console.log(this.props.id);
        const {id, modalOpen, title, description, selectedIndex, status, orderWork, orderId} = this.props;
        console.log("id = " + id);
        console.log("title =" + title);
        console.log("status =" + status);
        console.log(selectedIndex);

        let open = true;

        //if (selectedIndex && selectedIndex === id && modalOpen) {
        //   open = true;
        //}
        return (

          <Modal
             animationType="none"
             transparent={true}
             visible={open}
             onRequestClose={() => {
                   Alert.alert('Modal has been closed.');
             }}>
             <View style={{flex:1, flexDirection: 'column',
                          justifyContent: 'center', alignItems: 'center'}}>
             <View style={styles.modalContainer}>

                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.modalText}>{description}</Text>
                    <Text style={styles.modalText}>{orderWork}</Text>
                    <Text style={styles.modalText}>{orderId}</Text>

                    <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.leftButton}
                        onPress={() =>this.onDonePress(id)}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.leftButton}
                        onPress={() => this.onRepeatPress(id)}>
                        <Text style={styles.buttonText}>Repeat</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.leftButton}
                        onPress={() =>this.onCancelPress(id)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableHighlight>
                    </View>
             </View>
             </View>
          </Modal>
      )
    }
}

const styles = {
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 0,
  },
  modalText: {
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
    marginBottom: 0,
  },
  modalContainer: {
    width: 230,
    height: 160,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
  },
  leftButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '31%',
    height: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    margin: 3,
    justifyContent: 'space-between'
  },
  middleButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '31%',
    height: 40,
  },
  rightButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '31%',
    height: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
    padding:5
  },
};

//flex: 1,
//flexDirection: 'column',
export default GpsModalView;
//const mapStateToProps = state => {
  //console.log("GpsMapView");
  //console.log (state.employees.truck);
  //return {
     //clients: state.clients.clients,
     //employeeName: state.employees.employeeName,
     //truck: state.employees.truck,
     //usertag: state.auth.userTag,
  //};
//};

//export default connect(mapStateToProps, {})(GpsModalView);
