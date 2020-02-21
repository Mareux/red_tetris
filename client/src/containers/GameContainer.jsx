import React from 'react'
import './GameContainer.css'
import Scoreboard from "../components/Scoreboard";
import Next from "../components/Next";

function GameContainer(props) {
    return (
      <div className="game_container">
          <Scoreboard/>
          <div className="field_container">
              {props.field}
          </div>
          <Next/>
      </div>
    );
}

export default GameContainer
