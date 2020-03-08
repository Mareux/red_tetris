import React from "react";
import { useSelector } from "react-redux";
import "./Field.css";
import "./EnemyPlayfield.css";

const EnemyPlayfield = () => {
    const players = useSelector(store => store.enemyPlayfield);

    return (
        players && players.map(player => {
            return <>
                <p style={{ margin: "10 px 0 10px 10px" }}>
                    {player && player.playfield ? player.username : ""}
                </p>
                <div className={"enemyPlayfield"}>
                    {player && player.playfield &&
                    player.playfield.map((row, i) => (
                        <div key={i} className="row">
                            {row.map((column, i) => (
                                <div
                                    key={i}
                                    className={"column"}
                                    style={{
                                        backgroundColor:
                                            column === "#111329"
                                                ? "#111329"
                                                : "#FF7272"
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </>;
        })

    );
};

export default EnemyPlayfield;
