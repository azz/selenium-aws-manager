import { ec2 } from '../aws';
import { flatMap } from 'lodash';

export const FETCH_INSTANCES = 'FETCH_INSTANCES';

export function fetchInstances() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_INSTANCES });

    ec2(getState()).describeInstances((error, data) => {
      if (error)
        dispatch({ type: FETCH_INSTANCES, error });
      else
        dispatch({
          type: FETCH_INSTANCES,
          data: flatMap(data.Reservations, reservation => reservation.Instances)
        });
    });
  };
}

export const LAUNCH_INSTANCES = 'LAUNCH_INSTANCES';

export function launchInstance({ keyPair, instanceType, imageId, count = 1 }) {
  return (dispatch, getState) => {
    dispatch({ type: LAUNCH_INSTANCES });

    ec2(getState()).runInstances(
      {
        DryRun: true,
        MaxCount: count,
        MinCount: count,
        KeyName: keyPair,
        InstanceType: instanceType,
        ImageId: imageId,
        InstanceInitiatedShutdownBehavior: 'terminate'
      },
      (error, data) => {
        if (error) {
          dispatch({ type: LAUNCH_INSTANCES, error });
        } else {
          const instanceIds = data.Instances.map(
            instance => instance.InstanceId
          );
          dispatch({
            type: LAUNCH_INSTANCES,
            data: data.Instances
          });
          dispatch(awaitInstancesState(instanceIds, 'instanceExists'));
          dispatch(awaitInstancesState(instanceIds, 'instanceRunning'));
        }
      }
    );
  };
}

function awaitInstancesState(instanceIds, state) {
  return (dispatch, getState) => {
    ec2(getState()).waitFor(
      state,
      {
        InstanceIds: instanceIds
      },
      (error, data) => {
        if (error)
          dispatch({ type: FETCH_INSTANCES, error });
        else
          dispatch({
            type: FETCH_INSTANCES,
            data: flatMap(
              data.Reservations,
              reservation => reservation.Instances
            )
          });
      }
    );
  };
}
