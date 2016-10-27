// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dashboard from './dashboard';

const rootReducer = combineReducers({
  dashboard,
  routing
});

export default rootReducer;
