import React, {useState} from 'react'
import './Scoreboard.css'

function Scoreboard() {

    const [score, setScore] = useState("");
    const [level, setLevel] = useState("");
    const [lines, setLines] = useState("");

    return (
    <div className="board">
        <p>Score</p>
        <div>{score}</div>
        <p>Level</p>
        <div>{level}</div>
        <p>Lines</p>
        <div>{lines}</div>
    </div>)
}

export default Scoreboard;
