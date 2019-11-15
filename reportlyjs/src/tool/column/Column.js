import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import {useDrag} from "react-dnd-cjs";
import {DragItemTypes} from "../utils/Constants";

import './Column.css';

const Column = (props) => {

    const column = props.column;

    const [{isDragging}, drag] = useDrag(
        {
            item: {type: DragItemTypes.QUERY_COLUMN, column: column},
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        }
    );

    const classes = ["button", "is-primary", "list-item"];

    if (isDragging) {
        classes.push("ColumnIsDragging");
    }

    return (
        <label
            ref={drag}
            className={classes.join(' ')}
            key={column.key}>
            {column.name}
        </label>
    )
}


export default Column

