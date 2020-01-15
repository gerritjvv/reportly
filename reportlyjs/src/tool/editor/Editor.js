import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

import {
    getDataSourceStateFromStore,
    getShowableColumns,
    getSelectedColumns,
    getData,
    isLoadingRows
} from '../../store/selectors/selectors';
import {addQueryColumn, removeQueryColumn} from '../../store/actions';

import './Editor.css';

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider, useDrop} from "react-dnd-cjs";
import QueryColumns from "./QueryColumns";
import TableArea from "./TableArea";
import ColumnListArea from "../column/ColumnListArea";
import {DragItemTypes} from "../utils/Constants";
import {connect} from "react-redux";
import {getCreateReportLoadingRowsStatus} from "../../store/selectors/createreportSelectors";


const BuilderArea = ({
                         loadingRowsStatus,
                         isLoadingRows,
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
            if(isLoadingRows) {
                return false;
            }
            tableAreaAcceptNewQueryColumn(v.column);
        },
        canDrop: (v, monitor) => {
            if(isLoadingRows) {
                return false;
            }

            return columns.find(i => i.key === v.column.key)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    let tableAreaDrop = dropRefs[1];

    let tableArea = <TableArea data={data}/>;

    const {status, msg} = loadingRowsStatus;

    if (isLoadingRows) {
        tableArea = (
            <div className="level">
                <p className="level-item has-text-centered">
                    <button className="button is-loading">Loading Data Sources</button>
                </p>

            </div>);
    }
    if(status === "ERROR") {
        tableArea = (
            <div className="notification is-danger">
                <p>
                    Error Loading data from for the Data Source.
                </p>
                <p>
                    {JSON.stringify(msg)}
                </p>
            </div>
        );
    }

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
                {tableArea}
            </div>
        </div>

    </div>);
};

class Editor extends React.Component {

    render() {

        console.log("Editor.render: this.props.queryColumns");
        console.log(this.props);
        return (
            <div className="container">
                <DndProvider backend={HTML5Backend}>
                    <BuilderArea
                        loadingRowsStatus={this.props.loadingRowsStatus}
                        isLoadingRows={this.props.isLoadingRows}
                        tableAreaAcceptNewQueryColumn={this.props.tableAreaAcceptNewQueryColumn}
                        columnListAcceptNewQueryColumn={this.props.columnListAcceptNewQueryColumn}
                        queryColumns={this.props.queryColumns}
                        columns={this.props.columns}
                        data={this.props.data}
                    />
                </DndProvider>
            </div>
        )
            ;
    }

}

// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    console.log(">>>>>>>>>> Editor mapStateToProps");
    console.log(getCreateReportLoadingRowsStatus(state));
    return {
        loadingRowsStatus: getCreateReportLoadingRowsStatus(state),
        isLoadingRows: isLoadingRows(state),
        columns: getShowableColumns(state),
        queryColumns: getSelectedColumns(state),
        data: getData(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        tableAreaAcceptNewQueryColumn: (column) => {
            dispatch(addQueryColumn(column.key, true, dispatch));
        }
        ,
        columnListAcceptNewQueryColumn: (column) => {
            dispatch(removeQueryColumn(column.key, true, dispatch));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
