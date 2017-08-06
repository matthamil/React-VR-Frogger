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

export default class Car extends React.Component {
  carMaterialOptions = [
    {
      obj: asset('cars/car-coupe-blue.obj'),
      mtl: asset('cars/car-coupe-blue.mtl')
    },
    {
      obj: asset('cars/car-coupe-citrus.obj'),
      mtl: asset('cars/car-coupe-citrus.mtl')
    },
    {
      obj: asset('cars/car-coupe-orange.obj'),
      mtl: asset('cars/car-coupe-orange.mtl')
    },
    {
      obj: asset('cars/car-coupe-red.obj'),
      mtl: asset('cars/car-coupe-red.mtl')
    },
    {
      obj: asset('cars/car-coupe-silver.obj'),
      mtl: asset('cars/car-coupe-silver.mtl')
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      x: props.initX,
      y: -10,
      z: new Animated.Value(props.initZ),
      speed: this.getRandomSpeed(),
      totalDistance: 25,
      carModel: this.getRandomCar()
    };
  }

  getRemainingDistance = (initZ) => {
    const halfDistance = this.state.totalDistance / 2;

    if (initZ > 0) {
      return initZ + halfDistance;
    }
    else if (initZ < 0) {
      return Math.abs(initZ) + halfDistance;
    }
    else {
      return halfDistance;
    }
  };

  getDuration = (remainingDistance) => {
    return ((remainingDistance * (this.state.speed)) / this.state.totalDistance) * 1000;
  };

  vroom = (duration = 5000) => {
    Animated.timing(
      this.state.z,
      {
        toValue: this.state.totalDistance / 2,
        duration,
        easing: Easing.linear
      }
    ).start(() => {
      this.setState(() => ({
        z: new Animated.Value(-(this.state.totalDistance / 2)),
        speed: this.getRandomSpeed(),
        carModel: this.getRandomCar()
      }), () => {
        const remainingDistance = this.state.totalDistance;
        const duration = this.getDuration(remainingDistance);
        this.vroom(duration);
      });
    });
  };

  getRandomSpeed = () => (Math.random() * 8) + 5;

  getRandomCar = () => {
    return this.carMaterialOptions[Math.floor(Math.random() * this.carMaterialOptions.length)];
  }

  componentDidMount() {
    const { initZ } = this.props;
    const remainingDistance = this.getRemainingDistance(initZ);
    const animationDuration = this.getDuration(remainingDistance);
    this.vroom(animationDuration);
  }

  render() {
    const { x, y, z, carModel } = this.state;

    return (
      <Animated.View
        style={{
          transform: [
            { rotateY: 90 },
            { translateX: x },
            { translateY: y },
            { translateZ: z }
          ]
        }}>
        <Model
          source={carModel}/>
      </Animated.View>
    );
  }
}