
import React from "react";
import ColumnList from "./ColumnList";

const ColumnListArea = (props) => {

    return (
            <ColumnList columns={props.columns}/>
    );
};

export default ColumnListArea;
