import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import {connectModal} from "redux-modal";

import {CREATE_DATASOURCE_MODAL} from '../../tool/modals';
import {checkBox, inputField, inputText, selectInput} from "../lib/forms";

import PropTypes from 'prop-types';

class CreateDataSourceModal extends React.Component {


    static propTypes = {
        testDataSource: PropTypes.func,
        saveDataSource: PropTypes.func,
    }

    dbTypes = [
        {value: "mysql", text: "MySQL"},
        {value: "postgres", text: "Postgres"},
        {value: "athena", text: "Athena"},
    ];

    state = {
        tls: true,
        didSendTest: false
    };

    // toggles the TLS checkbox
    onTLSChange = (e) => {
        const tls = this.state.tls;
        this.setState({tls: !tls});
    };

    // returns a change listener that saves the target.value to the
    // state under the key k
    changeHandler = (k) => {
        return (e) => {
            this.setState({[k]: e.target.value})
        };
    };

    handleSave = () => {
        this.props.saveDataSource(this.createDataSourceObject());
        const {handleHide} = this.props;
        handleHide();
    };

    testConnection = () => {


        this.setState({didSendTest: true});

        this.props.testDataSource(this.createDataSourceObject());
    };


    createDataSourceObject = () => {
        const {
            name,
            user,
            password,
            port,
            url,
            tls,
            dbType,
        } = this.state;

        const dbType2 = dbType ? dbType : "MYSQL";

        return {
            name: name,
            user: user,
            password: password,
            port: port,
            url: url,
            tls: tls,
            dbType: dbType2
        };
    };

    render() {
        const tls = this.state.tls;
        const {show, handleHide, testingDataSource} = this.props;

        const testConnClasses = ["button", "is-success"];

        if (this.props.testingDataSourceFlag) {
            testConnClasses.push("is-loading");
        }

        let succesMessage = "";

        if (this.state.didSendTest && testingDataSource) {
            succesMessage = testingDataSource.success ? "Success" : testingDataSource.msg
        }

        return (
            show ?
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Connect to a new Data Source</p>
                            <button className="delete" aria-label="close" onClick={handleHide}></button>
                        </header>
                        <section className="modal-card-body">
                            {inputText("name", "NAME", "my database", "A friendly name", this.changeHandler("name"), {required: true})}
                            {selectInput("type", "DB Type", this.dbTypes, this.changeHandler("dbType"))}
                            {inputText("url", "URL", "mydb.cluster.amazon.com", "Publicly accessible database url", this.changeHandler("url"), {required: true})}
                            {inputField("port", "PORT", "5432", "Database Port", "number", this.changeHandler("port"), {required: true})}
                            {inputText("user", "USER", "readonly user", "The database user to use", this.changeHandler("user"), {required: true})}
                            {inputText("password", "PASSWORD", "readonly password", "The database password to use", this.changeHandler("password"), {required: true})}
                            {checkBox("tls", "TLS", tls, this.onTLSChange)}


                        </section>
                        <footer className="modal-card-foot">
                            <nav className="level is-full-width">
                                <div className="level-left">
                                    <div className="level-item">
                                        <button className="button is-success" onClick={this.handleSave}>Save</button>
                                    </div>
                                    <div className="level-item">
                                        <button className="button" onClick={handleHide}>Cancel</button>
                                    </div>
                                </div>
                                <div className="level-left">
                                    <div className="level-item is-clipped">
                                        {succesMessage}
                                    </div>
                                </div>
                                <div className="level-right">

                                    <div className="level-item">
                                        <button className={testConnClasses.join(" ")} onClick={this.testConnection}>Test
                                            Connection
                                        </button>
                                    </div>
                                </div>
                            </nav>
                        </footer>

                    </div>
                </div>
                :
                <span></span>
        );
    }
};

export default connectModal({
    name: CREATE_DATASOURCE_MODAL,
    destroyOnHide: true,
    getModalState: (state) => state.editor
})(CreateDataSourceModal);
