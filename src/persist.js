import { isEqual } from 'lodash';

let _credentials;

export default function persist(store) {
  store.subscribe(_ => {
    const { credentials } = store.getState();
    if (!isEqual(credentials, _credentials)) {
      localStorage.setItem('AWS_CREDENTIALS', JSON.stringify(credentials));
    }
  });
}
