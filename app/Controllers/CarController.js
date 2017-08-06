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

  createCar = (carNumber) => {
    return (
      <Car
        key={carNumber}
        frogLocation={this.props.frogLocation}
        resetFrogPosition={this.props.resetFrogPosition}
        initX={carNumber}
        initZ={Math.floor(Math.random * -10) + 10}/>
    );
  }

  renderCars = () => {
    let cars = [];
    for (let i = 1; i < 6; i++) {
      const car = this.createCar(i);
      cars.push(car);
    }
    return cars;
  }

  render() {
    return (
      <View>
        {this.renderCars()}
      </View>
    )
  }
}