import { defaults } from 'lodash';

export const types = {
  SET_CREDENTIALS: 'SET_CREDENTIALS'
};

const initialState = defaults(
  JSON.parse(localStorage.getItem('AWS_CREDENTIALS') || '{}'),
  {
    region: 'ap-southeast-2'
  }
);

export default (state = initialState, { type, credentials }) => {
  switch (type) {
    case types.SET_CREDENTIALS:
      return {
        ...state.credentials,
        ...credentials
      };
    default:
      return state;
  }
};

export const actions = {
  setCredentials: (accessKeyId, secretAccessKey) => ({
    type: types.SET_CREDENTIALS,
    credentials: { accessKeyId, secretAccessKey }
  })
};
