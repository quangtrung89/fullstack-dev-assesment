import { takeLatest, } from 'redux-saga/effects';
import { put, call, } from 'redux-saga/effects';

const successAction = (action, data) => ({ type: `${action.type}_SUCCESS`, payload: data, });
const errorAction = (action, error) => ({ type: `${action.type}_ERROR`, payload: error, });

export function * createSaga(actionLabel, handler) {
  yield takeLatest(actionLabel, function* _(action) {
    try {
      const resData = yield call(handler, action.payload);
      yield put(successAction(action, resData));
    } catch (error) {
      yield put(errorAction(action, error));
    }
  });
}

