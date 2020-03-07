import React, { useState } from "react";
import "./Scoreboard.css";
import { useSelector } from "react-redux";

function Scoreboard() {
    const score = useSelector(store => store.score);
    const level = useSelector(store => store.level);
    const lines = useSelector(store => store.clearedLines);

    return (
        <div className="board">
            <p>Score</p>
            <div>{score}</div>
            <p>Level</p>
            <div>{level}</div>
            <p>Lines</p>
            <div>{lines}</div>
        </div>
    );
}

export default Scoreboard;
