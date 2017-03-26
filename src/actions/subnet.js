import { ec2 } from '../aws';

export const FETCH_SUBNETS = 'FETCH_SUBNETS';

export function fetchSubnets() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_SUBNETS });

    ec2(getState().credentials).describeSubnets((error, data) => {
      if (error) {
        dispatch({ type: FETCH_SUBNETS, error });
        return;
      }

      dispatch({
        type: FETCH_SUBNETS,
        data: data.Subnets
      });
    });
  };
}
