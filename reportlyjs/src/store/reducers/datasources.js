import {
    DATASOURCES_LOAD,
    DATASOURCES_LOADED,
    DATA_SOURCE_LOAD,
    DATA_SOURCE_LOADED,
    ROWS_LOADED,
    ROWS_LOAD,
} from '../actions';

const initState =
    {

        visibleDataSource: "default",
        dataSources:
            {
                "default": {
                    columns: {"A": {key: "A", name: "NameA"},
                              "date": {key: "date", name: "Date"},
                              "fmid": {key: "fmid", name: "Flight Media"},
                              "cid": {key: "cid", name: "Campaign"},
                    },
                    // a set of selected column keys that map to the columns
                    selectedColumns: [],
                    data: {
                        columns: ["date", "Flight Media", "Campaign"],
                        rows: [
                            ["2019-02-01", "1", "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"],
                            ["2019-02-01", "1", "2"],
                            ["2019-02-01", "1", "2"],
                            ["2019-02-01", "1", "2"],
                        ],
                    },
                }
            },
        loadingFlags:
            {
                loadingDataSources: false,
                loadingDataSource: false,
                loadingRows: false,
            }
    };


const datasourcesReducer = (state = initState, action) => {
    switch (action.type) {
        case DATASOURCES_LOAD: {
            return state.updateIn(['loadingFlags', 'loadingDataSources'], true);
        }
        case DATASOURCES_LOADED: {
            return state.updateIn(['loadingFlags', 'loadingDataSources'], false);
        }
        case DATA_SOURCE_LOAD: {
            return state.updateIn(['loadingFlags', 'loadingDataSource'], true);
        }
        case DATA_SOURCE_LOADED: {
            return state.updateIn(['loadingFlags', 'loadingDataSource'], false);
        }
        case ROWS_LOAD: {
            return state.updateIn(['loadingFlags', 'loadingRows'], false);
        }
        case ROWS_LOADED: {
            return state.updateIn(['loadingFlags', 'loadingRows'], false);
        }
        default:
            return state;
    }
};

export default datasourcesReducer;

