import { ec2 } from '../aws';

export const FETCH_KEY_PAIRS = 'FETCH_KEY_PAIRS';

export function fetchKeyPairs() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_KEY_PAIRS });

    ec2(getState()).describeKeyPairs((error, data) => {
      if (error)
        dispatch({ type: FETCH_KEY_PAIRS, error });
      else
        dispatch({
          type: FETCH_KEY_PAIRS,
          data: data.KeyPairs
        });
    });
  };
}
