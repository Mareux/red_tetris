import React from "react";
import "./Scoreboard.css";
import { useSelector } from "react-redux";


function Scoreboard() {
    const score = useSelector(store => store.score);
    const level = useSelector(store => store.level);
    const lines = useSelector(store => store.clearedLines);

    return (
        <div className="board">
                <table>
                    <tr>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>{score}</td>
                    </tr>
                    <tr>
                        <th>Level</th>
                    </tr>
                    <tr>
                        <td>{level}</td>
                    </tr>
                    <tr>
                        <th>Lines</th>
                    </tr>
                    <tr>
                        <td>{lines}</td>
                    </tr>
                </table>
        </div>
    );
}

export default Scoreboard;
