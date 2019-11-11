import React from 'react'
import FieldContainer from "./FieldContainer";
import './GameContainer.css'
import Scoreboard from "../components/Scoreboard";
import Next from "../components/Next";

function GameContainer() {
    return (
      <div className="game_container">
          <Scoreboard/>
          <FieldContainer/>
          <Next/>
      </div>
    );
}

export default GameContainer
