import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import {connect} from "react-redux";
import {show} from 'redux-modal'

import DataSources from "./DataSources";
import {getDataSourceStateFromStore} from "../../store/selectors";
import {loadDataSources} from "../../store/actions";
import {CREATE_DATASOURCE_MODAL} from '../../tool/modals';
import CreateDataSourceModal from "./CreateDataSourceModal";

// Show the DataSources downloaded form the grpahql server
class DataSourceList extends React.Component {

    componentDidMount() {
        this.props.loadDataSources();
    }

    showCreateDataSource = () => {
        console.log("Create DataSource");
        this.props.show(CREATE_DATASOURCE_MODAL);
    }

    render() {
        const dataSources = this.props.dataSources;
        return (
            <article className="panel is-primary">
                <div className="panel-heading">
                    <button className="button is-primary" onClick={this.showCreateDataSource}>Create</button>
                </div>
                <div className="panel-block is-full-width">
                    <DataSources dataSources={dataSources}/>
                    <CreateDataSourceModal dispatch={this.props.dispatch}/>
                </div>
            </article>);
    }

}

// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    return {
        dataSources: state.dataSources,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDataSources: () => dispatch(loadDataSources()),
        show: (name) => dispatch(show(name, {})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSourceList);
