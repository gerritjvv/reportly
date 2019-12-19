import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import {connect} from "react-redux";
import {show} from 'redux-modal'

import DataSources from "./DataSources";
import {getDataSourceStateFromStore} from "../../store/selectors";
import {loadDataSources} from "../../store/actions";
import {testDataSourceConn, saveDataSourceConn} from "../../store/createDataSourceActions";

import {CREATE_DATASOURCE_MODAL} from '../../tool/modals';
import CreateDataSourceModal from "./CreateDataSourceModal";

/*
 Show the DataSources downloaded form the grpahql server
 Relies on state:
  testingDataSource: {
            msg: "",
            success: true,
        },
  CreateDataSourceModal { show},

  for the CreateDataSourceModal
 */

class DataSourceList extends React.Component {

    componentDidMount() {
        this.props.loadDataSources();
    }

    testDataSource = (ds) => {
      this.props.testDataSource(ds, this.showCreateDataSource);
    };

    saveDataSource = (ds) => {
        this.props.saveDataSource(ds);
    };

    showCreateDataSource = () => {
        this.props.show(CREATE_DATASOURCE_MODAL, {
            saveDataSource: this.saveDataSource,
            testDataSource: this.testDataSource,
            testingDataSourceFlag: this.props.testingDataSourceFag,
            testingDataSource: this.props.testingDataSource,
        });
    };

    shouldShowCreateDataSourceModal = () => {
        return this.props.createDataSourceModalState && this.props.createDataSourceModalState.show
    };

    render() {

        const dataSources = this.props.dataSources;

        return (
            <article className="panel is-primary">
                <div className="panel-heading">
                    <button className="button is-primary" onClick={this.showCreateDataSource}>Create</button>
                </div>
                <div className="panel-block is-full-width">
                    <DataSources dataSources={dataSources}/>
                    {this.shouldShowCreateDataSourceModal() ? <CreateDataSourceModal/> : <span></span>}
                </div>
            </article>);
    }

}

// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    return {
        dataSources: state.dataSources,
        testingDataSourceFlag: state.loadingFlags.testingDataSource,
        testingDataSource: state.testingDataSource,
        createDataSourceModalState: state.CreateDataSourceModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDataSources: () => dispatch(loadDataSources()),
        show: (name, props) => dispatch(show(name, props)),
        saveDataSource: (ds) => dispatch(saveDataSourceConn(ds)),
        testDataSource: (ds, callback) => dispatch(testDataSourceConn(ds, callback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSourceList);
