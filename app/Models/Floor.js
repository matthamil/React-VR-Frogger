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

import Scenery from './Scenery';

export default class Floor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Model
          source={{
            obj: asset('landscape/road-straight-low.obj'),
            mtl: asset('landscape/road-straight-low.mtl')
          }}
          style={{
            transform: [
              { rotateY: 0 },
              { translate: [ 0, -11.49, -3 ] },
              { scale: 1.5 },
              { scaleX: 2.5 }
            ]
          }}/>
        <Scenery/>
        <Plane
          dimWidth={25}
          dimHeight={25}
          lit={false}
          style={{
            color: 'rgb(76, 95, 43)',
            transform: [
              { rotateX: -90 },
              { translate: [ 0, -2, -10 ] }
            ]
          }}/>
      </View>
    );
  }
}