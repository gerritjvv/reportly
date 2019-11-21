import {Map, Set} from 'immutable';

// returns the datasources reducer state see index.js
export const getDataSourceStateFromStore = store => {
    return store.editor
}

// returns the data store object currently visible
// {:columns, :selectedColumns, :data}
export const getVisibleDataSource = state =>
    state.dataSources[state.visibleDataSource];

// return a set of {:key, :name} columns
export const getSelectedColumns = state => {

    const dataSource = getVisibleDataSource(state);
    const columns = dataSource.columns;

    return dataSource.selectedColumns.map( k => columns[k]);
};


// get a list of [{:key, :name}] columns
export const getColumns = state => {
    const dataSource = getVisibleDataSource(state);
    return Object.values(dataSource.columns);
}

// get the columns that should be shown to select on the left hand side
// for the user
export const getShowableColumns = state => {
    const dataSource = getVisibleDataSource(state);
    const selectedCols = Set(dataSource.selectedColumns);
    return Object.values(dataSource.columns).filter( c => !selectedCols.has(c.key));
}

export const getData = state => {
    const dataSource = getVisibleDataSource(state);

    return dataSource.data
}

/* Updaters */

// updates the visible dataSource in state and returns a new state
// always returns a JS object, f is a function that takes the current value
export const updateVisibleDataSource = (state, ks, f) => {
    const s = Map(state);

    return s.updateIn(['dataSources', state.visibleDataSource,...ks], f)
        .toJS();
}
