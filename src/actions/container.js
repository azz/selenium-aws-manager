import { ec2 } from '../aws';
import { flatMap } from 'lodash';

export const FETCH_CONTAINERS = 'FETCH_CONTAINERS';

export function fetchContainers() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CONTAINERS });

    ec2(getState().credentials).describeInstances((error, data) => {
      if (error)
        dispatch({ type: FETCH_CONTAINERS, error });
      else
        dispatch({
          type: FETCH_CONTAINERS,
          data: flatMap(data.Reservations, reservation => reservation.Instances)
        });
    });
  };
}
