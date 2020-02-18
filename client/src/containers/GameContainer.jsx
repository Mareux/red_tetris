import React from 'react'
import './GameContainer.css'
import Scoreboard from "../components/Scoreboard";
import Next from "../components/Next";
import Field from "../components/Field";

function GameContainer(props) {
    return (
      <div className="game_container">
          <Scoreboard/>
          <div className="field_container">
              {props.field}
          </div>
          <Next socket={props.socket}/>
      </div>
    );
}

export default GameContainer
