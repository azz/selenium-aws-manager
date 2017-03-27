export const types = {
  FETCH_IMAGES: 'FETCH_IMAGES',
  SET_IMAGES: 'SET_IMAGES'
};

export default (state = [], { type, images }) => {
  switch (type) {
    case types.FETCH_IMAGES:
      return [];
    case types.SET_IMAGES:
      return images;
    default:
      return state;
  }
};

export const actions = {
  fetchImages: _ => ({ type: types.FETCH_IMAGES }),
  setImages: images => ({ type: types.SET_IMAGES, images })
};
