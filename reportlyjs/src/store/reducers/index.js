import {combineReducers} from 'redux';

import datasourcesReducer from './datasources';

export default combineReducers({editor:datasourcesReducer})
