import {connect,} from 'react-redux';

import CampaignDetails from '../components/CampaignDetails';
import campaignActions from 'Campaign/actions';

const mapStateToProps = state => ({
  selectedCampaignId: state.campaignReducer.selectedCampaignId,
  selectedCampaign: state.campaignReducer.selectedCampaign,
});

export default connect(mapStateToProps, {
  getDetails: campaignActions.fetchCampaignDetails,
  selectCampaign: campaignActions.selectCampaign,
})(CampaignDetails);
