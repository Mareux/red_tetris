import React from "react";
import EnemyPlayfield from "../components/EnemyPlayfield";

const RightSide = () => {
    return (
        <div
            style={{
                maxHeight: "900px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap"
            }}
        >
            <EnemyPlayfield />
        </div>
    );
};

export default RightSide;
