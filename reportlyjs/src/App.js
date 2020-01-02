import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import store from './store';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

import Editor from "./tool/editor/Editor"
import DataSourceList from "./tool/datasources/DataSourceList";

import {Provider} from 'react-redux'
import ReportConsole from "./tool/console/ReportConsole";
import Header from "./tool/header/Header";
import {breadCrumb} from "./tool/lib/route";
import CreateReportConsole from "./tool/console/createreport/CreateReportConsole";
import CreateReportConsoleSelectTable from "./tool/console/createreport/CreateReportConsoleSelectTable";

class App extends React.Component {

    render() {

        const crumbHome = {lbl: "Back", to: "/"};

        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <BrowserRouter>
                        <div className="has-padding-top-50">
                            <Route exact path="/" component={ReportConsole}/>
                            <Route exact path="/datasources"
                                   component={breadCrumb(DataSourceList, [crumbHome, {lbl: "Data Sources", to: "/"}])}/>
                            <Route exact path="/create_report_console"
                                   component={breadCrumb(CreateReportConsole, [crumbHome, {
                                       lbl: "Create Report",
                                       to: "/"
                                   }])}/>
                            <Route exact path="/create_report_console/selectTables"
                                   component={breadCrumb(CreateReportConsoleSelectTable,
                                       [crumbHome,
                                           {lbl: "Create Report", to: "/create_report_console"},
                                           {lbl: "Select a Table", to: "/"}])}/>

                            <Route exact path="/editor"
                                   component={breadCrumb(Editor, [crumbHome, {lbl: "Query Editor", to: "/"}])}/>
                        </div>
                    </BrowserRouter>

                </div>
            </Provider>
        );
    }

}

export default App;
