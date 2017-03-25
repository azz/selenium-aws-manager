import { SET_CONTAINERS } from '../actions/container';

const initialState = {
  containers: []
};

export default function reducer(state = initialState, { type, ...payload }) {
  switch (type) {
    case SET_CONTAINERS:
      return {
        ...state,
        containers: payload.containers
      };
    default:
      return state;
  }
}
