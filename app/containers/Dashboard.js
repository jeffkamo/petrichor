// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from '../actions/dashboard';
import Dashboard from '../components/dashboard/Dashboard';

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DashboardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
