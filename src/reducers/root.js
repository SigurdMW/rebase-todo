import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tasks from './tasks';
import filters from './filters';

const rootReducer = combineReducers({ tasks, filters, routing: routerReducer });

export default rootReducer;