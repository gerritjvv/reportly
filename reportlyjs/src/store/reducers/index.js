import {combineReducers} from 'redux';

import {reducer as modal} from 'redux-modal';
import datasourcesReducer from './datasources';

const reducer = (state, action) => {
    return modal(datasourcesReducer(state, action), action);
}

export default combineReducers({editor: reducer})
