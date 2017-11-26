import React from "react";
import { AppRegistry, asset, Pano, Scene } from "react-vr";

import MovementController from "./app/Controllers/MovementController";
import Floor from "./app/Models/Floor";

export default class Frogger extends React.Component {
  render() {
    return (
      <Scene
        style={{
          transform: [{ translate: [0, 0, 10] }]
        }}
      >
        <MovementController>
          <Floor />
          <Pano source={asset("panoramics/bluecloud_dn.jpg")} />
        </MovementController>
      </Scene>
    );
  }
}

AppRegistry.registerComponent("Frogger", () => Frogger);
