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
import Car from '../Models/Car';

export default class CarController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Car
          initX={5}
          initZ={-12.5}/>
        <Car
          initX={4}
          initZ={0}/>
        <Car
          initX={3}
          initZ={2}/>
        <Car
          initX={2}
          initZ={-5}/>
        <Car
          initX={1}
          initZ={-2}/>
      </View>
    )
  }
}