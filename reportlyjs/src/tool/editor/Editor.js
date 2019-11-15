import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

import ColumnList from "../column/ColumnList";
import Table from "../editor/Table";

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider, useDrop} from "react-dnd-cjs";
import {DragItemTypes} from "../utils/Constants";

const TableArea = (props) => {

    const onColumnDrop = props.onColumnDrop;

    const [, drop] = useDrop({
        accept: DragItemTypes.QUERY_COLUMN,
        drop: (v) => onColumnDrop(v.column),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
       <div ref={drop}>
           <Table data={props.data}/>
       </div>
    );
};

class Editor extends React.Component {

    state = {
        columns: [{key: "name", name: "Name"},
            {key: "date", name: "Date"},
            {key: "fmid", name: "Flight Media"},
            {key: "cid", name: "Campaign"}],

        data: {
            columns: ["date", "Flight Media", "Campaign"],
            "data": [
                ["2019-02-01", "1", "2"],
                ["2019-02-01", "1", "2"],
                ["2019-02-01", "1", "2"],
                ["2019-02-01", "1", "2"],
            ]
        }
    };

    acceptNewQueryColumn = (column) => {
        console.log("Reveiced new column ");
        console.log(column);
    };

    renderBuilder() {

        return (<div className="tile is-ancestor">
            <div className="tile is-parent is-2">
                <div className="tile is-child box">
                    <ColumnList columns={this.state.columns}/>
                </div>

            </div>
            <div className="tile is-parent">
                <div
                    className="tile is-child box">
                    <TableArea onColumnDrop={this.acceptNewQueryColumn} data={this.state.data}/>
                </div>
            </div>

        </div>);
    }
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                {this.renderBuilder()}
            </DndProvider>
        );
    }
}


export default Editor;
