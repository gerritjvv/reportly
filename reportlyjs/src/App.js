import React from 'react';
import './App.css';
import store from './store';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Editor from "./tool/editor/Editor"
import { Provider } from 'react-redux'

class App extends React.Component{

    render () {
        return (
            <Provider store={store}>
                <Editor/>
            </Provider>
        );
    }

}

export default App;
