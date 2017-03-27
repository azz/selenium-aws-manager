import { put } from 'redux-saga/effects';

import { actions as imageActions } from '../ducks/images';
import { actions as subnetActions } from '../ducks/subnets';
import { actions as instanceActions } from '../ducks/instances';
import { actions as keypairActions } from '../ducks/key-pairs';

export function* load() {
  yield [
    put(imageActions.fetchImages()),
    put(subnetActions.fetchSubnets()),
    put(instanceActions.fetchInstances()),
    put(keypairActions.fetchKeyPairs())
  ];
}
