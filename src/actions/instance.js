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
