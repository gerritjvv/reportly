import {
    DATASOURCES_LOAD,
    DATASOURCES_LOADED,
    DATA_SOURCE_LOAD,
    DATA_SOURCE_LOADED,
    QUERY_COLUMN_ADD,
    QUERY_COLUMN_REMOVE,
    CREATE_REPORT_SELECT_DS,
    CREATE_REPORT_SELECT_TABLE,
    REPORT_QUERY_POLL,
    REPORT_QUERY_ROWS_LOADED,
} from '../actions';

import {
    TEST_DATASOURCE_CONNECTION, TEST_DATASOURCE_CONNECTION_RESP_ERR, TEST_DATASOURCE_CONNECTION_RESP_OK,
} from '../createDataSourceActions'

import {updateVisibleDataSource, getDataSourceId, getTable, getSelectedColumns} from '../selectors/selectors';
import {reportQuery, reportQueryPoll} from './reportQuery';

const initState =
    {
        createReport: {
            selectedDataSource: "",
            selectedTable: "",
        },

        visibleDataSource: "default",
        dataSources:
            {
                // "default": {
                //     name: "default",
                //
                //     columns: {
                //         "A": {key: "A", name: "NameA"},
                //         "date": {key: "date", name: "Date"},
                //         "fmid": {key: "fmid", name: "Flight Media"},
                //         "cid": {key: "cid", name: "Campaign"},
                //     },
                //     // a set of selected column keys that map to the columns
                //     selectedColumns: [],
                //     data: {
                //         columns: ["date", "Flight Media", "Campaign"],
                //         rows: [
                //             ["2019-02-01", "1", "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"],
                //             ["2019-02-01", "1", "2"],
                //             ["2019-02-01", "1", "2"],
                //             ["2019-02-01", "1", "2"],
                //         ],
                //     },
                // }
            },
        loadingFlags:
            {
                loadingDataSources: false,
                loadingDataSource: false,
                loadingRows: false,
                testingDataSource: false,
            },
        testingDataSource: {
            msg: "",
            success: true,
        }
    };

const doReportQueryRowsLoaded = (state, {columns, rows}) => {
    return updateQueryData(state, columns, rows);
};

const doReportQuery = (state) => {
    // we need to createReport {dsId, table and selectedColumns}

    const columns = getSelectedColumns(state);


    console.log(state);
    return reportQuery({
        dsId: getDataSourceId(state),
        tableName: getTable(state),
        columns: columns,
    });

};

// const getVisibleDataSource = (state) => {
//     return state.dataSources[state.visibleDataSource];
// }

const updateQueryData = (state, columns, rows) => {
    return updateVisibleDataSource(state, ["data"], (_) => {
        return {
            columns: columns,
            rows: rows
        };
    });
};

const removeQueryColumn = (state, {columnKey}) => {
    return updateVisibleDataSource(state, ['selectedColumns'], cols => {
        return cols.filter(v => v !== columnKey);
    });
};

const addQueryColumn = (state, {columnKey}) => {
    return updateVisibleDataSource(state, ['selectedColumns'], cols => {
        const cols2 = cols ? cols : [];
        return [...new Set([...cols2, columnKey])]
    });
};

const setLoadingRowsFlag = (state, isLoading) => {
    const newState = Object.assign({}, state);
    newState.loadingFlags.loadingRows = isLoading;
    return newState;
};

const setDataSourcesLoadingFlag = (state, isLoading) => {
    const newState = Object.assign({}, state);
    newState.loadingFlags.loadingDataSources = isLoading;
    return newState;
};

const setDataSourceTestingFlag = (state, isTesting) => {
    const newState = Object.assign({}, state);
    newState.loadingFlags.testingDataSource = isTesting;
    return newState;
};

const setDataSources = (state, {dataSources}) => {
    const newState = Object.assign({}, state);
    newState.dataSources = dataSources;
    return newState;
};

const updateTestingDataSource = (state, {msg, success}) => {
    const newState = Object.assign({}, state);
    newState.testingDataSource = {msg: msg, success: success};

    return newState
};

const updateCreateReport = (state, {dsKey, tableName}) => {
    const newState = Object.assign({}, state);

    let newCreateReport = newState.createReport;
    if (!newCreateReport) {
        newCreateReport = {};
    }

    newState.createReport = newCreateReport;

    if (dsKey) {
        newCreateReport.selectedDataSource = dsKey;
        newCreateReport.selectedTable = "";
    }

    if (tableName) {
        newCreateReport.selectedTable = tableName;
    }

    return newState;
};

const datasourcesReducer = (state = initState, action) => {
    console.log("datasourcesReducer:");
    console.log(action);

    switch (action.type) {
        case CREATE_REPORT_SELECT_DS : {
            return updateCreateReport(state, action);
        }
        case CREATE_REPORT_SELECT_TABLE : {
            return updateCreateReport(state, action);
        }
        case TEST_DATASOURCE_CONNECTION_RESP_OK: {
            return updateTestingDataSource(setDataSourceTestingFlag(state, false), action);
        }
        case TEST_DATASOURCE_CONNECTION_RESP_ERR: {
            return updateTestingDataSource(setDataSourceTestingFlag(state, false), action);
        }
        case TEST_DATASOURCE_CONNECTION: {
            return setDataSourceTestingFlag(state, true)
        }
        case DATASOURCES_LOAD: {
            return setDataSourcesLoadingFlag(state, true);
        }
        case DATASOURCES_LOADED: {
            return setDataSourcesLoadingFlag(setDataSources(state, action), false);
        }
        case DATA_SOURCE_LOAD: {
            return state;
        }
        case DATA_SOURCE_LOADED: {
            return state;
        }
        case REPORT_QUERY_ROWS_LOADED: {
            return doReportQueryRowsLoaded(setLoadingRowsFlag(state, false), action);
        }
        case REPORT_QUERY_POLL: {
            //poll the report query
            action.dispatch(reportQueryPoll(action));
            return setLoadingRowsFlag(state, true);
        }
        case QUERY_COLUMN_ADD: {
            let newState = addQueryColumn(state, action);

            if (action.doReportQuery) {

                newState = setLoadingRowsFlag(newState, true);
                action.dispatch(doReportQuery(newState));
            }

            return newState;
        }
        case QUERY_COLUMN_REMOVE: {
            let newState = removeQueryColumn(state, action);

            if (action.doReportQuery) {
                const columns = getSelectedColumns(newState);
                if(!(columns && columns.length > 0 )) {
                    newState = setLoadingRowsFlag(newState, false);
                    newState = doReportQueryRowsLoaded(newState, {columns: [], rows: []});
                } else {
                    newState = setLoadingRowsFlag(newState, true);
                    action.dispatch(doReportQuery(newState));
                }
            }

            return newState;
        }
        default:
            return state;
    }
};

export default datasourcesReducer;

