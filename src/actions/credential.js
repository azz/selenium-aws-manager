export const SET_CREDENTIALS = 'SET_CREDENTIALS';

import load from './init';

export function setCredentials(accessKeyId, secretAccessKey) {
  return dispatch => {
    dispatch({
      type: SET_CREDENTIALS,
      credentials: { accessKeyId, secretAccessKey }
    });

    dispatch(load());
  };
}
