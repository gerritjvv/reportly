/*
 Action Types
 */
import {query} from "./graphql";
import {transLoadDataSourcesResponse} from "./transformers";

export const DATASOURCES_LOAD = "DATASOURCES_LOAD";
export const DATASOURCES_LOADED = "DATASOURCES_LOADED";
export const DATASOURCES_LOAD_ERROR = "LOAD_DATASOURCES_ERROR";

// Report create actions
export const CREATE_REPORT_SELECT_DS = "CREATE_REPORT_SELECT_DS";
export const CREATE_REPORT_SELECT_TABLE = "CREATE_REPORT_SELECT_TABLE";

// data source corresponds to a list of columns that can be queried
export const DATA_SOURCE_LOAD = "DATA_SOURCE_LOAD";
export const DATA_SOURCE_LOADED = "DATA_SOURCE_LOADED";
export const DATA_SOURCE_LOAD_ERROR = "DATA_SOURCE_LOAD_ERROR";

// Loading data for a data source i.e rows for a query
export const REPORT_QUERY_POLL = "REPORT_QUERY_POLL";
export const REPORT_QUERY_ROWS_LOADED = "REPORT_QUERY_ROWS_LOADED";

export const QUERY_COLUMN_ADD = "QUERY_COLUMN_ADD";
export const QUERY_COLUMN_REMOVE = "QUERY_COLUMN_REMOVE";

/*
 Action creators
 */
export const queryReportLoaded = (columns, rows) => ({
        type: REPORT_QUERY_ROWS_LOADED,
        columns: columns,
        rows: rows,
    });

export const reportCreateSelectDataSource = (dsKey) => (
    {
        type: CREATE_REPORT_SELECT_DS,
        dsKey: dsKey,
        tableName: "",
    });
export const reportCreateSelectTable = (tblName) => (
    {
        type: CREATE_REPORT_SELECT_TABLE,
        tableName: tblName,
    });

// will cause the report data to be reloaded
export const addQueryColumn = (columnKey, doReportQuery, dispatch) => ({
    type: QUERY_COLUMN_ADD,
    columnKey: columnKey,
    doReportQuery: doReportQuery,
    dispatch: dispatch,
});
// will cause the report data to be reloaded
export const removeQueryColumn = (columnKey, doReportQuery, dispatch) => ({
    type: QUERY_COLUMN_REMOVE,
    columnKey: columnKey,
    doReportQuery: doReportQuery,
    dispatch: dispatch,
});

// load data source ids and names
export const loadDataSources = () => {
    return (dispatch) => {
        //call datasources
        query(`{
  get_data_sources{
    ... on db_data_source {
      id,
      name
      tables {
        name
        columns {
          as_name
          key
          name
          type
        }
      }
   }
  }
}`).then(({get_data_sources}) => {
            console.log("JSON: ");
            console.log(get_data_sources);

            dispatch({
                type: DATASOURCES_LOADED,
                dataSources: transLoadDataSourcesResponse(get_data_sources)
            });
        }).catch(reason => {
            console.log("ERROR LOADING DataSources");
            console.log(reason);
            dispatch({
                type: DATA_SOURCE_LOADED,
                dataSources: {}
            });
        });
    };
};

export const loadDataSourcesError = error => ({
    type: DATASOURCES_LOAD_ERROR,
    error: error,
});

export const dataSourcesLoaded = (dataSources) => ({
    type: DATASOURCES_LOADED,
    dataSources: dataSources,
});


// load the columns and any other data for a data source so a user can start querying
export const loadDataSource = dsId => ({
    type: DATA_SOURCE_LOAD,
    dsId: dsId,
});

export const loadDataSourceError = (dsId, error) => ({
    type: DATA_SOURCE_LOAD_ERROR,
    dsId: dsId,
    error: error,
});

// data source's columns to query
export const dataSourceLoaded = (dsId, columns) => ({
    type: DATA_SOURCE_LOADED,
    dsId: dsId,
    columns: columns, // [ {key: <str>, name: <str> }]
});
