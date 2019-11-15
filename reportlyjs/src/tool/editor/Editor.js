import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

import './Editor.css';

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider, useDrop} from "react-dnd-cjs";
import QueryColumns from "./QueryColumns";
import TableArea from "./TableArea";
import ColumnListArea from "../column/ColumnListArea";
import {DragItemTypes} from "../utils/Constants";

const BuilderArea = ({
                         columnListAcceptNewQueryColumn,
                         columns,
                         queryColumns,
                         tableAreaAcceptNewQueryColumn,
                         data,
                     }) => {

    let dropRefs = useDrop({
        accept: DragItemTypes.QUERY_COLUMN,
        drop: (v) => {
            columnListAcceptNewQueryColumn(v.column);
        },
        canDrop: (v, monitor) => {
            return queryColumns.find( i => i.key === v.column.key)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const columnListAreaDrop = dropRefs[1];

    dropRefs = useDrop({
        accept: DragItemTypes.QUERY_COLUMN,
        drop: (v) => {
            tableAreaAcceptNewQueryColumn(v.column);
        },
        canDrop: (v, monitor) => {
            return columns.find( i => i.key === v.column.key)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const tableAreaDrop = dropRefs[1];

    return (<div className="tile is-ancestor has-min-height-350">
        <div ref={columnListAreaDrop}
             className="tile is-parent is-2 has-min-width-300 Overflow">
            <div className="tile is-child box">
                <ColumnListArea columns={columns}/>
            </div>

        </div>
        <div className="tile is-parent has-min-width-300">
            <div
                ref={tableAreaDrop}
                className="tile is-child box">
                <QueryColumns columns={queryColumns}/>
                <TableArea data={data}/>
            </div>
        </div>

    </div>);
}

class Editor extends React.Component {

    state = {
        columns: [{key: "name", name: "NameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameName"},
            {key: "date", name: "Date"},
            {key: "fmid", name: "Flight Media"},
            {key: "cid", name: "Campaign"}],

        queryColumns: [],

        data: {
            columns: ["date", "Flight Media", "CampaignCampaignCampaignCampaignCampaignCampaignCampaignCampaignCampaignCampaignCampaign"],
            "data": [
                ["2019-02-01", "1", "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"],
                ["2019-02-01", "1", "2"],
                ["2019-02-01", "1", "2"],
                ["2019-02-01", "1", "2"],
            ]
        }
    };

    columnListAcceptNewQueryColumn = (column) => {
        console.log("Reveiced new column columnListAcceptNewQueryColumn ");
        console.log(column);

        const queryColumns = this.state.queryColumns.filter(c => c.key !== column.key);
        const columns = [...this.state.columns, column];

        this.setState({
            queryColumns: queryColumns,
            columns: [...new Set(columns)],
        });
    }

    tableAreaAcceptNewQueryColumn = (column) => {
        console.log("Reveiced new column ");
        console.log(column);

        const columns = this.state.columns.filter(c => c.key !== column.key);
        const queryColumns = [...this.state.queryColumns, column];

        this.setState({
            queryColumns: [...new Set(queryColumns)],
            columns: columns,
        });
    };

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <BuilderArea
                    tableAreaAcceptNewQueryColumn={this.tableAreaAcceptNewQueryColumn}
                    columnListAcceptNewQueryColumn={this.columnListAcceptNewQueryColumn}
                    queryColumns={this.state.queryColumns}
                    columns={this.state.columns}
                    data={this.state.data}
                />
            </DndProvider>
        )
            ;
    }

}


export default Editor;
