import { cps, put, select } from 'redux-saga/effects';
import { ec2 } from '../aws';

import { actions as subnetsActions } from '../ducks/subnets';
import { actions as errorActions } from '../ducks/error';

export function* fetchSubnets() {
  const api = yield select(ec2);
  try {
    const data = yield cps([api, api.describeSubnets]);
    yield put(subnetsActions.setSubnets(data.Subnets));
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}
