import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';


const styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}

const renderHeaderCol = (column, index) => {
    return <th style={styles} className="has-max-width-200" key={index}>{column}</th>
};

const renderRowValue = (id, {name}) => {
    return (
        <tr key={id}>
            <td style={styles} className="has-max-width-200 is-scrollable" key={id}>{name}</td>
            <td style={styles} className="has-max-width-200 is-scrollable">---</td>
        </tr>
    );
};

const renderRows = (dataSources) => {
    return (
        <tbody>
        {Object.keys(dataSources).map(id => renderRowValue(id, dataSources[id]))}
        </tbody>
    );
};

const renderHeader = (columns) => {
    return (
        <thead>
        <tr key="header">
            {columns.map(renderHeaderCol)}
        </tr>
        </thead>
    );
};


// Show the DataSources downloaded form the grpahql server and stored in the state store.
// stored as {"id" {name "name" ...}}
const DataSources = ({dataSources}) => {

    console.log("dAtasources: ");
    console.log(dataSources);

    return (
        <div className="table-container is-full-width">
            <table className="table is-bordered is-striped is-narrow is-scrollable is-hoverable is-fullwidth"
            >
                {renderHeader(["Name", "Options"])}
                {renderRows(dataSources)}
            </table>
        </div>
    );

};



export default DataSources;
