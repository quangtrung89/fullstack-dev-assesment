import {handleActions,} from 'redux-actions';

const defaultState = {
  campaigns: [],
  selectedCampaignId: null,
  selectedCampaign: null, // will be fetched from the above id. This makes the store more adaptive to future api changes
  error: null,
};

const campaignReducer = handleActions({
  FETCH_ALL_CAMPAIGNS_SUCCESS: (state, action) => ({
    ...state,
    campaigns: action.payload,
  }),
  FETCH_ALL_CAMPAIGNS_ERROR: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  SELECT_CAMPAIGN: (state, action) => ({
    ...state,
    selectedCampaignId: action.payload || null,
    selectedCampaign: state.selectedCampaignId !== action.payload ? null : state.selectedCampaign,
  }),
  FETCH_CAMPAIGN_DETAILS_SUCCESS: (state, action) => ({
    ...state,
    selectedCampaign: action.payload,
  }),
  FETCH_CAMPAIGN_DETAILS_ERROR: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  REMOVE_ERROR: (state, action) => ({
    ...state,
    error: null,
  }),
}, defaultState);

export default campaignReducer;
