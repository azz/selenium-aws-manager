import { cps, put, select } from 'redux-saga/effects';
import { ec2 } from '../aws';

import { actions } from '../ducks/images';
import { actions as errorActions } from '../ducks/error';

export function* fetchImages() {
  try {
    const api = yield select(ec2);
    const data = yield cps(api.describeImages, {
      Owners: ['self']
    });
    yield put(actions.setImages(data.Images));
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}
