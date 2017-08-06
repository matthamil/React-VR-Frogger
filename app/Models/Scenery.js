import React from 'react';
import { Easing } from 'react-native';
import {
  AppRegistry,
  Animated,
  asset,
  Model,
  Pano,
  Plane,
  Scene,
  Text,
  View,
} from 'react-vr';

export default class Scenery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Model
          style={{
            transform: [
              { translate: [ -12.5, -10, -8 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_062.obj'),
            mtl: asset('nature/naturePack_062.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { rotateY: '45deg' },
              { translate: [ -12.5, -10, -6.5 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_062.obj'),
            mtl: asset('nature/naturePack_062.mtl')
          }}
          />
         <Model
          style={{
            transform: [
              { translate: [ 9.5, -10, -8 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_073.obj'),
            mtl: asset('nature/naturePack_073.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ -12, -10, 8 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_130.obj'),
            mtl: asset('nature/naturePack_130.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ 10, -10, 8 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_151.obj'),
            mtl: asset('nature/naturePack_151.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ 8, -10, 10 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_flat_001.obj'),
            mtl: asset('nature/naturePack_flat_001.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ 12, -10, 3 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_flat_003.obj'),
            mtl: asset('nature/naturePack_flat_003.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ -9, -10, 3 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_flat_006.obj'),
            mtl: asset('nature/naturePack_flat_006.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ 9, -10, 6 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_flat_010.obj'),
            mtl: asset('nature/naturePack_flat_010.mtl')
          }}
          />
        <Model
          style={{
            transform: [
              { translate: [ -12, -10, 11 ]}
            ]
          }}
          source={{
            obj: asset('nature/naturePack_flat_013.obj'),
            mtl: asset('nature/naturePack_flat_013.mtl')
          }}
          />
      </View>
    );
  }
}