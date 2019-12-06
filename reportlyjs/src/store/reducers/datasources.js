import {
    DATASOURCES_LOAD,
    DATASOURCES_LOADED,
    DATA_SOURCE_LOAD,
    DATA_SOURCE_LOADED,
    ROWS_LOADED,
    ROWS_LOAD, QUERY_COLUMN_ADD, QUERY_COLUMN_REMOVE,
} from '../actions';

import {updateVisibleDataSource} from '../selectors';

const initState =
    {
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
            }
    };


// const getVisibleDataSource = (state) => {
//     return state.dataSources[state.visibleDataSource];
// }

const removeQueryColumn = (state, {columnKey}) => {
    return updateVisibleDataSource(state, ['selectedColumns'], cols => {
        return cols.filter(v => v !== columnKey);
    });
};

const addQueryColumn = (state, {columnKey}) => {
    return updateVisibleDataSource(state, ['selectedColumns'], cols => {
        return [...new Set([...cols, columnKey])]
    });
};

const setDataSourcesLoadingFlag = (state, isLoading) => {
    const newState = Object.assign({}, state);
    newState.loadingFlags.loadingDataSources = isLoading;
    return newState;
};

const setDataSources = (state, {dataSources}) => {
    const newState = Object.assign({}, state);
    newState.dataSources = dataSources;
    return newState;
};

const datasourcesReducer = (state = initState, action) => {
    console.log("datasourcesReducer:");
    console.log(action);

    switch (action.type) {
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
        case ROWS_LOAD: {
            return state;
        }
        case ROWS_LOADED: {
            return state;
        }
        case QUERY_COLUMN_ADD: {
            return addQueryColumn(state, action);
        }
        case QUERY_COLUMN_REMOVE: {
            return removeQueryColumn(state, action);
        }
        default:
            return state;
    }
};

export default datasourcesReducer;

