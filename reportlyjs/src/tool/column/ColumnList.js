import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import './ColumnList.css'

const ColumnList = (props) => {
     return (
         <div className="list is-hoverable LeftMenu">
             {props.columns.map( (c) => <a href="/" className="button is-primary  list-item"> {c.display} </a>)}
         </div>
     );
};


export default ColumnList

