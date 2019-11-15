import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';

const renderHeaderCol = (column, index) => {
    return <th key={index}>{column}</th>
};

const renderRowValue = (v, index) => {
    return <td key={index}>{v}</td>
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

const renderRows = (data) => {
    return (
        <tbody>
        {data.map((row, index) => <tr key={index}>{row.map(renderRowValue)}</tr>)}
        </tbody>
    );
};

const table = (props) => {
    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                {renderHeader(props.data.columns)}
                {renderRows(props.data.data)}
            </table>
        </div>
    );
};

export default table;
