import React from 'react';
import { MapView } from 'expo';
import { connect } from 'react-redux';
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
                key={client.clientKey}
            />
        ))}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
     clients: state.clients.clients,
  };
};

export default connect(mapStateToProps, {})(GpsMapView);
