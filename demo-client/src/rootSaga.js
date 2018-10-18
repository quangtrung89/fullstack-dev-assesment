import { all, } from 'redux-saga/effects';

import campaignSagas from 'Campaign/sagas';

function* rootSaga() {
  yield all([].concat(
    campaignSagas,
  ));
}

export default rootSaga;
