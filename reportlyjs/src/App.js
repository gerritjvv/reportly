import React from 'react';
import './App.css';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Editor from "./tool/editor/Editor"

class App extends React.Component{

    render () {
        return (
            <Editor/>
        );
    }

}

export default App;
