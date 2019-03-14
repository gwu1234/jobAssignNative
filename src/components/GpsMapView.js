import React from 'react';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import {Image, View, Text} from 'react-native';
import greenDot from './images/greenDot.png';
import redDot from './images/redDot.png';
//import { Marker } from 'react-native-maps';

export class GpsMapView extends React.Component {
  /*var markers = [
    {
      latitude: 45.65,
      longitude: -78.90,
      title: 'my place',
      subtitle: '450 Bruce'
    }
  ];*/

  render() {
    /*var markers = [
      {
        latlng: {
            latitude: 45.449485,
            longitude: -73.841047,
        },
        title: 'my place',
        subtitle: '450 Bruce',
        description: '450 Bruce Street',
      }
    ];*/

    const {clients} = this.props;
    //console.log("at GpsMapView");
    //console.log(clients);
    const red = false;
    const blue = true;
    return (
      <MapView
         style={{ flex: 1 }}
         initialRegion={{
            latitude: 45.449485,
            longitude: -73.841047,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
         }}
       >
       {clients.map(client => (
            <MapView.Marker
                coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
                title={client.clientName}
                description={client.clientStreet}
                key={client.clientKey} >
                {client.clientCity === "Kirkland" && <View style={styles.circle}>
                     <Text style={styles.pinText}>{1}</Text>
                </View>}
                {client.clientCity !== "Kirkland" && <View style={styles.bluecircle}>
                     <Text style={styles.pinText}>{2}</Text>
                </View>}
            </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

const styles = {
  imageStyle: {
    width: 17,
    height: 17,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'red',
  },
  bluecircle: {
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'blue',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 0,
  },
};

const mapStateToProps = state => {
  return {
     clients: state.clients.clients,
  };
};

export default connect(mapStateToProps, {})(GpsMapView);

/*
<MapView.Marker
    coordinate={{latitude:client.clientLat, longitude:client.clientLng}}
    title={client.clientName}
    description={client.clientStreet}
    key={client.clientKey} >
    <Image
        source={redDot}
        style={styles.imageStyle}
    />
</MapView.Marker>
*/
