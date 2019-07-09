import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

class GpsLeadModal extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
       this.setState({modalVisible: visible});
   }

    onButtonPress() {
       console.log("onButtonPress");
    }

    onCancelPress(index) {
        this.props.onCancelPress(index);
      }


    render() {

        const {id, modalOpen, title, description, selectedIndex,
               street, city, province, postcode, country,
               phones, emails, cells} = this.props;

        let open = true;
        const isTitle = title? true: false;
        const isStreet = street? true: false;
        const isCity = city? true: false;
        const isProvince = province? true: false;
        const isPostcode = postcode? true: false;
        const isCountry = country? true: false;
        const isPhone = phones? (phones.length>0? true: false): false;
        const isEmail = emails? (emails.length>0? true: false): false;
        const isCell = cells? (cells.length>0? true: false): false;


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

                    {isTitle && <Text style={styles.titleText}>{title}</Text>}
                    {isStreet && <Text style={styles.modalText}>{street}</Text>}
                    {isCity && <Text style={styles.modalText}>{city}</Text>}
                    {isPostcode && <Text style={styles.modalText}>{postcode}</Text>}
                    {isProvince && <Text style={styles.modalText}>{province}</Text>}
                    {isPhone && <Text style={styles.modalText}>{phones[0]}</Text>}
                    {isCell && <Text style={styles.modalText}>{cells[0]}</Text>}
                    {isEmail && <Text style={styles.modalText}>{emails[0]}</Text>}

                    <View style={styles.buttonContainer}>
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
  orderText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 2,
    marginTop: 2,
  },
  orderName: {
    color: 'blue',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 0,
    paddingTop: 0,
  },
  orderSelected: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 0,
    paddingTop: 0,
  },
  modalText: {
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
    marginBottom: 0,
  },
  FlatViewContainer: {
    width: 250,
    height: 100,
  },
  modalContainer: {
    width: 230,
    height: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#fff'
  },
  leftButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: '40%',
    height: 40,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    margin: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
    padding:5
  },

  name: {
    fontSize: 18
  },
  email: {
    color: 'red'
  }
};


export default GpsLeadModal;
