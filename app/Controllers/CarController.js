import React from "react";
import { View } from "react-vr";
import Car from "../Models/Car";

export default class CarController extends React.Component {
  createCar = carNumber => (
    <Car
      key={carNumber}
      frogLocation={this.props.frogLocation}
      resetFrogPosition={this.props.resetFrogPosition}
      initX={carNumber}
      initZ={Math.floor(Math.random * -10) + 10}
    />
  );

  renderCars = () => {
    const cars = Array.from(Array(5)).map((x, i) => this.createCar(i));
    return cars;
  };

  render() {
    return <View>{this.renderCars()}</View>;
  }
}
