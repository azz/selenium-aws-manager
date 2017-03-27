export const types = {
  FETCH_INSTANCES: 'FETCH_INSTANCES',
  SET_INSTANCES: 'SET_INSTANCES',
  LAUNCH_INSTANCES: 'LAUNCH_INSTANCES'
};

export default (state = [], { type, instances }) => {
  switch (type) {
    case types.LAUNCH_INSTANCES:
      return state;
    case types.SET_INSTANCES:
      return instances;
    case types.FETCH_INSTANCES:
      return [];
    default:
      return state;
  }
};

export const actions = {
  fetchInstances: _ => ({ type: types.FETCH_INSTANCES }),
  setInstances: instances => ({ type: types.SET_INSTANCES, instances }),
  launchInstance: instance => ({
    type: types.LAUNCH_INSTANCES,
    ...instance
  })
};
