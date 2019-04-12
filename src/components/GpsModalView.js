import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

class GpsModalView extends React.Component {
    state = {
        modalVisible: false,
        activeOrderSelected: null,
        isActiveOrderSelected: null,
        doneWithoutOrder: false,
    };

    setModalVisible(visible) {
       this.setState({modalVisible: visible});
   }

    onButtonPress() {
       console.log("onButtonPress");
    }

    /*onRepeatPress(index) {
       console.log("GpsModalView onRepeatPress");
       this.props.onRepeatPress(index);
    }*/

    onDonePress(index) {
      //console.log("GpsModalView onDonePress");
      const {isActiveOrderSelected, ActiveOrderSelected} = this.state;
      if (!isActiveOrderSelected) {
         this.setState ({doneWithoutOrder: true});
         return;
      }
      this.setState ({doneWithoutOrder: false});
      //console.log(ActiveOrderSelected);
      this.props.onDonePress(index, ActiveOrderSelected);
    }

    onCancelPress(index) {
        //console.log("GpsModalView onCancelPress");
        //console.log(index);
        this.setState ({doneWithoutOrder: false});
        this.props.onCancelPress(index);
      }

    onRowPress(rowItem) {
        //Actions.employeeEdit({ employee: this.props.employee });
        //console.log("this row is ");
        //console.log(rowItem);
        this.setState ({
           isActiveOrderSelected: true,
           ActiveOrderSelected: rowItem,
           doneWithoutOrder: false,
        }) ;
      }

    render() {
        //console.log("atGpsCalloutView");
        //console.log(this.props.id);
        const {id, modalOpen, title, description, selectedIndex, status,
               street, city, activeOrder, workorders} = this.props;
        const {isActiveOrderSelected, ActiveOrderSelected, doneWithoutOrder} = this.state;
        //console.log("id = " + id);
        //console.log("title =" + title);
        //console.log("status =" + status);
        //console.log(selectedIndex);
        //console.log(workorders);

        const orderArray =[];
        for (var key in workorders) {
           const newOrder = {...workorders[key]}
           orderArray.push(newOrder);
        }

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
                    <Text style={styles.modalText}>{street}</Text>
                    <Text style={styles.modalText}>
                        {activeOrder} orders active
                    </Text>
                    <Text style={styles.modalText}>
                        select one to deliver
                    </Text>

                    <FlatList
                        data={orderArray}
                        showsVerticalScrollIndicator={true}
                        renderItem={({item}) =>
                           <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                               <View style={styles.flatview}>
                                  <Text style={styles.name}>{item.orderId} {item.work}</Text>
                              </View>
                           </TouchableWithoutFeedback>
                        }
                        keyExtractor={item => item.orderKey}
                    />

                    {isActiveOrderSelected && <Text style={styles.email}>
                          deliver to {ActiveOrderSelected.orderId} click Done to confirm
                          </Text> }
                    {doneWithoutOrder && <Text style={styles.email}>
                          select an order first
                          </Text> }
                    <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.leftButton}
                        onPress={() =>this.onDonePress(id)}>
                        <Text style={styles.buttonText}>Done</Text>
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
  orderText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
    width: 250,
    height: 260,
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
    width: '45%',
    height: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    margin: 5,
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
    width: '40%',
    height: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
    padding:5
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 10,
    borderRadius: 2,
  },
  name: {
    fontSize: 18
  },
  email: {
    color: 'red'
  }
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
