import { ec2 } from '../aws';
import { cps, put, select, takeEvery } from 'redux-saga/effects';

import { SET_ERROR } from './error';

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const SET_IMAGES = 'SET_IMAGES';
export function fetchImages() {
  return {
    type: FETCH_IMAGES
  };
}

export function* fetchImagesSaga() {
  try {
    const api = yield select(ec2);
    const data = yield cps([api, api.describeImages], {
      Owners: ['self']
    });
    yield put({
      type: SET_IMAGES,
      data: data.Images
    });
  } catch (error) {
    yield put({ type: SET_ERROR, error });
  }
}

export function* watchFetchImages() {
  yield takeEvery(FETCH_IMAGES, fetchImagesSaga);
}
