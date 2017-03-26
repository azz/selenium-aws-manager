import { ec2 } from '../aws';

export const FETCH_IMAGES = 'FETCH_IMAGES';

export function fetchImages() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_IMAGES });

    ec2(getState().credentials).describeImages(
      {
        Owners: ['self']
      },
      (error, data) => {
        if (error)
          dispatch({ type: FETCH_IMAGES, error });
        else
          dispatch({
            type: FETCH_IMAGES,
            data: data.Images
          });
      }
    );
  };
}
