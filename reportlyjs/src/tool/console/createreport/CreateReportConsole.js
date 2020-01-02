import React from "react";
import {getDataSourceStateFromStore, getDataSources, isLoadingDataSources} from "../../../store/selectors/selectors";
import {loadDataSources, reportCreateSelectDataSource} from "../../../store/actions";
import {connect} from "react-redux";
import {routeTo} from "../../lib/route";

class CreateReportConsole extends React.Component {

    route = routeTo(this.props);

    componentDidMount() {
        this.props.loadDataSources();
    }

    selectDataSource = (dsKey) => {
        this.props.selectDataSource(dsKey);
        this.route("/create_report_console/selectTables")();
    };

    render() {
        const {dataSources, isLoadingDataSources} = this.props

        console.log(">>>>> CreateReportConsole: ");
        console.log({
            dataSources: Object.keys(dataSources).length,
            isLoadingDataSources: isLoadingDataSources,
        });

        if (isLoadingDataSources) {
            return (
                <div className="container is-centered">
                    <button className="button is-link is-loading">Loading Data Sources</button>
                </div>
            );
        } else if (dataSources && Object.keys(dataSources).length > 0) {
            return this.showDataSourcesTable(dataSources);
        } else {

            return (
                <div className="container is-centered">
                    <section className="section">
                        <div className="columns">
                            <div className="column is-2">
                            </div>
                            <div className="column subtitle is-centered">
                                <button className="button is-rounded is-outlined is-primary  is-large"
                                        onClick={this.route("/datasources")}
                                >
                                    Connect to a Data Source
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }

    showDataSourcesTable(dataSources) {
        return (
            <div className="container box is-full-width has-min-height-350">
                <table className="table is-full-width is-hoverable is-striped">
                    <thead>
                    <tr>
                        <th className="i">Select a Data Source</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(dataSources).map(dsKey => {
                        return (
                            <tr key={dsKey}>
                                <td>
                                    <button className="button has-text-link is-borderless" onClick={ () => this.selectDataSource(dsKey)}>{dsKey}</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}


// redux map the store values to the props of Editor
const mapStateToProps = store => {

    const state = getDataSourceStateFromStore(store);

    return {
        isLoadingDataSources: isLoadingDataSources(state),
        dataSources: getDataSources(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDataSources: () => dispatch(loadDataSources()),
        selectDataSource: (dsKey) => dispatch(reportCreateSelectDataSource(dsKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportConsole);
