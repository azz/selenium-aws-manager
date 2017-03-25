import { defaults } from 'lodash';

import { FETCH_CONTAINERS } from '../actions/container';
import { SET_CREDENTIALS } from '../actions/credential';

const initialState = {
  containers: [],
  credentials: defaults(
    JSON.parse(localStorage.getItem('AWS_CREDENTIALS') || '{}'),
    {
      region: 'ap-southeast-2'
    }
  ),
  error: undefined
};

export default function reducer(state = initialState, { type, ...payload }) {
  switch (type) {
    case FETCH_CONTAINERS:
      if (payload.data)
        return {
          ...state,
          containers: payload.data
        };
      else if (payload.error)
        return {
          ...state,
          error: payload.error.toString()
        };
      else
        return {
          ...state,
          error: undefined
        };

    case SET_CREDENTIALS:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          ...payload.credentials
        }
      };

    default:
      return state;
  }
}
