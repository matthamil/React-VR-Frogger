import React from 'react';
import {
  AppRegistry,
  asset,
  Model,
  Pano,
  Plane,
  Scene,
  Text,
  View,
} from 'react-vr';

import CarController from './app/Controllers/CarController';
import Floor from './app/Models/Floor';

export default class Frogger extends React.Component {
  render() {
    return (
      <Scene
        style={{
          transform: [
            { translate: [ 0, 0, 10 ] }
          ]
        }}>
        <View>
          <CarController/>
          <BoxController/>
          <Floor/>
          <Pano source={asset('panoramics/bluecloud_dn.jpg')}/>
        </View>
      </Scene>
    );
  }
};

AppRegistry.registerComponent('Frogger', () => Frogger);
