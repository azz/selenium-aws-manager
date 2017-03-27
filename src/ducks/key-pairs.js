export const types = {
  FETCH_KEY_PAIRS: 'FETCH_KEY_PAIRS',
  SET_KEY_PAIRS: 'SET_KEY_PAIRS'
};

export default (state = [], { type, keyPairs }) => {
  switch (type) {
    case types.FETCH_KEY_PAIRS:
      return [];
    case types.SET_KEY_PAIRS:
      return keyPairs;
    default:
      return state;
  }
};

export const actions = {
  fetchKeyPairs: _ => ({ type: types.FETCH_KEY_PAIRS }),
  setKeyPairs: keyPairs => ({ type: types.SET_KEY_PAIRS, keyPairs })
};
