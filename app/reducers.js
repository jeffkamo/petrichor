// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import battlefield from './containers/battlefield/reducer';
import dashboard from './containers/dashboard/reducer';

const rootReducer = combineReducers({
  battlefield,
  dashboard,
  routing
});

export default rootReducer;
