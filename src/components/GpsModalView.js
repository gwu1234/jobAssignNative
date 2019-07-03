import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;

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

        const orderArray =[];
        for (var key in workorders) {
           let {isActive,isRepeat,repeatTimes,deliverys} = workorders[key];
           isActive = (isActive && isActive === "true")? true:false;
           isRepeat = (isRepeat && isRepeat === "true")? true:false;
           repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
           let deliveryTimes = 0;
           for (var deliverykey in deliverys) {
               deliveryTimes ++;
           }
           let status = JOB_NEW;
           if (!isRepeat && deliveryTimes > 0) {
              status = JOB_DONE;
           } else if (isRepeat && repeatTimes === 0) {
              status = JOB_PROGRESS;
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
              status = JOB_DONE;
           } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
              status = JOB_PROGRESS;
           }
           else {
             status = JOB_NEW;
           }


           const newOrder = {...workorders[key], status: status}
           orderArray.push(newOrder);
        }

        let open = true;

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
                    <Text style={styles.orderText}>
                        {activeOrder} orders active
                    </Text>

                    <View style={styles.FlatViewContainer} >
                    <FlatList
                        data={orderArray}
                        showsVerticalScrollIndicator={true}
                        renderItem={({item}) =>
                           <TouchableWithoutFeedback onPress={ () => this.onRowPress(item)}>
                               <View style={styles.flatview}>
                                  <Text style={styles.orderName}>Order Id : {item.orderId} </Text>
                                  <Text style={styles.orderName}>Work Brief : {item.work}</Text>
                                    <Text style={styles.orderName}>Order Status :
                                      { item.status === JOB_NOT_ACTIVE ? "JOB_NOT_ACTIVE": (
                                        item.status === JOB_NEW ? "JOB_NEW": (
                                        item.status === JOB_ASSIGNED ? "JOB_ASSIGNED": (
                                        item.status === JOB_PROGRESS ? "JOB_PROGRESS": (
                                        item.status === JOB_DONE ? "JOB_DONE": "JOB_NEW") )))
                                      }
                                    </Text>
                              </View>
                           </TouchableWithoutFeedback>
                        }
                        keyExtractor={item => item.orderKey}
                    />
                    </View>

                    <View style ={{width: 250, height: 50,}}>
                    {isActiveOrderSelected && <View style={{marginTop:1, marginBotton:1}}>
                         <Text style={styles.orderSelected}>
                          Deliver to {ActiveOrderSelected.orderId}
                          </Text>
                          <Text style={styles.orderSelected}>
                          click Done to confirm
                          </Text>
                    </View>}
                    {doneWithoutOrder && <Text style={styles.orderSelected}>
                          select an order first
                          </Text> }
                    </View>
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
    height: 180,
  },
  modalContainer: {
    width: 260,
    height: 350,
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
    marginTop: 4,
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
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'blue',
    borderStyle: 'dotted',
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
