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

import CarController from './CarController';

/**
 * This controller manages user input and moves the Frog through the
 * game area. The user can press W, A, S, or D to move the Frog.
 */
export default class MovementController extends React.Component {
  // These are arbitrary boundaries for the player.
  rightBoundary = 12;  // x-axis boundary
  leftBoundary = -12;  // x-axis boundary
  topBoundary = -10;   // z-axis boundary
  bottomBoundary = 14; // z-axis boundary
  frogOrigin = { x: 0, y: -10, z: 5 };

  constructor(props) {
    super(props);

    // Initial location of the Frog
    this.state = {
      ...this.frogOrigin,
      score: 0,
      carLocations: {}
    };
  }

  moveRight = () => {
    if (this.state.x < this.rightBoundary) {
      this.setState((prevState) => {
        const { x } = prevState;
        return {
          x: x + 1
        };
      });
    }
  }

  moveLeft = () => {
    if (this.state.x > this.leftBoundary) {
      this.setState((prevState) => {
        const { x } = prevState;
        return {
          x: x - 1
        }
      });
    }
  }

  moveUp = () => {
    if (this.state.z > this.topBoundary) {
      if (this.state.z - 1 === this.topBoundary) {
        this.scorePoint();
      }
      else {
        this.setState((prevState) => {
          const { z } = prevState;
          return {
            z: z - 1
          }
        });
      }
    }
  }

  moveDown = () => {
    if (this.state.z < this.bottomBoundary) {
      this.setState((prevState) => {
        const { z } = prevState;
        return {
          z: z + 1
        }
      });
    }
  }

  scorePoint = () => {
    this.setState((prevState) => ({
      score: prevState.score + 1,
      // Reset position of Frog
      ...this.frogOrigin
    }));
  };

  resetFrogPosition = () => {
    this.setState(() => ({
      ...this.frogOrigin
    }));
  }

  detectMovement = (e) => {
    const { eventType } = e.nativeEvent.inputEvent;
    if (
      eventType !== 'keydown' &&
      eventType !== 'touchstart'
    ) {
      return;
    }

    if (eventType === 'keydown') {
      const { key } = e.nativeEvent.inputEvent;
      switch (key) {
        case 'd': {
          this.moveRight();
          return;
        }
        case 'a': {
          this.moveLeft();
          return;
        }
        case 'w': {
          this.moveUp();
          return;
        }
        case 's': {
          this.moveDown();
          return;
        }
        default:
          return;
      }
    }
    else if (eventType === 'touchstart') {
      // TODO
      const { touches } = e.nativeEvent.inputEvent;
      const { viewportX, viewportY } = touches[0];
    }
  };

  render() {
    const { x, y, z, score } = this.state;
    const frogLocation = [ x, y, z ];

    return (
      <View
        onInput={this.detectMovement}>
        <View
          style={{
            transform: [
              { translateX: x },
              { translateY: y },
              { translateZ: z }
            ]}}>
        <Model
          style={{
            transform: [
              { rotateY: '180deg' },
              { scale: 0.03 },
            ]
          }}
          source={{
            obj: asset('frog/baby.obj'),
            mtl: asset('frog/baby.mtl')
          }}/>
        </View>
        <Text>{`Score: ${score}`}</Text>
        <CarController
          frogLocation={frogLocation}
          resetFrogPosition={this.resetFrogPosition}/>
        {this.props.children}
      </View>
    );
  }
}