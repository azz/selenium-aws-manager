import { fetchImages } from './image';
import { fetchInstances } from './instance';
import { fetchKeyPairs } from './keypair';

export default function init() {
  return dispatch => {
    dispatch(fetchImages());
    dispatch(fetchInstances());
    dispatch(fetchKeyPairs());
  };
}
