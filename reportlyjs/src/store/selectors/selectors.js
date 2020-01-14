import {Map, Set} from 'immutable';
import {or} from "../../tool/utils/libs";

const defaultDataTemplate = {rows: [], columns: []};

// returns the datasources reducer state see index.js
export const getDataSourceStateFromStore = store => {
    return store.editor
};

export const getDataSources = state => {
    return state.dataSources;
};

export const isLoadingDataSources = (state) => {
    return state.loadingFlags.loadingDataSources;
};

/**
 * Return a virtual datasource for the query editor
 *  it contains selectedColumns, data:{:columns, rows:}, and columns}
 *  columns is taken from the dataSources using: createReport.selectedDataSource and createReport.selectedTable
 *
 *  Columns: the columns attribute is a map keyed on the column key.
 *           the editor expects this, so we transform the table.columns array into a map
 * @param state
 * @returns {{selectedColumns: *, data: *, columns: {}, table: *, dsId: *}}
 */
export const getVisibleEditorDataSource = state => {

    const createReportState = state.createReport;

    let retObj = {
        dsId: "",
        table: "",
        columns: {},
        selectedColumns: or(createReportState.selectedColumns, []),
        data: or(createReportState.data, defaultDataTemplate)};

    // only if we have a ds and table selected do we set the columns
    if(state.createReport.selectedDataSource &&
        state.createReport.selectedTable) {
        const ds = state.dataSources[state.createReport.selectedDataSource];
        const table = ds.tables[createReportState.selectedTable];

        // transform the columns array into a map
        let colMap = {};
        table.columns.forEach( c => colMap[c.key] = c);

        retObj.dsId = state.createReport.selectedDataSource;
        retObj.table = table.name;
        retObj.columns = colMap;
    }

    return retObj;
};

// return a set of {:key, :name} columns
export const getSelectedColumns = state => {

    const dataSource = getVisibleEditorDataSource(state);
    const columns = dataSource.columns;

    return dataSource.selectedColumns.map( k => columns[k]);
};


// get the columns that should be shown to select on the left hand side
// for the user
export const getShowableColumns = state => {
    const dataSource = getVisibleEditorDataSource(state);

    const selectedCols = dataSource.selectedColumns ? Set(dataSource.selectedColumns) : Set();
    return Object.values(dataSource.columns).filter( c => !selectedCols.has(c.key));
};


export const getDataSourceId = state => {
    const dataSource = getVisibleEditorDataSource(state);

    return dataSource.dsId;
};
export const getTable = state => {
    const dataSource = getVisibleEditorDataSource(state);

    return dataSource.table;
};

export const getData = state => {
    const dataSource = getVisibleEditorDataSource(state);

    console.log("Caling get DAta in selectors on:");
    console.log(dataSource);

    return dataSource.data
};

/* Updaters */

// updates the visible dataSource in state and returns a new state
// always returns a JS object, f is a function that takes the current value
export const updateVisibleDataSource = (state, ks, f) => {

    const s = Map(state);

    return s.updateIn(['createReport',...ks], f)
        .toJS();
};
