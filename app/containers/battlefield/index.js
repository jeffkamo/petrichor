// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as battlefieldActions from './actions'
import Battlefield from '../../components/battlefield'

function mapStateToProps(state) {
    return {
        battlefield: state.battlefield
    }
}

function mapDispatchToProps(dispatch) {
      return bindActionCreators(battlefieldActions, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Battlefield)
