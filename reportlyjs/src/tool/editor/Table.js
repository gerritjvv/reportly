import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';

const styles = {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
}

const renderHeaderCol = (column, index) => {
    return <th style={styles} className="has-max-width-200" key={index}>{column}</th>
};

const renderRowValue = (v, index) => {
    return <td style={styles} className="has-max-width-200 is-scrollable" key={index}>{v}</td>
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
            <table className="table is-bordered is-striped is-narrow is-scrollable is-hoverable is-fullwidth"
            >
                {renderHeader(props.data.columns)}
                {renderRows(props.data.data)}
            </table>
        </div>
    );
};

export default table;
