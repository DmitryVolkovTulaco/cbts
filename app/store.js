import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import home from './home/home.reducers';
import common from './common/common.reducers';

import loggerMiddleware from './common/middleware/logger.middleware';
import apiMiddleware from './common/middleware/api.middleware';

const allReducers = combineReducers({
    home,
    common
});

export default createStore(
    allReducers,
    applyMiddleware(apiMiddleware, loggerMiddleware, thunk)
);
