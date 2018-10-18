import reducer from '../reducers';
import { expect, } from 'chai';
import {actionLabels,} from '../actions';
import campaignActions from '../actions';

const defaultState = {
  campaigns: [],
  selectedCampaignId: null,
  selectedCampaign: null, // will be fetched from the above id. This makes the store more adaptive to future api changes
  error: null,
};

describe('Campaign/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(defaultState);
  });
  it('should handle FETCH_ALL_CAMPAIGNS_SUCCESS', () => {
    const fetchAllActionSuccess = {
      type: actionLabels.FETCH_ALL_CAMPAIGNS_SUCCESS,
      payload: [{id: 1,},],
    };
    expect(reducer({}, fetchAllActionSuccess)).to.deep.equal({campaigns: [{id: 1,},],});
  });
  it('should handle FETCH_ALL_CAMPAIGNS_ERROR', () => {
    const fetchAllActionError = {
      type: actionLabels.FETCH_ALL_CAMPAIGNS_ERROR,
      payload: {message: 'error not found',},
    };
    expect(reducer({}, fetchAllActionError)).to.deep.equal({error: {message: 'error not found',},});
  });
  it('should handle SELECT_CAMPAIGN', () => {
    const selectCampaign = {
      type: actionLabels.SELECT_CAMPAIGN,
      payload: 1,
    };
    expect(reducer({}, selectCampaign)).to.deep.equal({
      selectedCampaignId: 1,
      selectedCampaign: null,
    });

    const state = reducer({selectedCampaign: {id: 2, name: 'test'}}, selectCampaign)
    expect(state).to.deep.equal({
      selectedCampaignId: 1,
      selectedCampaign: state.selectedCampaign,
    });
  });
  it('should handle FETCH_CAMPAIGN_DETAILS_SUCCESS', () => {
    const fetchAllActionSuccess = {
      type: actionLabels.FETCH_CAMPAIGN_DETAILS_SUCCESS,
      payload: [{id: 1,},],
    };
    expect(reducer({}, fetchAllActionSuccess)).to.deep.equal({selectedCampaign: [{id: 1,},],});
  });
  it('should handle FETCH_CAMPAIGN_DETAILS_ERROR', () => {
    const fetchAllActionError = {
      type: actionLabels.FETCH_CAMPAIGN_DETAILS_ERROR,
      payload: {message: 'error not found',},
    };
    expect(reducer({}, fetchAllActionError)).to.deep.equal({error: {message: 'error not found',},});
  });
  it('should handle REMOVE_ERROR', () => {
    const fetchAllActionError = {
      type: actionLabels.REMOVE_ERROR
    };
    expect(reducer({}, fetchAllActionError)).to.deep.equal({error: null});
  });
});
