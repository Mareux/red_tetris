import React from "react";
import { useSelector } from "react-redux";
import "./Field.css";
import "./EnemyPlayfield.css";

const EnemyPlayfield = () => {
    const enemyPlayfield = useSelector(store => store.enemyPlayfield);
    return (
        <>
            <p style={{margin: "10 px 0 10px 10px"}}>
                {enemyPlayfield ? enemyPlayfield.username : ""}
            </p>
            <div className={"enemyPlayfield"}>
                {enemyPlayfield &&
                    enemyPlayfield.playfield.map((row, i) => (
                        <div key={i} className="row">
                            {row.map((column, i) => (
                                <div
                                    key={i}
                                    className={"column"}
                                    style={{
                                        backgroundColor:
                                            column === "gray"
                                                ? "gray"
                                                : "#FF7272"
                                    }}
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default EnemyPlayfield;
