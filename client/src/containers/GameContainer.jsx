import React from 'react'
import './GameContainer.css'
import LeftSide from "./LeftSide";

function GameContainer(props) {
    return (
      <div className="game_container">
          <LeftSide/>
          <div className="field_container">
              {props.field}
          </div>
      </div>
    );
}

export default GameContainer
