import {combineReducers} from 'redux';

import {reducer as modal} from 'redux-modal'
import datasourcesReducer from './datasources';

export default combineReducers({editor: datasourcesReducer, modal: modal})
