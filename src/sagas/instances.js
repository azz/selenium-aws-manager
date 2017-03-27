import { cps, put, select } from 'redux-saga/effects';
import { flatMap } from 'lodash';
import { ec2 } from '../aws';

import { actions } from '../ducks/instances';
import { actions as errorActions } from '../ducks/error';

export function* fetchInstances() {
  const api = yield select(ec2);
  try {
    const data = yield cps(api.describeInstances);
    yield put(
      actions.setInstances(
        flatMap(data.Reservations, reservation => reservation.Instances)
      )
    );
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}

export function* launchInstance({ keyPair, instanceType, imageId, count = 1 }) {
  const api = yield select(ec2);
  try {
    const data = yield cps(api.runInstances, {
      DryRun: true,
      MaxCount: count,
      MinCount: count,
      KeyName: keyPair,
      InstanceType: instanceType,
      ImageId: imageId,
      InstanceInitiatedShutdownBehavior: 'terminate'
    });

    const instanceIds = data.Instances.map(instance => instance.InstanceId);
    yield* awaitInstancesState(api, instanceIds, 'instanceExists');
    yield* awaitInstancesState(api, instanceIds, 'instanceRunning');
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}

function* awaitInstancesState(ec2, instanceIds, state) {
  // eslint-disable-next-line no-unused-vars
  const data = yield cps(ec2.waitFor, state, {
    InstanceIds: instanceIds
  });
  yield* fetchInstances();
  // yield put(
  //   actions.setInstances(
  //     flatMap(data.Reservations, reservation => reservation.Instances)
  //   )
  // );
}
