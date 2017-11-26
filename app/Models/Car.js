import React from "react";
import { Easing } from "react-native";
import { Animated, asset, Model } from "react-vr";

export default class Car extends React.Component {
  carMaterialOptions = [
    {
      obj: asset("cars/car-coupe-blue.obj"),
      mtl: asset("cars/car-coupe-blue.mtl")
    },
    {
      obj: asset("cars/car-coupe-citrus.obj"),
      mtl: asset("cars/car-coupe-citrus.mtl")
    },
    {
      obj: asset("cars/car-coupe-orange.obj"),
      mtl: asset("cars/car-coupe-orange.mtl")
    },
    {
      obj: asset("cars/car-coupe-red.obj"),
      mtl: asset("cars/car-coupe-red.mtl")
    },
    {
      obj: asset("cars/car-coupe-silver.obj"),
      mtl: asset("cars/car-coupe-silver.mtl")
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

  getRemainingDistance = initZ => {
    const halfDistance = this.state.totalDistance / 2;

    if (initZ > 0) {
      return initZ + halfDistance;
    } else if (initZ < 0) {
      return Math.abs(initZ) + halfDistance;
    }
    return halfDistance;
  };

  getDuration = remainingDistance =>
    remainingDistance * this.state.speed / this.state.totalDistance * 1000;

  // Begin car animation 🚗 💨
  vroom = (duration = 5000) => {
    Animated.timing(this.state.z, {
      toValue: this.state.totalDistance / 2,
      duration,
      easing: Easing.linear
    }).start(() => {
      this.setState(
        () => ({
          z: new Animated.Value(-(this.state.totalDistance / 2)),
          speed: this.getRandomSpeed(),
          carModel: this.getRandomCar()
        }),
        () => {
          const remainingDistance = this.state.totalDistance;
          const remainingDuration = this.getDuration(remainingDistance);
          this.vroom(remainingDuration);
        }
      );
    });
  };

  // Arbitrary limits on car speed
  getRandomSpeed = () => Math.random() * 8 + 5;

  getRandomCar = () =>
    this.carMaterialOptions[
      Math.floor(Math.random() * this.carMaterialOptions.length)
    ];

  // Poor man's collision detection.
  // Unlike other tools like Unity, React VR does not have a physics engine.
  // React VR has no concept of "rigid bodies" like Unity does (see https://docs.unity3d.com/ScriptReference/Rigidbody.html).
  // Collisions are checked every 100ms.
  carCollisionCheck = () => {
    const [frogX, _frogY, frogZ] = this.props.frogLocation; // eslint-disable-line
    const { x, z } = this.state;

    const lengthOfCar = 3; // Length of car model
    const isFrogInLane = -frogZ === x;

    if (
      isFrogInLane &&
      z._value + lengthOfCar / 2 > frogX &&
      z._value - lengthOfCar / 2 < frogX
    ) {
      this.props.resetFrogPosition();
      clearInterval(this.state.interval);
      this.startCollisionCheck();
    }
  };

  startCollisionCheck = () => {
    this.setState(() => ({
      interval: setInterval(this.carCollisionCheck, 100)
    }));
  };

  componentDidMount() {
    const { initZ } = this.props;
    const remainingDistance = this.getRemainingDistance(initZ);
    const animationDuration = this.getDuration(remainingDistance);
    this.vroom(animationDuration);
    this.startCollisionCheck();
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
        }}
      >
        <Model source={carModel} />
      </Animated.View>
    );
  }
}
