import React from "react";
import {getDataSourceStateFromStore} from "../../../store/selectors/selectors";
import {getCreateReportSelectedDSTables} from "../../../store/selectors/createreportSelectors";

import {reportCreateSelectTable} from "../../../store/actions";
import {connect} from "react-redux";
import {routeTo} from "../../lib/route";

class CreateReportConsoleSelectTable extends React.Component {

    route = routeTo(this.props);

    selectTable = (tableName) => {
        this.props.selectTable(tableName);
    };

    render() {
        return this.showDataSourcesTables(this.props.tables);
    }

    showDataSourcesTables(tables) {
        return (
            <div className="container box is-full-width has-min-height-350">
                <table className="table is-full-width is-hoverable is-striped">
                    <thead>
                    <tr>
                        <th className="i">Select a Table</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(tables).map(tblName => {
                        return (
                            <tr key={tblName}>
                                <td>
                                    <button className="button has-text-link is-borderless" onClick={ () => this.selectTable(tblName)}>{tblName}</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    const tables = getCreateReportSelectedDSTables(state);
    return {
        tables: tables
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectTable: (tblName) => dispatch(reportCreateSelectTable(tblName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportConsoleSelectTable);
