import React from 'react';
import { MapView } from 'expo';
//import { Marker } from 'react-native-maps';

export default class GpsMapView extends React.Component {
  /*var markers = [
    {
      latitude: 45.65,
      longitude: -78.90,
      title: 'my place',
      subtitle: '450 Bruce'
    }
  ];*/

  render() {
    var markers = [
      {
        latlng: {
            latitude: 45.449485,
            longitude: -73.841047,
        },
        title: 'my place',
        subtitle: '450 Bruce',
        description: '450 Bruce Street',
      }
    ];
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
       {markers.map(marker => (
            <MapView.Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
            />
        ))}
      </MapView>
    );
  }
}

/*var markers = [
  {
    latitude: 45.65,
    longitude: -78.90,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];

<MapView
  region={...}
  annotations={markers}
/> */
