import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

import {getDataSourceStateFromStore, getShowableColumns, getSelectedColumns, getData} from '../../store/selectors';
import {addQueryColumn, removeQueryColumn} from '../../store/actions';

import './Editor.css';

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider, useDrop} from "react-dnd-cjs";
import QueryColumns from "./QueryColumns";
import TableArea from "./TableArea";
import ColumnListArea from "../column/ColumnListArea";
import {DragItemTypes} from "../utils/Constants";
import {connect} from "react-redux";

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
            return queryColumns.find(i => i.key === v.column.key)
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
            return columns.find(i => i.key === v.column.key)
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

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <BuilderArea
                    tableAreaAcceptNewQueryColumn={this.props.tableAreaAcceptNewQueryColumn}
                    columnListAcceptNewQueryColumn={this.props.columnListAcceptNewQueryColumn}
                    queryColumns={this.props.queryColumns}
                    columns={this.props.columns}
                    data={this.props.data}
                />
            </DndProvider>
        )
            ;
    }

}

// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    console.log("Editor.mapSTateToProps");
    console.log(state);


    return {
        columns: getShowableColumns(state),
        queryColumns: getSelectedColumns(state),
        data: getData(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        tableAreaAcceptNewQueryColumn: column => dispatch(addQueryColumn(column.key)),
        columnListAcceptNewQueryColumn: column => dispatch(removeQueryColumn(column.key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
