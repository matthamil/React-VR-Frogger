import React from 'react';
import { Easing } from 'react-native';
import {
  AppRegistry,
  Animated,
  asset,
  AsyncStorage,
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
      highScore: 0,
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
    this.setState((prevState) => {
      const newScore = prevState.score + 1;
      const isNewHighScore = newScore > prevState.highScore;
      if (isNewHighScore) {
        AsyncStorage.setItem('highScore', newScore);
      }
      return {
        score: newScore,
        highScore: isNewHighScore ? newScore : prevState.highScore,
        // Reset position of Frog
        ...this.frogOrigin
      };
    });
  };

  resetFrogPosition = () => {
    this.setState(() => ({
      score: 0,
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
      const { touches } = e.nativeEvent.inputEvent;
      // User is pinching the screen
      if (touches.length > 1) {
        return;
      }
      const { viewportX, viewportY } = touches[0];
      const direction = this.calculateTouchDirection(viewportX, viewportY);
      switch (direction) {
        case 'up': {
          this.moveUp();
          return;
        }
        case 'left': {
          this.moveLeft();
          return;
        }
        case 'right': {
          this.moveRight();
          return;
        }
        case 'down': {
          this.moveDown();
          return;
        }
        default:
          return;
      }
    }
  };

  // Determine which part of the screen the user touched
  calculateTouchDirection = (viewportX, viewportY) => {
    // First line:
    // y = x
    // Y1 - Y2 = delta Y
    // Where Y1 is point on line,
    // and Y2 is point's Y value
    // If delta Y < 0, left & above
    // If delta Y > 0, right & below

    const getPointOnLine = (slope) => (x) => slope * x;
    const y1 = getPointOnLine(1)(viewportX);
    const y2 = viewportY;
    const deltaY = y1 - y2;

    const isPointAboveLine1 = deltaY < 0;

    // Second line:
    // y = -x
    // If delta Y < 0, above & right
    // If Delta Y > 0, left & below
    const secondY1 = getPointOnLine(-1)(viewportX);
    const secondY2 = viewportY;
    const secondDeltaY = secondY1 - secondY2;
    const isPointAboveLine2 = secondDeltaY < 0;

    if (isPointAboveLine1 && isPointAboveLine2) {
      return 'up';
    }
    if (isPointAboveLine1 && !isPointAboveLine2) {
      return 'left';
    }
    if (!isPointAboveLine1 && isPointAboveLine2) {
      return 'right';
    }
    if (!isPointAboveLine1 && !isPointAboveLine2) {
      return 'down';
    }
  };


  componentDidMount() {
    AsyncStorage.getItem('highScore')
      .then((highScore) => {
        if (highScore === null) {
          throw new Error('highScore is null');
        }
        this.setState(() => ({
          highScore
        }));
      })
      .catch((err) => {
        this.setState(() => ({
          highScore: 0
        }))
      });
  }

  render() {
    const { x, y, z, score, highScore } = this.state;
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
        <View
          style={{
            transform: [
              { translate: [ 1, -3, 7.75 ] },
              { rotateX: '-45deg' },
            ]
          }}>
          <Text>
            {`Score: ${score}`}
          </Text>
          <Text>
            {`High Score: ${highScore}`}
          </Text>
          <Text>
            Frogger in React VR by @_matthamil
          </Text>
        </View>
        <CarController
          frogLocation={frogLocation}
          resetFrogPosition={this.resetFrogPosition}/>
        {this.props.children}
      </View>
    );
  }
}