import React, {useState} from 'react'
import './Scoreboard.css'

function Scoreboard() {

    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);

    return (
    <div className="board">
        <h5>Score</h5>
        <p>{score}</p>
        <h5>Level</h5>
        <p>{level}</p>
        <h5>Lines</h5>
        <p>{lines}</p>
    </div>)
}

export default Scoreboard;
