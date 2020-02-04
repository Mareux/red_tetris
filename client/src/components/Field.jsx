import React from 'react'
import './Field.css'
import useFieldSubscription from "../hooks/useFieldSubscription";

const Field = (props) => {
    const field = useFieldSubscription(props.socket);

    onmousemove = (event) => {

    };

    return (
        <div>
            {field.map((row, i) =>
                <div key={i} className="row">
                    {row.map((column, i) =>
                        <div
                            key={i}
                            className={"column"}
                            style={{backgroundColor: column}}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Field;
