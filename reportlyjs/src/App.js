import React from 'react';

import './App.css';
import store from './store';

import 'react-bulma-components/dist/react-bulma-components.min.css';

// import Editor from "./tool/editor/Editor"
import DataSourceList from "./tool/datasources/DataSourceList";
import { Provider } from 'react-redux'

class App extends React.Component{

    render () {
        return (
            <Provider store={store}>
                <div>
                    <DataSourceList/>

                </div>
            </Provider>
        );
    }

}

export default App;
