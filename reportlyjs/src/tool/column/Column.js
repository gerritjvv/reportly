import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

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

    const classes = ["button", "has-margin-10",
        "has-width-400",
        "has-max-width-200",
        "is-info", "is-outlined", "list-item", "has-text-left", "ColumnOverflow"];

    if (isDragging) {
        classes.push("ColumnIsDragging");
    }

    const styles = {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
    }

    return (
        <label
            ref={drag}
            style={styles}
            className={classes.join(' ')}
            key={column.key}>
            {column.name}
        </label>
    )
}


export default Column

