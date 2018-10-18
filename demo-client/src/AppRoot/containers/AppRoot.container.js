import {connect,} from 'react-redux';
import { withRouter, } from 'react-router-dom';

import AppRoot from '../components/AppRoot';
import campaignActions from 'Campaign/actions';

const mapStateToProps = state => ({
  error: state.campaignReducer.error,
});

export default withRouter(connect(mapStateToProps, {
  removeError: campaignActions.removeError,
})(AppRoot));
