import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import React from "react";


export const inputField = (id, lbl, placeholder, help, type) => {
    return (<div className="field">
        <label className="label">{lbl}</label>
        <div className="control">
            <input id={id} className="input" type={type} placeholder={placeholder}/>
        </div>
        <p className="help">{help}</p>
    </div>);
};

export const inputText = (id, lbl, placeholder, help) => {
    return inputField(id, lbl, placeholder, help, "text")
};

export const checkBox = (id, lbl, isChecked) => {


    return (
        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <input name={id} id={id} type="checkbox" checked={isChecked}/>
                    {lbl}
                </label>
            </div>
        </div>);
};
