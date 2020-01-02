import {getDataSources} from "./selectors";

export const getCreateReportSelectedDSName = (state) => {
    return state.createReport.selectedDataSource;
};

export const getCreateReportSelectedTableName = (state) => {
    const ds = getCreateReportSelectedDSName(state);
    return ds ? state.createReport.selectedTable : "";
};

export const getCreateReportSelectedDS = (state) => {
    const dsName = getCreateReportSelectedDSName(state);

    const dss = getDataSources(state);
    return dss ? dss[dsName] : {};
};

export const getCreateReportSelectedDSTables = (state) => {
  const ds = getCreateReportSelectedDS(state);
  return ds ? ds.tables : {};
};

export const getCreateReportSelectedTable = (state) => {

    const tables = getCreateReportSelectedDSTables(state);
    return tables ? tables[getCreateReportSelectedTableName(state)] : {};
};
