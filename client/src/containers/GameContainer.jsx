import React from 'react'
import FieldContainer from "./FieldContainer";
import './GameContainer.css'
import Scoreboard from "../components/Scoreboard";

function GameContainer() {
    return (
      <div className="game_container">
          <FieldContainer/>
          <Scoreboard/>
      </div>
    );
}

export default GameContainer
