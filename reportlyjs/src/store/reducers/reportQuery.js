import {query} from "../graphql";
import uuid from "uuid";
import {queryReportLoaded, queryReportLoadError, REPORT_QUERY_POLL} from "../actions";
import {sleep} from "../../tool/utils/libs";


export const reportQueryPoll = ({id}) => {

    return (dispatch) => {

        query(`
    query {
      report_query_poll(report_query_id: "${id}"
      ){
        status,
        msg,
        columns,
        rows
        
      }
    }
    `).then(({report_query_poll}) => {
            console.log("JSON: ");
            console.log(report_query_poll);
            const {status, msg, columns, rows} = report_query_poll;

            if(status === "INPROGRESS") {
                sleep(1000).then( () => dispatch({
                    type: REPORT_QUERY_POLL,
                    id: id,
                    dispatch: dispatch
                }));
            } else if (status === "ERROR"){
                console.log("ERROR");
                dispatch(queryReportLoadError(msg));
            }
            else {
                dispatch(queryReportLoaded(columns, rows));
            }

        }).catch(reason => {
            console.log("ERROR POLLING");
            console.log(reason);
            dispatch(queryReportLoadError(reason));
        });
    };
};

// load the data based on a
// columns must contain: {:key :name: :as_name :type}
export const reportQuery = ({dsId, tableName, columns}) => {

    return (dispatch) => {

        //call datasources
        const id = uuid.v4();
        const columnsJson = JSON.stringify(columns).replace(/"([^(")"]+)":/g,"$1:");

        query(`
    query {
  report_query (report:  {
    report_id: "${id}",
    report_request: {
      data_source_id: "${dsId}",
      tables: [
        {name: "${tableName}",
         columns: ${columnsJson}
         }
      ]
    }
  } 
  ){
     id,
   } 
  }
    `).then(({report_query}) => {
            console.log("JSON: ");
            console.log(report_query);
            const {id} = report_query;

            dispatch({
                type: REPORT_QUERY_POLL,
                id: id,
                dispatch: dispatch
            });
        }).catch(reason => {
            console.log("ERROR REPORT_QUERY_POLL");
            console.log(reason);
            dispatch(queryReportLoadError(reason));
        });
    };

};
