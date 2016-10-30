// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dashboard from './containers/dashboard/reducer';

const rootReducer = combineReducers({
  dashboard,
  routing
});

export default rootReducer;
