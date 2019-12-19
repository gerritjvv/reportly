/*
 Action Types
 */

import {query} from "./graphql";
import {loadDataSources} from "./actions";

export const TEST_DATASOURCE_CONNECTION = "TEST_DS_CONN"
export const TEST_DATASOURCE_CONNECTION_RESP_OK = "TEST_DS_RESP_OK"
export const TEST_DATASOURCE_CONNECTION_RESP_ERR = "TEST_DS_RESP_ERR"

export const SAVE_DATASOURCE_CONNECTION = "SAVE_DS_CONN"
export const SAVE_DATASOURCE_CONNECTION_RESP_OK = "SAVE_DS_RESP_OK"
export const SAVE_DATASOURCE_CONNECTION_RESP_ERR = "SAVE_DS_RESP_ERR"

export const saveDataSourceConn = ({
                                       name,
                                       user,
                                       password,
                                       port,
                                       url,
                                       tls,
                                       dbType
                                   }) => {
    return (dispatch) => {
        dispatch({type: SAVE_DATASOURCE_CONNECTION});
        query(`mutation {
  save_db_data_source(data_source: {
    name: "${name}"
    db_type: ${dbType}
    user: "${user}"
    password: "${password}"
    port: "${port}"
    ssl: "${tls}"
    url: "${url}"
  }) {
    name
  }
}
`).then((v) => {
            console.log("JSON: ");
            console.log(v);

            dispatch({
                type: SAVE_DATASOURCE_CONNECTION_RESP_OK,
                msg: "Can Connect",
                success: true
            });


        }).catch(reason => {
            console.log("ERROR LOADING DataSources");
            console.log(reason);
            dispatch({
                type: SAVE_DATASOURCE_CONNECTION_RESP_ERR,
                msg: "Error connecting",
                success: false
            });
        }).finally(
            () => loadDataSources()(dispatch)
        );

    };
};

// load data source ids and names
export const testDataSourceConn = ({
                                       name,
                                       user,
                                       password,
                                       port,
                                       url,
                                       tls,
                                       dbType
                                   }, callback) => {
    return (dispatch) => {


        dispatch({type: TEST_DATASOURCE_CONNECTION});
        //call back allows actions like modals to update their displays
        callback();

        //call datasources
        query(`mutation {
  test_db_data_source(data_source: {
    name: "${name}"
    db_type: ${dbType}
    user: "${user}"
    password: "${password}"
    port: "${port}"
    ssl: "${tls}"
    url: "${url}"
  }) {
    name
  }
}
`).then((v) => {
            console.log("JSON: ");
            console.log(v);

            dispatch({
                type: TEST_DATASOURCE_CONNECTION_RESP_OK,
                msg: "Can Connect",
                success: true
            });
        }).catch(reason => {
            console.log("ERROR LOADING DataSources");
            console.log(reason);
            dispatch({
                type: TEST_DATASOURCE_CONNECTION_RESP_ERR,
                msg: "Error connecting",
                success: false
            });
        }).finally(callback);
    };
};

