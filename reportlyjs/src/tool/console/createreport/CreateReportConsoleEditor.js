import React from "react";
import {getDataSourceStateFromStore} from "../../../store/selectors/selectors";
import {getCreateReportSelectedDSTables} from "../../../store/selectors/createreportSelectors";

import {connect} from "react-redux";
import Editor from "../../editor/Editor";

class CreateReportConsoleEditor extends React.Component {
    render() {
        return (
            <div className="container box is-full-width has-min-height-350">
                <Editor/>
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
        // selectTable: (tblName) => dispatch(reportCreateSelectTable(tblName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportConsoleEditor);
