export const types = {
  SET_ERROR: 'SET_ERROR'
};

export default (state = null, { type, error }) => {
  switch (type) {
    case types.SET_ERROR:
      return error.toString();
    default:
      return state;
  }
};

export const actions = {
  setError: error => ({ type: types.SET_ERROR, error })
};
