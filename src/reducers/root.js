import { defaults } from 'lodash';

import { FETCH_INSTANCES } from '../actions/instance';
import { FETCH_IMAGES } from '../actions/image';
import { FETCH_KEY_PAIRS } from '../actions/keypair';
import { SET_CREDENTIALS } from '../actions/credential';

const initialState = {
  instances: [],
  images: [],
  keyPairs: [],
  instanceTypes: ['c4.medium', 'c4.large'],
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
    case FETCH_INSTANCES:
      if (payload.data)
        return {
          ...state,
          instances: payload.data
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

    case FETCH_IMAGES:
      if (payload.data)
        return {
          ...state,
          images: payload.data
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

    case FETCH_KEY_PAIRS:
      if (payload.data)
        return {
          ...state,
          keyPairs: payload.data
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
