import { ec2 } from '../aws';
import { flatMap } from 'lodash';

export const FETCH_INSTANCES = 'FETCH_INSTANCES';

export function fetchInstances() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_INSTANCES });

    ec2(getState().credentials).describeInstances((error, data) => {
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

export const LAUNCH_INSTANCE = 'LAUNCH_INSTANCE';

export function launchInstance({ keyPair, instanceType, imageId }) {
  return (dispatch, getState) => {
    dispatch({ type: LAUNCH_INSTANCE });

    ec2(getState().credentials).runInstances(
      {
        DryRun: true,
        MaxCount: 1,
        MinCount: 1,
        KeyName: keyPair,
        InstanceType: instanceType,
        ImageId: imageId,
        InstanceInitiatedShutdownBehavior: 'terminate'
      },
      (error, data) => {
        if (error)
          dispatch({ type: LAUNCH_INSTANCE, error });
        else
          dispatch({
            type: LAUNCH_INSTANCE,
            data: data.Instances[0]
          });
      }
    );
  };
}
