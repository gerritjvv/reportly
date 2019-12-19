import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import React from "react";


export const inputField = (id, lbl, placeholder, help, type, onChange, {required=false}) => {
    return (<div className="field">
        <label className="label">{lbl}</label>
        <div className="control">
            <input id={id} className="input" type={type} placeholder={placeholder} onChange={onChange} required={required}/>
        </div>
        <p className="help">{help}</p>
    </div>);
};

export const inputText = (id, lbl, placeholder, help, onChange, props) => {
    return inputField(id, lbl, placeholder, help, "text", onChange, props)
};

export const checkBox = (id, lbl, isChecked, onChange) => {


    return (
        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <input name={id} id={id} type="checkbox" checked={isChecked} onChange={onChange}/>
                    {lbl}
                </label>
            </div>
        </div>);
};

// options = [{value: "value", txt: "Display text"}]
export const selectInput = (id, lbl, options, onChange, props) => {
    return (
        <div className="field">
            <label className="label">{lbl}</label>
            <div className="control">
                <div className="select">
                    <select name={id} id={id} onChange={onChange}>
                        {options.map(({value, text}) => (<option key={value} value={value}>{text}</option>))}
                    </select>
                </div>
            </div>
        </div>);
};
