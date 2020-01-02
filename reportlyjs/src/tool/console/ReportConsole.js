import React from "react";
import {withRouter} from 'react-router-dom';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import {routeTo} from "../lib/route";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCubes} from "@fortawesome/free-solid-svg-icons";


const reportConsole = (props) => {

    const route = routeTo(props);

    return (
        <div className="container">
            <div className="columns is-fullheight has-min-height-350">
                <div className="column is-4">
                    <div className="container box is-full-width has-min-height-350">
                        <table className="table is-full-width is-hoverable">
                            <thead>
                            <tr>
                                <th className="i">Name</th>
                                <th className="is-narrow">Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>-- Test report ---</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column has-min-height-350">
                    <div className="container is-pulled-right ">
                        <FontAwesomeIcon icon={faCubes} size="4x"/>

                    </div>
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-2">
                                </div>
                                <div className="column subtitle is-centered">
                                    <button className="button is-rounded is-outlined is-primary  is-large"
                                            onClick={route("/datasources")}
                                    >
                                        Connect to a Data Source
                                    </button>
                                </div>
                            </div>
                        </section>
                        <section className="section">
                            <div className="columns">
                                <div className="column is-2">
                                    {/*<FontAwesomeIcon icon={faColumns}/>*/}
                                </div>
                                <div className="column subtitle is-centered">
                                    <button className="button is-rounded is-outlined is-primary  is-large"
                                            onClick={route("/create_report_console")}
                                    >
                                        Create a Report
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default withRouter(reportConsole);
