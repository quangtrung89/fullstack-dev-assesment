import {connect,} from 'react-redux';

import Dashboard from '../components/Dashboard';
import campaignActions from 'Campaign/actions';

const mapStateToProps = state => ({
  campaigns: state.campaignReducer.campaigns,
});

export default connect(mapStateToProps, {
  fetchAllCampaigns: campaignActions.fetchAllCampaigns,
  selectCampaign: campaignActions.selectCampaign,
})(Dashboard);
