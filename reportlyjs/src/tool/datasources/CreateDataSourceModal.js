import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';
import {connectModal} from "redux-modal";

import {CREATE_DATASOURCE_MODAL} from '../../tool/modals';
import {checkBox, inputField, inputText} from "../lib/forms";


const CreateDataSourceModal = (props) => {

    const {show, handleHide} = props;

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
                        {inputText("url", "URL", "mydb.cluster.amazon.com", "Publicly accessible database url")}
                        {inputField("port", "PORT", "5432", "Database Port", "number")}
                        {inputText("user", "USER", "readonly user", "The database user to use")}
                        {inputText("password", "PASSWORD", "readonly password", "The database password to use")}
                        {checkBox("tls", "TLS", "If we should use TLS secure", true)}


                    </section>
                    <footer className="modal-card-foot">
                       <nav className="level is-full-width">
                           <div className="level-left">
                              <div className="level-item">
                                  <button className="button is-success">Save</button>
                              </div>
                               <div className="level-item">
                                   <button className="button" onClick={handleHide}>Cancel</button>
                               </div>
                           </div>
                           <div className="level-right">

                               <div className="level-item">
                                   <button className="button is-success">Test Connection</button>
                               </div>
                           </div>
                       </nav>
                    </footer>
                </div>
            </div>
            :
        <span></span>
    );
};


export default connectModal({ name: CREATE_DATASOURCE_MODAL, destroyOnHide: true })(CreateDataSourceModal);
