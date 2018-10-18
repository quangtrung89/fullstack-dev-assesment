import campaignActions from './actions';
import { createSaga, } from 'utils/createSaga';
import api from 'api';

export function * fetchAllCampaigns(action, handler) {
  yield createSaga(action, handler);
}

export function * fetchCampaignDetail(action, handler) {
  yield createSaga(action, handler);
}

export default [
  fetchAllCampaigns(campaignActions.FETCH_ALL_CAMPAIGNS, api.campaigns.fetchAllCampaigns),
  fetchCampaignDetail(campaignActions.FETCH_CAMPAIGN_DETAILS, api.campaigns.fetchCampaignDetails),
];
