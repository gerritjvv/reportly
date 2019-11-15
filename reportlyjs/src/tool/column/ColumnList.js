import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import './ColumnList.css'
import Column from "./Column";

const ColumnList = (props) => {

    return (
        <div className="list is-hoverable">
            {props.columns.map((c) => <Column key={c.key} column={c}/>)}
        </div>
    );
};


export default ColumnList

