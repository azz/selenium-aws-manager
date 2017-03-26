import { defaults } from 'lodash';

import { FETCH_INSTANCES, LAUNCH_INSTANCES } from '../actions/instance';
import { FETCH_IMAGES, SET_IMAGES } from '../actions/image';
import { SET_ERROR } from '../actions/error';
import { FETCH_SUBNETS } from '../actions/subnet';
import { FETCH_KEY_PAIRS } from '../actions/keypair';
import { SET_CREDENTIALS } from '../actions/credential';

const initialState = {
  instances: [],
  recentlyLaunchedInstances: undefined,
  images: [],
  keyPairs: [],
  subnets: [],
  instanceTypes: ['m4.large', 'm4.xlarge', 'c4.large', 'c4.xlarge'],
  credentials: defaults(
    JSON.parse(localStorage.getItem('AWS_CREDENTIALS') || '{}'),
    {
      region: 'ap-southeast-2'
    }
  ),
  error: undefined
};

/**
 * Reducer for an action that has a begin state, and fate of either success
 * or failure, as determined by the existence of the 'data' or 'error' property
 * on the payload.
 */
function twoFatesAction(state, payload, key, defaultValue) {
  if ('error' in payload)
    return {
      ...state,
      error: payload.error.toString()
    };

  if ('data' in payload)
    return {
      ...state,
      [key]: payload.data
    };

  return {
    ...state,
    [key]: defaultValue,
    error: undefined
  };
}

export default function reducer(state = initialState, { type, ...payload }) {
  switch (type) {
    case LAUNCH_INSTANCES:
      return twoFatesAction(state, payload, 'recentlyLaunchedInstances');

    case FETCH_INSTANCES:
      return twoFatesAction(state, payload, 'instances', []);

    case FETCH_SUBNETS:
      return twoFatesAction(state, payload, 'subnets', []);

    case FETCH_IMAGES:
      return {
        ...state,
        images: []
      };

    case SET_IMAGES:
      return {
        ...state,
        images: payload.data
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload.error.toString()
      };

    case FETCH_KEY_PAIRS:
      return twoFatesAction(state, payload, 'keyPairs', []);

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
