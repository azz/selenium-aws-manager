import { ec2 } from '../aws';
import { flatMap } from 'lodash';

export function requestContainers() {
  return dispatch => {
    ec2.describeInstances((err, data) => {
      if (err) console.error(err);
      else dispatch(
          setContainers(
            flatMap(data.Reservations, reservation => reservation.Instances)
          )
        );
    });
  };
}

export const SET_CONTAINERS = 'SET_CONTAINERS';

export function setContainers(containers) {
  return {
    type: SET_CONTAINERS,
    containers
  };
}
