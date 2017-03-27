import { cps, put, select } from 'redux-saga/effects';
import { ec2 } from '../aws';

import { actions } from '../ducks/key-pairs';
import { actions as errorActions } from '../ducks/error';

export function* fetchKeyPairs() {
  const api = yield select(ec2);
  try {
    const data = yield cps(api.describeKeyPairs);
    yield put(actions.setKeyPairs(data.KeyPairs));
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}
