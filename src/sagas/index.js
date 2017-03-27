import { takeEvery, takeLatest } from 'redux-saga/effects';

import { types as imageTypes } from '../ducks/images';
import { types as instanceTypes } from '../ducks/instances';
import { types as subnetTypes } from '../ducks/subnets';
import { types as keyPairsTypes } from '../ducks/key-pairs';
import { types as credentialsTypes } from '../ducks/credentials';

import { fetchImages } from './images';
import { fetchInstances } from './instances';
import { fetchSubnets } from './subnets';
import { fetchKeyPairs } from './key-pairs';
import { load } from './load';

export default function* indexSaga() {
  yield [
    takeEvery(imageTypes.FETCH_IMAGES, fetchImages),
    takeEvery(instanceTypes.FETCH_INSTANCES, fetchInstances),
    takeEvery(keyPairsTypes.FETCH_KEY_PAIRS, fetchKeyPairs),
    takeEvery(subnetTypes.FETCH_SUBNETS, fetchSubnets),
    // Reload when credentials change
    takeLatest(credentialsTypes.SET_CREDENTIALS, load)
  ];
  yield* load();
}
