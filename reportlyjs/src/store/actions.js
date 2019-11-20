/*
 Action Types
 */

export const DATASOURCES_LOAD = "DATASOURCES_LOAD"
export const DATASOURCES_LOADED = "DATASOURCES_LOADED"

export const DATASOURCES_LOAD_ERROR = "LOAD_DATASOURCES_ERROR"


// data source corresponds to a list of columns that can be queried
export const DATA_SOURCE_LOAD = "DATA_SOURCE_LOAD";
export const DATA_SOURCE_LOADED = "DATA_SOURCE_LOADED";
export const DATA_SOURCE_LOAD_ERROR = "DATA_SOURCE_LOAD_ERROR";

// Loading data for a data source i.e rows for a query
export const ROWS_LOAD = "ROWS_LOAD";
export const ROWS_LOADED = "ROWS_LOADED";
export const ROWS_LOAD_ERROR = "ROWS_LOAD_ERROR";

/*
 Action creators
 */

// load data source ids and names
export const loadDataSources = () => ({
    type: DATASOURCES_LOAD,
});

export const loadDataSourcesError = error => ({
    type: DATASOURCES_LOAD_ERROR,
    error: error,
});

// data sources loaded, expect [{id:, name:}]
export const dataSourcesLoaded = (dataSources) => ({
    type: DATASOURCES_LOADED,
    dataSources: dataSources, //must be [ {id: str, name: str} ]
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
})

// load the data based on a
export const loadDataSourceRows = (dsId, columnsKeys) => ({
    type: ROWS_LOAD,
    dsId: dsId,
    columns: columnsKeys, // [key1, key2, ... ]
});

export const dataSourceRowsLoaded = (dsId, columns, rows) => ({
    type: ROWS_LOADED,
    dsId: dsId,
    columns: columns, // [ col1, col2, ... ]
    rows: rows, // [ [v1, v2, ... ] ]
});

export const loadDataSourceRowsError = (dsId, error) => ({
    type: ROWS_LOAD_ERROR,
    dsId: dsId,
    error: error,
});
