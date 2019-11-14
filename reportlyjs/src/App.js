import React from 'react';
import './App.css';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import ColumnList from "./tool/column/ColumnList"

class App extends React.Component{

    state = {
        columns: [{key:"name", display:"Name"},
            {key:"date", display:"Date"},
            {key:"fmid", display:"Flight Media"},
            {key:"cid", display:"Campaign"}]
    }

     renderColumns = () => {
        return <ColumnList columns={this.state.columns}/>
    }
    render () {
        return (
            <div className="tile is-ancestor is-fullheight">
                <div className="tile is-parent is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">

                            <div className="tile is-child">
                                <div className="tile">
                                    <div className="tile is-vertical is-parent">
                                        <div className="tile is-child box">
                                            <div className="level">
                                                <div className="level-left">
                                                    <div className="level-item"> <p>Hi</p></div>
                                                    <div className="level-item"> <p>Hi</p></div>

                                                </div>
                                                <div className="level-right">
                                                    <div className="level-item"> <p>Hi</p></div>
                                                    <div className="level-item"> <p>Hi</p></div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tile is-child box">
                                            <p className="title">Vertical tiles</p>
                                            <p>Bottom Box</p>
                                        </div>
                                    </div>
                                    <div className="tile is-parent">
                                        <div className="tile is-child box">
                                            <p className="title">Middle box</p>
                                            <p>With an image</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tile is-child">
                                <div className="tile">
                                    <div className="tile is-parent">
                                        <div className="tile is-child box">
                                            <p className="title">Wide Column</p>
                                            <p>Aligned with the right column</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="tile is-parent">
                    <div className="tile">
                        <div className="tile is-parent">
                            <div className="tile is-child box">
                                <p className="title">Tall column</p>
                                <p>


                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.

                                    Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.

                                    Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default App;
