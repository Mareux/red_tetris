import React from 'react'
import Field from "../components/Field";
import './FieldContainer.css'

const FieldContainer = (props) => {
    return (
        <div className="field_container">
            <Field socket = {props.socket}/>
        </div>
    );
};

export default FieldContainer;
