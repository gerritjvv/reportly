import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

import {getColumns, getSelectedColumns, getData} from '../../store/selectors';

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

    columnListAcceptNewQueryColumn = (column) => {
        // console.log("Reveiced new column columnListAcceptNewQueryColumn ");
        // console.log(column);
        //
        // const queryColumns = this.state.queryColumns.filter(c => c.key !== column.key);
        // const columns = [...this.state.columns, column];
        //
        // this.setState({
        //     queryColumns: queryColumns,
        //     columns: [...new Set(columns)],
        // });
    }

    tableAreaAcceptNewQueryColumn = (column) => {
        // console.log("Reveiced new column ");
        // console.log(column);
        //
        // const columns = this.state.columns.filter(c => c.key !== column.key);
        // const queryColumns = [...this.state.queryColumns, column];
        //
        // this.setState({
        //     queryColumns: [...new Set(queryColumns)],
        //     columns: columns,
        // });
    };

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <BuilderArea
                    tableAreaAcceptNewQueryColumn={this.tableAreaAcceptNewQueryColumn}
                    columnListAcceptNewQueryColumn={this.columnListAcceptNewQueryColumn}
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
  return {
      columns: getColumns(store),
      queryColumns: getSelectedColumns(store),
      data: getData(store),
  };
};

export default connect(mapStateToProps)(Editor);
