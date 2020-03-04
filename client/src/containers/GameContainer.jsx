import React from 'react'
import './GameContainer.css'
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function GameContainer(props) {
    return (
      <div className="game_container">
          <LeftSide/>
          <div className="field_container">
              {props.field}
          </div>
          <RightSide/>
      </div>
    );
}

export default GameContainer
