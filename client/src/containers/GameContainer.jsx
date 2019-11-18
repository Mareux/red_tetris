import React from 'react'
import FieldContainer from "./FieldContainer";
import './GameContainer.css'
import Scoreboard from "../components/Scoreboard";
import Next from "../components/Next";

function GameContainer(props) {
    return (
      <div className="game_container">
          <Scoreboard/>
          <FieldContainer socket = {props.socket}/>
          <Next/>
      </div>
    );
}

export default GameContainer
