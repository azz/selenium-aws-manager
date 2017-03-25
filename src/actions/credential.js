export const SET_CREDENTIALS = 'SET_CREDENTIALS';

export function setCredentials(accessKeyId, secretAccessKey) {
  return {
    type: SET_CREDENTIALS,
    credentials: { accessKeyId, secretAccessKey }
  };
}
