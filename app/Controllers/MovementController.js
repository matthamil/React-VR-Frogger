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

  constructor(props) {
    super(props);

    // Initial location of the Frog
    this.state = {
      x: 0,
      y: -10,
      z: 5
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
      this.setState((prevState) => {
        const { z } = prevState;
        return {
          z: z - 1
        }
      });
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

  detectMovement = (e) => {
    if (e.nativeEvent.inputEvent.eventType !== 'keydown') {
      return;
    }
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
  };

  render() {
    const { x, y, z } = this.state;

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
        {this.props.children}
      </View>
    );
  }
}