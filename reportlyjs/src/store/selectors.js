


// returns the data store object currently visible
// {:columns, :selectedColumns, :data}
export const getVisibleDataSource = store =>
    store.editor.dataSources[store.editor.visibleDataSource];

// return a set of {:key, :name} columns
export const getSelectedColumns = store => {

    const dataSource = getVisibleDataSource(store);
    const columns = dataSource.columns;

    return dataSource.selectedColumns.map( k => columns[k]);
};


// get a list of [{:key, :name}] columns
export const getColumns = store => {
    const dataSource = getVisibleDataSource(store);
    return Object.values(dataSource.columns);
}

export const getData = store => {
    const dataSource = getVisibleDataSource(store);
    console.log(dataSource);

    return dataSource.data
}

