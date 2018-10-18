import {fetchCampaign,} from 'Campaign/sagas';
import api from 'api';
import { call, put, take, } from 'redux-saga/effects';
import {fetchAllCampaigns, fetchCampaignDetail,} from '../sagas';
import actions from '../actions';
import { expectSaga, } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError, } from 'redux-saga-test-plan/providers';

describe('fetchAllCampaigns', () => {
  it('fetches fetchAllCampaigns', () => {
    const fakeGroups = [{ id: 1, name: 'yes', }, {id: 2, names: 'no',},];
    return expectSaga(fetchAllCampaigns, actions.FETCH_ALL_CAMPAIGNS, api.campaigns.fetchAllCampaigns)
      .provide([
        [matchers.call.fn(api.campaigns.fetchAllCampaigns), fakeGroups,],
      ])
      .put({
        type: actions.FETCH_ALL_CAMPAIGNS_SUCCESS,
        payload: fakeGroups,
      })
      .dispatch({ type: actions.FETCH_ALL_CAMPAIGNS,})
      .silentRun();
  });

  it('handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchAllCampaigns, actions.FETCH_ALL_CAMPAIGNS, api.campaigns.fetchAllCampaigns)
      .provide([
        [matchers.call.fn(api.campaigns.fetchAllCampaigns), throwError(error),],
      ])
      .put({ type: actions.FETCH_ALL_CAMPAIGNS_ERROR, payload: error, })
      .dispatch({ type: actions.FETCH_ALL_CAMPAIGNS,})
      .silentRun();
  });
});

describe('fetchCampaignDetail', () => {
  it('fetches fetchCampaignDetail', () => {
    const fakeGroup = { id: 1, name: 'yes', };
    return expectSaga(fetchCampaignDetail, actions.FETCH_CAMPAIGN_DETAILS, api.campaigns.fetchCampaignDetails)
      .provide([
        [call(api.campaigns.fetchCampaignDetails, 42), fakeGroup],
      ])
      .put({
        type: actions.FETCH_CAMPAIGN_DETAILS_SUCCESS,
        payload: fakeGroup,
      })
      .dispatch({ type: actions.FETCH_CAMPAIGN_DETAILS, payload: 42,})
      .silentRun();
  });

  it('handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchCampaignDetail, actions.FETCH_CAMPAIGN_DETAILS, api.campaigns.fetchCampaignDetails)
      .provide([
        [matchers.call.fn(api.campaigns.fetchCampaignDetails), throwError(error),],
      ])
      .put({ type: actions.FETCH_CAMPAIGN_DETAILS_ERROR, payload: error, })
      .dispatch({ type: actions.FETCH_CAMPAIGN_DETAILS, payload: 42})
      .silentRun();
  });
});

