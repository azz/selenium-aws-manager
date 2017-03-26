import { fetchImages } from './image';
import { fetchSubnets } from './subnet';
import { fetchInstances } from './instance';
import { fetchKeyPairs } from './keypair';

export default function init() {
  return dispatch => {
    dispatch(fetchImages());
    dispatch(fetchSubnets());
    dispatch(fetchInstances());
    dispatch(fetchKeyPairs());
  };
}
