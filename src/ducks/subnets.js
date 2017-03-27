import { getNameFromTags } from '../util';

export const types = {
  FETCH_SUBNETS: 'FETCH_SUBNETS',
  SET_SUBNETS: 'SET_SUBNETS'
};

export default (state = [], { type, subnets }) => {
  switch (type) {
    case types.FETCH_SUBNETS:
      return [];
    case types.SET_SUBNETS:
      return subnets;
    default:
      return state;
  }
};

export const actions = {
  fetchSubnets: _ => ({ type: types.FETCH_SUBNETS }),
  setSubnets: subnets => ({ type: types.SET_SUBNETS, subnets })
};

export const selectors = {
  getSubnetsWithName: subnets => subnets
    .map(subnet => ({
      ...subnet,
      Name: getNameFromTags(subnet.Tags)
    }))
    .sort((a, b) => a.Name < b.Name)
};
