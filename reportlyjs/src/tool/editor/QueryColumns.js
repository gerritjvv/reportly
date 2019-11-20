import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

import Column from "../column/Column";

const queryColumns = (props) => {

    return (
        <nav className="level">
            <div className="level-left">
                {props.columns.map(c => (<div key={c.key} className="level-item"><Column column={c}/></div>))}
            </div>
        </nav>
    );
};

export default queryColumns;
